# Release Process (Coinone Skill)

This document defines the **end-to-end release flow** for the coinone-skill project.

---

## 0) Preconditions (Must be true)
- All tests pass locally + CI green
- Docs/CLI/SDK functions are aligned
- Version is correct in:
  - `package.json`
  - `skill/SKILL.md`
- Release decision approved (PM)

---

## 1) What to Update Before Release
Update these **in order**:
1. **Version bump**
   - `package.json`
   - `skill/SKILL.md`
2. **Docs consistency**
   - `skill/` = public docs (GitHub Pages)
   - `docs/` = internal dev docs
3. **TASKS** status
   - Mark release item with the new version
4. **Release notes** (if required)

---

## 2) Branch Rules
- **main**: development branch
- **release**: publishing branch (npm publish runs here)
- **GitHub Pages**: uses `skill/` from main

---

## 3) Actions / Workflows
### A) GitHub Pages (Docs)
- Trigger: changes under `skill/**`
- Purpose: update https://1xp-ai.github.io/coinone-skill/

### B) Publish to npm
- Trigger: manual `workflow_dispatch`
- Runs on **release** branch
- Uses Conventional Commits for version bump (if enabled)

**Important:**
- If you want to keep **manual versioning**, run workflow with `skip_bump=true`.
- If auto bump is enabled, `feat:` will bump **minor**.

---

## 4) Release Steps (Standard)
1. **Sync release with main**
   ```bash
   git checkout release
   git merge main
   git push
   ```
2. **Trigger npm workflow**
   - Action: Publish to npm
   - Branch: `release`
   - Input: `skip_bump=true` (if manual version control)

---

## 5) Post-Release Verification
Check all three:
1. **npm**
   ```bash
   npm view @1xp-ai/coinone-skill version
   ```
2. **GitHub Pages**
   - https://1xp-ai.github.io/coinone-skill/SKILL.md
3. **Repo versions**
   - `package.json`
   - `skill/SKILL.md`

---

## 6) If Version Drift Happens (npm > repo)
**Recommended fix:** align repo to npm version.
1. Bump `package.json` + `skill/SKILL.md`
2. Update TASKS release entry
3. Push to main & release

---

## 7) Roles
- **PM (Cha Mu-hee)**: release decision + documentation update
- **Dev (Ho-jin / Dorami)**: code + workflow + tests
- **Release (PM)**: publish execution & verification
