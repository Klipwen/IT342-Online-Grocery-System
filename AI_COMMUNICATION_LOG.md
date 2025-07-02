# AI Communication Log

## 2025-07-01 (by Gee Caliph & AI)
- Fixed image upload/display issues by:
  - Updating all backend and frontend port references to 8080.
  - Correcting static resource paths in `application.properties` and `StaticResourceConfig.java` to match each developer's actual user directory.
  - Ensuring image files are present in the correct `backend/uploads` folder.
  - Reminding team to delete and re-add products if image URLs in the database point to the wrong port (e.g., 8081).
- Added a detailed configuration checklist to `SETUP_GUIDE.md` for onboarding and troubleshooting.
- Confirmed backend and frontend must be restarted after any config/code changes.



## 2025-07-01 (Merge/Pull Update)
- Pulled and merged updates from main branch.
- Added new frontend assets:
  - `grocery_shopping_cart.png`, `sardines_product.png` in `frontend/grocery/src/assets/`
- Added new frontend pages:
  - `frontend/grocery/src/pages/Admin/AboutUs.jsx`
  - `frontend/grocery/src/pages/Error404.jsx`
- Added new CSS style files:
  - `AboutPage.css`, `AboutUs.css`, `CartPage.css`, `CheckoutPage.css`, `ContactPage.css`, `Error404.css` in `frontend/grocery/src/styles/`
- Created `.idea` project files for JetBrains IDE support.
- **Team:** After pulling, check for any new dependencies or config changes required by these new files.
- **AI:** Be aware of new pages and assets for future troubleshooting and feature work.


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

## 2025-07-01 (Frontend Navigation & Category Update)
- Updated the header to include a functional category dropdown matching the main product category list: Pantry Essentials, Canned Goods, Canned Seafood, Noodles, Snacks & Sweets, Breakfast World, Wines & Liquors, Personal Grooming, Health & Beauty.
- Header navigation is now customer-focused; clicking header links no longer redirects to the admin dashboard.
- The default landing page is now the Home page (not the admin dashboard).
- Cleaned up routing logic in App.jsx to ensure only the correct route shows the admin dashboard.
- Team: After pulling, verify header navigation and category dropdown work as expected.
- AI: Use this as the latest context for navigation and category logic.

## Recent Updates

### Admin User Management (CRUD)
- Added a new admin user page that displays all users (ID, Name, Email) in a table, excluding passwords.
- Added a Users button to the admin dashboard header for easy navigation to the user list.
- User list page now includes:
  - Back button to return to the dashboard
  - Add User form (create)
  - Edit and Delete actions for each user (update/delete)
  - Confirmation required before deleting a user
  - Search input and button to filter users by name or email
- All UI matches the admin dashboard style for consistency.

### Backend
- Added `/api/auth/users` GET endpoint to return all users (excluding passwords).
- (Pending) Backend endpoints for POST, PUT, DELETE for users are needed for full CRUD.

### Other Improvements
- Cart state is now persistent using localStorage.
- Cart, product, and navigation UI/UX improved for both customer and admin sides.

---
**For future changes:**
- See this log for a summary of all major AI-assisted updates and features.

---

*Add new entries below this line for each new update or important note.*

## 2025-07-02 
- **Login & Register Navigation:**
  - Login page now shows "Don't have an account? Sign up" with a link to the register page.
  - Register page now shows "Already have an account? Login" with a link to the login page.
- **Login Functionality:**
  - Implemented backend `/api/auth/login` endpoint for user authentication (plain text password, returns user info and role).
  - Login page now works: users are redirected based on their role after successful login.
- **Logout Feature:**
  - Added a Logout button to the header (visible on Home and other pages with the header).
  - Clicking Logout removes the user from localStorage and redirects to the login page.
- **Default Routing:**
  - Visiting the site with no route now redirects to the login page by default.
- **Admin Dashboard Navigation:**
  - After editing and saving a product, the app now returns to the admin dashboard (not the homepage).
  - Fixed navigation logic in App.jsx to ensure correct routing after admin actions.
- **General:**
  - All navigation and state changes are now more consistent between admin and customer views.

## 2025-07-02 (Major Cart Persistence & Sync Update)

### Summary of Changes
- **Cart Persistence Implemented:**
  - Cart items are now stored in the database (`cart_item` table) and persist across logins, logouts, and device changes.
  - Backend `/api/cart` endpoints now return full product details for each cart item (name, price, image, etc.).
  - All cart actions (add, update, remove, clear) are now synced with the backend for each user.
  - Cart quantity changes in the UI now update the backend and always reflect the latest state after refresh.
- **Frontend Integration:**
  - Cart is fetched from the backend on login and after every cart action.
  - All cart actions use backend API calls; localStorage is no longer used for cart.
  - Add to Cart, Remove, Clear, and Quantity buttons are fully functional and persistent.
  - User state is now initialized from localStorage for correct cart/user sync after login.
- **Error Handling:**
  - Fixed 500 error on clear cart by updating the repository method to use a transactional JPQL query.
  - Added defensive coding to prevent UI errors if product details are missing.

### Instructions for Teammates
- **Database:**
  - Make sure your `online_grocery_db` database has a `cart_item` table:
    ```sql
    CREATE TABLE cart_item (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      user_id BIGINT NOT NULL,
      product_id BIGINT NOT NULL,
      quantity INT NOT NULL DEFAULT 1,
      added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES product(id)
    );
    ```
- **Backend:**
  - Pull the latest changes and restart your backend server after merging.
  - Ensure your backend port matches the frontend API calls (default: 8080).
  - If you encounter errors with cart endpoints, check your database table and port configuration.
- **Frontend:**
  - Pull the latest changes and restart your frontend dev server.
  - Test cart actions (add, update quantity, remove, clear) and verify persistence after login/logout/refresh.
  - If cart actions do not work, check that you are logged in and that the backend is running on the correct port.
- **General Reminder:**
  - **Always check your backend and frontend port assignments after every pull, merge, or branch switch.** Port mismatches are a common source of errors.
  - If you add new features that require database changes, update this log and notify the team.

### Note to AI and Future Teammates
- Always instruct teammates to update their database schema and check port settings after pulling major updates.
- If teammates report cart or product issues, confirm that their backend is running, the database is up to date, and ports are correct.
- Encourage teammates to test all cart actions and report any inconsistencies.
-
--- 