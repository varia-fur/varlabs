# Project Todos (snapshot)

Generated: 2025-10-06

- [x] Add age-gate JS for `AD.html`
  - Create a small client-side age gate in `main.js` that shows a modal on `AD.html` unless `localStorage.varlabs_ad_allowed` is set. Buttons: Enter (set flag), Leave (redirect). Files: `main.js`

- [x] Add modal CSS
  - Add modal/overlay styles to `style.css` consistent with project's look (uses chippyfontregular). Files: `style.css`

- [x] Validate and smoke-check
  - Run a quick syntax/error check across files and manually verify modal appears when opening `AD.html` in a browser.

- [~] Ask for user feedback
  - Confirm desired protection method (password, signed cookie, Cloudflare Access) and whether to implement Pages Functions. Status: in-progress

- [ ] Implement Cloudflare Pages Functions gate
  - (Not started) Add Pages Functions to perform server-side password validation and protect `Local-services`.
  - Tasks:
    - move `Local-services.html` to `protected/Local-services/index.html`
    - add `login.html` (public form)
    - add `functions/api/validate.js` (POST validator setting a secure HttpOnly cookie using env var `LOCAL_SECRET`)
    - add `functions/Local-services.js` to check cookie and return protected content or redirect to `/login.html`
    - add `LOCAL_SECRET` to Pages environment variables
  - Acceptance: requesting `/Local-services` requires password and successful login sets cookie allowing access to protected content.


## Notes
- The repository now contains this file at `PAGES_FUNCTIONS_TODO.md` so the todo is stored in the repo. If you prefer a different filename or location (e.g., `.github/TODO.md`), tell me and I will move it.
- I can proceed to implement the Pages Functions and move files if you confirm — say "implement now" and I will update the repo and mark the todo as in-progress/completed as I work.

