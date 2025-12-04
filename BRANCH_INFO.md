# Secondary Branch Setup

The branch `codex-branch` has been created locally so you can work without affecting `main`.

To make it available in your GitHub repo/Codespaces list:

1. Add your remote if it is not already configured (replace with your repo URL):
   ```bash
   git remote add origin <YOUR_REPO_URL>
   ```
2. Push the branch so it appears in GitHub:
   ```bash
   git push -u origin codex-branch
   ```
3. (Optional) Switch to it locally if you are not already on it:
   ```bash
   git checkout codex-branch
   ```
4. Create a Codespace on `codex-branch` (GitHub UI: **Code** ➜ **Codespaces** ➜ **Create codespace on codex-branch**).
5. Do your work on `codex-branch`, then open a PR back to `main` when ready.

This keeps experimental work isolated while still trackable in Git.
