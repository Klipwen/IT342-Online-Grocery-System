# Edit Product Functionality

This document describes the edit product functionality that has been implemented for the admin panel.

## Backend Features

### 1. AdminProductController Updates
- **GET `/api/admin/products/{id}`** - Retrieve a product by ID for editing
- **PUT `/api/admin/products/{id}`** - Update a product with image replacement
- **DELETE `/api/admin/products/{id}`** - Delete a product and its associated image

### 2. ProductService Updates
- **`updateProductWithImage(Long id, Product updated)`** - Updates product with automatic image replacement
  - If a new image is provided, the old image file is automatically deleted from the uploads folder
  - All product fields are updated in the database

### 3. Image Replacement Logic
- When updating a product with a new image:
  1. The old image file is deleted from the `/uploads/` directory
  2. The new image is uploaded and saved
  3. The database is updated with the new image URL
  4. Console logs confirm the deletion of the old image

## Frontend Features

### 1. EditProductPage Component
- Loads existing product data when editing
- Displays loading and error states
- Uses the same form layout as AddProductPage

### 2. ProductForm Component Updates
- **Dual Mode**: Works for both adding and editing products
- **Image Preview**: Shows current image and indicates when it will be replaced
- **Form Validation**: Maintains all existing validation rules
- **Navigation**: Cancel button returns to add product page

### 3. Simple Routing
- Uses URL parameters to determine edit mode (`/?edit={productId}`)
- No external routing dependencies required

## How to Use

### Testing the Edit Functionality

1. **Start the Backend Server**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

2. **Start the Frontend Development Server**
   ```bash
   cd frontend/grocery
   npm run dev
   ```

3. **Test Edit Mode**
   - Navigate to the application (usually `http://localhost:5173`)
   - Click the "Test Edit Product (ID: 1)" button
   - This will attempt to load and edit product with ID 1
   - Make sure you have a product with this ID in your database

### Manual Testing

1. **Add a Product First**
   - Use the add product form to create a new product
   - Note the product ID from the database

2. **Edit the Product**
   - Modify the URL to include the product ID: `http://localhost:5173/?edit={productId}`
   - The form will load with existing product data
   - Make changes and submit to update the product

3. **Test Image Replacement**
   - Upload a new image while editing
   - The form will show a green checkmark indicating the image will be replaced
   - Submit the form to see the old image deleted and new image saved

## File Structure

```
backend/
├── src/main/java/edu/cit/onlinegrocerysystem/
│   ├── controller/
│   │   └── AdminProductController.java (updated)
│   └── service/
│       └── ProductService.java (updated)

frontend/grocery/src/
├── pages/Admin/
│   ├── AddProductPage.jsx (updated)
│   └── EditProductPage.jsx (new)
├── components/admin/
│   └── ProductForm.jsx (updated)
└── App.jsx (updated)
```

## Key Features

### ✅ Image Replacement
- Automatic deletion of old image files
- Seamless replacement with new images
- Visual feedback in the UI

### ✅ Form Reusability
- Single form component for both add and edit
- Consistent styling and validation
- Proper state management

### ✅ Error Handling
- Loading states for better UX
- Error messages for failed operations
- Graceful fallbacks

### ✅ Database Updates
- Complete product field updates
- Image URL updates
- Proper transaction handling

## Notes

- The implementation uses the native `fetch` API instead of axios to avoid dependency issues
- Simple URL-based routing is used instead of react-router-dom
- All image files are stored in the `backend/uploads/` directory
- Static resource configuration serves images from `/uploads/` endpoint 