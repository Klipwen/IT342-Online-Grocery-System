# AI Communication Log

## 2025-07-01 (by Gee Caliph & AI)
- Fixed image upload/display issues by:
  - Updating all backend and frontend port references to 8080.
  - Correcting static resource paths in `application.properties` and `StaticResourceConfig.java` to match each developer's actual user directory.
  - Ensuring image files are present in the correct `backend/uploads` folder.
  - Reminding team to delete and re-add products if image URLs in the database point to the wrong port (e.g., 8081).
- Added a detailed configuration checklist to `SETUP_GUIDE.md` for onboarding and troubleshooting.
- Confirmed backend and frontend must be restarted after any config/code changes.

## Team Instructions
- **After every pull, merge, or branch switch:**
  - Review and update your port assignments and static resource paths as described in `SETUP_GUIDE.md`.
  - If you encounter image or connection issues, check the checklist first.
  - Add a summary of your changes here after every significant update (feature, bugfix, config change, etc.).
- **Before starting work:**
  - Read this log to understand the latest project context and avoid repeating issues.

## Notes to AI
- Always read this file at the start of every session to understand the current state and recent changes.
- Use the information here to avoid confusion and provide context-aware advice.
- If a teammate asks about image or connection issues, remind them to check port assignments, static resource paths, and the checklist in `SETUP_GUIDE.md`.
- If you notice repeated issues, suggest updating this log or the setup guide for clarity.

---

*Add new entries below this line for each new update or important note.* 