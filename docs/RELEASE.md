# Release Process (Coinone Skill)

This document is the single source of truth for release flow (merged from previous release docs).

## 0) Goal
- Keep **repo version**, **Pages**, and **npm** in sync.
- Publish via **release branch** and GitHub Actions.

---

## 1) Pre-Release Checklist (main)
- Ensure all changes are merged into `main`.
- Run tests locally:
  ```bash
  npm test
  ```
- Verify versions in `main`:
  - `package.json` version
  - `skill/SKILL.md` version
  - `docs/TASKS.md` release/version line
- Verify **User-Agent** header includes `coinone-skill/<version>` (public + private API)
- When opening **main → release PR**, enable **Auto-merge** (required)

---

## 2) Branch Flow
- **Source of truth:** `main`
- **Publish branch:** `release`
- **Always enable PR auto-merge** when syncing `main → release`

### Recommended release flow (version bump first on main)
```bash
# 1) bump version on main
# edit package.json + skill/SKILL.md (+ docs/TASKS.md release line)

git checkout main
git pull --rebase origin main
# commit version bump on main

# 2) fast-forward release to main
git checkout release
git pull --rebase origin release

git merge origin/main --ff-only

# 3) push release
git push origin release
```

---

## 3) Publish Workflow (GitHub Actions)
Workflow: `.github/workflows/publish.yml`

### Default (auto bump)
- Uses Conventional Commits to bump version.
- Publishes to npm using `NPM_TOKEN`.

### Manual run (skip bump)
If you want to **keep the current version** without auto-bump:
1. Ensure `publish.yml` supports `skip_bump` input.
2. Trigger workflow manually with:
   - `skip_bump=true`

---

## 4) Pages Deployment
Workflow: `.github/workflows/deploy-docs.yml`

- **Pages** is served from `skill/` directory.
- Auto deploy on changes under `skill/**` in **release** branch.
- If pages look stale, **re-run deploy-docs workflow** manually (release).

---

## 5) Post-Release Verification
### ✅ Check npm
```bash
npm view @1xp-ai/coinone-skill version
```

### ✅ Check GitHub Pages
- `https://1xp-ai.github.io/coinone-skill/SKILL.md`

### ✅ Check repo versions
- `package.json` version
- `skill/SKILL.md` version

---

## 6) Common Issues
### Version mismatch (npm vs repo/pages)
- If npm bumped unexpectedly, confirm whether `publish.yml` auto-bumped version.
- Decide one of:
  - **Sync repo to npm version**
  - **Deprecate npm version** and republish with `skip_bump=true`

### Pages not updated
- Pages can lag due to cache.
- Re-run deploy-docs workflow if needed.

---

## 7) Release Decision Log (optional)
For major releases, document:
- target version
- release date
- major changes
- breaking changes

---

## Notes
- Keep all commits and docs in **English**.
- Do not share npm tokens in chat.
