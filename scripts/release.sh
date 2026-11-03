#!/usr/bin/env bash
# scripts/release.sh
# Usage: npm run release "feat: your commit message"
# Flow: build -> sync main -> new branch -> commit -> push -> PR -> auto-merge -> sync main
# Branch is preserved on remote (not deleted) after merge.
set -euo pipefail

MSG="${1:-chore: update site}"
cd "$(dirname "$0")/.."

echo ">> 1. Build verification"
npm run build

echo ">> 2. GitHub auth"
if [ -z "${GH_TOKEN:-}" ]; then
  printf 'protocol=https\nhost=github.com\n' > /tmp/gh_cred_input.txt
  export GH_TOKEN=$(git credential fill < /tmp/gh_cred_input.txt | grep '^password=' | cut -d= -f2-)
fi
export GIT_TERMINAL_PROMPT=0

echo ">> 3. Sync main"
git checkout main && git pull --ff-only origin main

echo ">> 4. New branch"
BRANCH="feature/$(date +%Y%m%d-%H%M%S)"
git checkout -b "$BRANCH"

echo ">> 5. Commit"
git add -A
if git diff --cached --quiet; then
  echo "No changes to commit."
  git checkout main
  exit 0
fi
git commit -m "$MSG"

echo ">> 6. Push"
git push -u origin "$BRANCH"

echo ">> 7. Create PR"
PR_URL=$(gh pr create --base main --head "$BRANCH" --title "$MSG" --body "Automated release via scripts/release.sh.")
PR_NUMBER=$(gh pr view "$PR_URL" --json number --jq .number)
echo "PR #$PR_NUMBER: $PR_URL"

echo ">> 8. Merge to main (auto-merge, branch preserved)"
gh pr merge "$PR_NUMBER" --merge

echo ">> 9. Sync local main"
git checkout main && git pull --ff-only origin main

echo "Done. Branch $BRANCH preserved on remote."