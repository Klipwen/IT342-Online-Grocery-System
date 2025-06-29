# Admin Dashboard - Complete CRUD System

This document describes the complete admin dashboard implementation with full CRUD (Create, Read, Update, Delete) operations for managing products.

## 🎯 Overview

The admin dashboard provides a comprehensive interface for managing all products in the grocery system. It includes:

- **Dashboard View**: Display all products in a table format
- **Add Product**: Create new products with image upload
- **Edit Product**: Update existing products with image replacement
- **Delete Product**: Remove products and their associated images
- **Search & Filter**: Find products by name, category, or other criteria

## 🏗️ Architecture

### Backend Components

#### 1. AdminProductController
```java
// Key endpoints:
GET    /api/admin/products/{id}     // Get product by ID
PUT    /api/admin/products/{id}     // Update product with image replacement
DELETE /api/admin/products/{id}     // Delete product and image
POST   /api/admin/products/upload-image  // Upload new image
```

#### 2. ProductService
```java
// Key methods:
updateProductWithImage(Long id, Product updated)  // Update with image replacement
getById(Long id)                                  // Retrieve product
delete(Long id)                                   // Delete product
```

### Frontend Components

#### 1. AdminDashboard
- Main dashboard page displaying all products
- Search and filter functionality
- Navigation to add/edit pages
- Product deletion with confirmation

#### 2. AdminProductTable
- Responsive table displaying product information
- Product images, names, categories, prices, stock levels
- Status indicators (Best Seller, Discount, Stock levels)
- Action buttons for edit and delete

#### 3. AdminHeader
- Dashboard title and product count
- Add Product button
- Clean, professional styling

#### 4. ProductForm (Enhanced)
- Dual mode: Add and Edit functionality
- Image upload with preview
- Form validation
- Navigation back to dashboard

## 🚀 Features

### ✅ Product Management
- **Create**: Add new products with all details and images
- **Read**: View all products in an organized table
- **Update**: Edit existing products with image replacement
- **Delete**: Remove products with image cleanup

### ✅ Image Handling
- **Upload**: Drag and drop or file picker for new images
- **Preview**: Real-time image preview during upload
- **Replacement**: Automatic old image deletion when replacing
- **Storage**: Images stored in `/backend/uploads/` directory

### ✅ Search & Filter
- **Search**: Find products by name or category
- **Filter**: Filter by product category
- **Real-time**: Instant search results
- **Clear**: Easy reset of search/filter

### ✅ User Experience
- **Responsive**: Works on desktop and mobile
- **Loading States**: Clear feedback during operations
- **Error Handling**: Graceful error messages
- **Confirmation**: Delete confirmation dialogs

### ✅ Navigation
- **Seamless**: Easy navigation between pages
- **URL-based**: Bookmarkable pages
- **Breadcrumbs**: Clear navigation context
- **Back Buttons**: Easy return to dashboard

## 📁 File Structure

```
frontend/grocery/src/
├── pages/Admin/
│   ├── AdminDashboard.jsx      # Main dashboard page
│   ├── AddProductPage.jsx      # Add product page
│   └── EditProductPage.jsx     # Edit product page
├── components/admin/
│   ├── AdminHeader.jsx         # Dashboard header
│   ├── AdminProductTable.jsx   # Products table
│   └── ProductForm.jsx         # Add/Edit form
└── App.jsx                     # Main app with routing

backend/src/main/java/edu/cit/onlinegrocerysystem/
├── controller/
│   └── AdminProductController.java  # Admin API endpoints
├── service/
│   └── ProductService.java          # Business logic
└── config/
    └── StaticResourceConfig.java    # Image serving
```

## 🎨 UI Components

### Dashboard Layout
```
┌─────────────────────────────────────────────────────────┐
│ Admin Dashboard                    [Add Product]        │
│ 15 products found                                       │
├─────────────────────────────────────────────────────────┤
│ [Search Products...] [Category ▼] [Refresh]             │
├─────────────────────────────────────────────────────────┤
│ Product | Category | Price | Stock | Status | Actions   │
│ ────────┼──────────┼───────┼───────┼────────┼───────── │
│ 🖼️ Name │ Category │ $9.99 │ 25    │ 🏷️     │ [Edit]   │
│ ID: 1   │          │       │ stock │ Best   │ [Delete] │
└─────────────────────────────────────────────────────────┘
```

### Product Table Features
- **Product Column**: Image thumbnail + name + ID
- **Category**: Product category
- **Price**: Current price + sale price (if different)
- **Stock**: Color-coded stock levels (Green/Yellow/Red)
- **Status**: Best Seller and Discount badges
- **Actions**: Edit and Delete buttons

## 🔧 How to Use

### 1. Start the Application

**Backend:**
```bash
cd backend
./mvnw spring-boot:run
```

**Frontend:**
```bash
cd frontend/grocery
npm run dev
```

### 2. Access Admin Dashboard
Navigate to `http://localhost:5173` - you'll see the admin dashboard by default.

### 3. Add a Product
1. Click the "Add Product" button
2. Fill in all required fields
3. Upload an image
4. Click "Add Product"
5. You'll be redirected back to the dashboard

### 4. Edit a Product
1. Find the product in the dashboard table
2. Click the "Edit" button
3. Modify the fields as needed
4. Upload a new image if desired
5. Click "Update Product"
6. You'll be redirected back to the dashboard

### 5. Delete a Product
1. Find the product in the dashboard table
2. Click the "Delete" button
3. Confirm the deletion
4. The product and its image will be removed

### 6. Search and Filter
- **Search**: Type in the search box to find products by name or category
- **Filter**: Use the category dropdown to filter by specific categories
- **Refresh**: Click the refresh button to reload all products

## 🔗 Navigation Flow

```
Dashboard (/) 
    ├── Add Product (?page=add)
    ├── Edit Product (?edit={id})
    └── Delete Product (API call)
```

### URL Examples
- Dashboard: `http://localhost:5173/`
- Add Product: `http://localhost:5173/?page=add`
- Edit Product: `http://localhost:5173/?edit=1`

## 🛡️ Security Features

### Backend Security
- **Image Validation**: Only image files accepted
- **File Size Limits**: Prevents oversized uploads
- **Path Sanitization**: Prevents directory traversal
- **Error Handling**: Graceful error responses

### Frontend Security
- **Input Validation**: Form validation on all fields
- **Confirmation Dialogs**: Delete confirmations
- **Error Boundaries**: Graceful error handling
- **XSS Prevention**: Safe content rendering

## 📊 Data Flow

### Create Product
```
Frontend Form → Image Upload → Backend API → Database → Dashboard Refresh
```

### Update Product
```
Dashboard → Edit Form → Image Upload → Backend API → Old Image Delete → Database Update → Dashboard Refresh
```

### Delete Product
```
Dashboard → Delete Confirmation → Backend API → Image File Delete → Database Delete → Dashboard Refresh
```

## 🎯 Key Benefits

1. **Complete CRUD**: Full product lifecycle management
2. **Image Management**: Automatic image handling and replacement
3. **User-Friendly**: Intuitive interface with clear navigation
4. **Responsive**: Works on all device sizes
5. **Scalable**: Easy to extend with additional features
6. **Maintainable**: Clean, modular code structure

## 🔮 Future Enhancements

- **Bulk Operations**: Select multiple products for bulk actions
- **Advanced Filters**: Price range, date filters, etc.
- **Product Categories**: Category management interface
- **User Management**: Admin user authentication
- **Analytics**: Product performance metrics
- **Export**: Export product data to CSV/Excel

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading**: Check static resource configuration
2. **Upload failures**: Verify upload directory permissions
3. **Navigation issues**: Clear browser cache
4. **API errors**: Check backend server status

### Debug Tips

- Check browser console for frontend errors
- Check backend logs for API errors
- Verify database connectivity
- Test image upload directory permissions

---

The admin dashboard is now fully functional with complete CRUD operations, providing a professional interface for managing the grocery system's product catalog. 