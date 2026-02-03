/**
 * Order Validation Utilities
 * Validates orders against range_units and market info
 */

import { getRangeUnits, getMarketInfo } from './api/public.js';

export interface OrderValidation {
  valid: boolean;
  errors: string[];
  warnings: string[];
  adjustedPrice?: string;
  adjustedQty?: string;
}

export interface ValidationRules {
  priceUnit: number;
  qtyUnit: number;
  minQty: number;
  maxQty: number;
  minOrderAmount: number;
  maxOrderAmount: number;
}

/**
 * Get validation rules for a trading pair
 */
export async function getValidationRules(
  targetCurrency: string,
  quoteCurrency = 'KRW'
): Promise<ValidationRules> {
  const [rangeUnits, marketInfo] = await Promise.all([
    getRangeUnits(quoteCurrency),
    getMarketInfo(targetCurrency, quoteCurrency)
  ]);

  const rangeUnit = rangeUnits.find(
    r => r.target_currency === targetCurrency && r.quote_currency === quoteCurrency
  );

  if (!rangeUnit) {
    throw new Error(`No range unit found for ${targetCurrency}/${quoteCurrency}`);
  }

  return {
    priceUnit: parseFloat(rangeUnit.price_unit),
    qtyUnit: parseFloat(rangeUnit.qty_unit),
    minQty: parseFloat(rangeUnit.min_qty),
    maxQty: parseFloat(rangeUnit.max_qty),
    minOrderAmount: parseFloat(marketInfo.min_order_amount),
    maxOrderAmount: parseFloat(marketInfo.max_order_amount)
  };
}

/**
 * Round price to valid tick size
 */
export function roundToTickSize(value: number, tickSize: number): number {
  return Math.round(value / tickSize) * tickSize;
}

/**
 * Validate and adjust an order
 */
export function validateOrder(
  price: number,
  qty: number,
  rules: ValidationRules
): OrderValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check quantity bounds
  if (qty < rules.minQty) {
    errors.push(`Quantity ${qty} is below minimum ${rules.minQty}`);
  }
  if (qty > rules.maxQty) {
    errors.push(`Quantity ${qty} exceeds maximum ${rules.maxQty}`);
  }

  // Check order amount bounds
  const orderAmount = price * qty;
  if (orderAmount < rules.minOrderAmount) {
    errors.push(`Order amount ${orderAmount} is below minimum ${rules.minOrderAmount}`);
  }
  if (orderAmount > rules.maxOrderAmount) {
    errors.push(`Order amount ${orderAmount} exceeds maximum ${rules.maxOrderAmount}`);
  }

  // Adjust price to tick size
  const adjustedPrice = roundToTickSize(price, rules.priceUnit);
  if (adjustedPrice !== price) {
    warnings.push(`Price adjusted from ${price} to ${adjustedPrice} (tick size: ${rules.priceUnit})`);
  }

  // Adjust quantity to tick size
  const adjustedQty = roundToTickSize(qty, rules.qtyUnit);
  if (adjustedQty !== qty) {
    warnings.push(`Quantity adjusted from ${qty} to ${adjustedQty} (tick size: ${rules.qtyUnit})`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    adjustedPrice: adjustedPrice.toString(),
    adjustedQty: adjustedQty.toString()
  };
}

/**
 * Validate order with auto-fetched rules
 */
export async function validateOrderAuto(
  targetCurrency: string,
  price: number,
  qty: number,
  quoteCurrency = 'KRW'
): Promise<OrderValidation> {
  const rules = await getValidationRules(targetCurrency, quoteCurrency);
  return validateOrder(price, qty, rules);
}

/**
 * Pre-check if an order would be valid
 */
export function preCheckOrder(
  price: number,
  qty: number,
  rules: ValidationRules
): { valid: boolean; reason?: string } {
  if (qty < rules.minQty) {
    return { valid: false, reason: `Quantity below minimum (${rules.minQty})` };
  }
  if (qty > rules.maxQty) {
    return { valid: false, reason: `Quantity above maximum (${rules.maxQty})` };
  }
  
  const amount = price * qty;
  if (amount < rules.minOrderAmount) {
    return { valid: false, reason: `Order amount below minimum (${rules.minOrderAmount})` };
  }
  if (amount > rules.maxOrderAmount) {
    return { valid: false, reason: `Order amount above maximum (${rules.maxOrderAmount})` };
  }

  return { valid: true };
}
