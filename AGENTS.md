# Orbitvo project instructions

- Before substantial work, read `PROJECT_HUB.md` and, when present, the single file in `tasks/active/`.
- Treat the live repository and `PROJECT_HUB.md` as authoritative. Files under `docs/archive/` and `tasks/archive/` are history only.
- Keep at most one active implementation task. Do not begin a later phase before the current task meets its exit criteria.
- Default model for this project: `GPT-5.6 Terra` with `medium` reasoning.
- Escalate only for architecture or recovery work, difficult non-reproducible failures, security/privacy audits, or final high-risk release acceptance. Record the reason and return to Terra Medium afterward.
- Separate source/build checks, automated tests, browser visual checks, and public-domain verification in completion reports.
- After a requested website modification meets its exit criteria, commit it, push it to `origin/main`, let Vercel deploy it, and verify the public site so the user can review the result. This standing authorization remains active until the user revokes it.
- Hosting-provider migrations, DNS changes, destructive remote actions, credentials, and account-permission changes still require explicit task-specific authorization.
