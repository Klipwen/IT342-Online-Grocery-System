# 🚀 Project Setup Guide - Run on Any PC

This guide will help you set up and run the Online Grocery System on any PC after cloning the repository.

## 📋 Prerequisites

### **Required Software**
1. **Java 17 or higher**
   - Download from: https://adoptium.net/
   - Verify: `java -version`

2. **Node.js 18 or higher**
   - Download from: https://nodejs.org/
   - Verify: `node -v` and `npm -v`

3. **MySQL Database**
   - **Option A**: XAMPP (Recommended for beginners)
     - Download from: https://www.apachefriends.org/
     - Includes MySQL, Apache, and phpMyAdmin
   - **Option B**: MySQL Community Server
     - Download from: https://dev.mysql.com/downloads/mysql/

4. **Git** (for cloning)
   - Download from: https://git-scm.com/

## 🔧 Step-by-Step Setup

### **Step 1: Clone the Repository**
```bash
git clone <your-repository-url>
cd IT342-Online-Grocery-System
```

### **Step 2: Database Setup**

#### **Using XAMPP (Recommended)**
1. **Start XAMPP**
   - Open XAMPP Control Panel
   - Start Apache and MySQL services
   - Both should show green status

2. **Create Database**
   - Open browser: `http://localhost/phpmyadmin`
   - Click "New" on the left sidebar
   - Database name: `online_grocery_db`
   - Click "Create"

#### **Using MySQL Community Server**
1. **Start MySQL Service**
   ```bash
   # Windows
   net start mysql
   
   # macOS/Linux
   sudo systemctl start mysql
   ```

2. **Create Database**
   ```bash
   mysql -u root -p
   CREATE DATABASE online_grocery_db;
   exit;
   ```

### **Step 3: Backend Setup**

1. **Navigate to Backend Directory**
   ```bash
   cd backend
   ```

2. **Create Uploads Directory**
   ```bash
   # Windows
   mkdir uploads
   
   # macOS/Linux
   mkdir uploads
   ```

3. **Run the Backend**
   ```bash
   # Windows
   ./mvnw.cmd spring-boot:run
   
   # macOS/Linux
   ./mvnw spring-boot:run
   ```

4. **Verify Backend is Running**
   - Open browser: `http://localhost:8080`
   - You should see the Spring Boot application running

### **Step 4: Frontend Setup**

1. **Open New Terminal and Navigate to Frontend**
   ```bash
   cd frontend/grocery
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Frontend Development Server**
   ```bash
   npm run dev
   ```

4. **Verify Frontend is Running**
   - Open browser: `http://localhost:5173`
   - You should see the application homepage

## 🎯 Access Points

### **Main Application**
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:8080`

### **Admin Dashboard**
- **Dashboard**: `http://localhost:5173/`
- **Add Product**: `http://localhost:5173/?page=add`
- **Edit Product**: `http://localhost:5173/?edit={productId}`

### **Database Management**
- **phpMyAdmin** (XAMPP): `http://localhost/phpmyadmin`
- **MySQL Command Line**: `mysql -u root -p`

## 🔍 Troubleshooting

### **Common Issues & Solutions**

#### **1. Port Already in Use**
```bash
# Check what's using the port
# Windows
netstat -ano | findstr :8080
netstat -ano | findstr :5173

# macOS/Linux
lsof -i :8080
lsof -i :5173

# Kill the process
# Windows
taskkill /PID <process_id> /F

# macOS/Linux
kill -9 <process_id>
```

#### **2. Database Connection Issues**
- **Error**: "Access denied for user 'root'@'localhost'"
  - **Solution**: Reset MySQL root password or create new user
  - **XAMPP**: Default password is empty
  - **MySQL Server**: Use the password you set during installation

#### **3. Java Version Issues**
```bash
# Check Java version
java -version

# Should show Java 17 or higher
# If not, install/update Java
```

#### **4. Node.js Version Issues**
```bash
# Check Node.js version
node -v
npm -v

# Should show Node.js 18+ and npm 8+
# If not, install/update Node.js
```

#### **5. Image Upload Issues**
- **Error**: "Uploads directory not found"
  - **Solution**: Ensure `backend/uploads/` directory exists
  - **Create it manually if needed**

#### **6. Frontend Build Issues**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### **Platform-Specific Notes**

#### **Windows**
- Use `./mvnw.cmd` instead of `./mvnw`
- Use backslashes in file paths if needed
- Ensure Windows Defender doesn't block the application

#### **macOS**
- Use `./mvnw` (Unix line endings)
- May need to grant permissions to terminal
- Use `chmod +x mvnw` if permission denied

#### **Linux**
- Use `./mvnw` (Unix line endings)
- May need to install additional dependencies
- Use `sudo` for system-wide installations

## 📁 Project Structure

```
IT342-Online-Grocery-System/
├── backend/
│   ├── src/
│   ├── uploads/          # Create this directory
│   ├── pom.xml
│   └── mvnw
├── frontend/
│   └── grocery/
│       ├── src/
│       ├── package.json
│       └── vite.config.js
└── README.md
```

## 🔄 Development Workflow

### **Daily Development**
1. **Start XAMPP** (MySQL + Apache)
2. **Start Backend**: `./mvnw spring-boot:run`
3. **Start Frontend**: `npm run dev`
4. **Access**: `http://localhost:5173`

### **Making Changes**
- **Frontend**: Changes auto-reload at `http://localhost:5173`
- **Backend**: Restart server after Java changes
- **Database**: Use phpMyAdmin for manual database operations

## 🚀 Production Deployment

### **For Production Use**
1. **Build Frontend**: `npm run build`
2. **Build Backend**: `./mvnw clean package`
3. **Configure Production Database**
4. **Set up Web Server** (Apache/Nginx)
5. **Configure Environment Variables**

## 📞 Support

### **If You Encounter Issues**
1. Check this guide first
2. Verify all prerequisites are installed
3. Check console/terminal for error messages
4. Ensure ports 8080 and 5173 are available
5. Verify database is running and accessible

### **Useful Commands**
```bash
# Check if services are running
# Backend
curl http://localhost:8080

# Frontend
curl http://localhost:5173

# Database (if using XAMPP)
curl http://localhost/phpmyadmin
```

---

## ⚠️ IMPORTANT: Configuration Checklist Before Running the Project

Before running the Online Grocery System backend and frontend, **every team member must check and update the following settings** to avoid common errors (such as images not displaying, connection refused, or 404 errors):

### 1. **Port Assignments**
- **Backend Port:**
  - Open `backend/src/main/resources/application.properties` (or `application-shared.properties` if using shared DB).
  - Set `server.port` to your assigned port (e.g., `8080`, `8081`, `8082`, etc.).
  - Example:
    ```properties
    server.port=8080
    ```
- **Frontend API URLs:**
  - Open `frontend/grocery/src/config/api.js` and ensure the backend URLs use the correct port for your environment.
  - Example:
    ```js
    backend: 'http://localhost:8080',
    ```

### 2. **Static Resource Paths (Image Uploads)**
- **Backend Static Resource Config:**
  - In `backend/src/main/resources/application.properties`, update the static locations to match your actual user path:
    ```properties
    spring.web.resources.static-locations=classpath:/static/,file:./uploads/,file:C:/Users/<YOUR_USERNAME>/Desktop/Programming/IT342-Online-Grocery-System/backend/uploads
    ```
  - Replace `<YOUR_USERNAME>` with your actual Windows username and adjust the path if your folder structure is different.
- **Custom StaticResourceConfig.java:**
  - If you have a custom config (e.g., `StaticResourceConfig.java`), update the absolute path to match your machine:
    ```java
    registry.addResourceHandler("/uploads/**")
        .addResourceLocations(
            "file:C:/Users/<YOUR_USERNAME>/Desktop/Programming/IT342-Online-Grocery-System/backend/uploads/",
            "file:./uploads/");
    ```

### 3. **Database Connection**
- Make sure your `spring.datasource.url`, `username`, and `password` in `application.properties` match your local MySQL setup.

### 4. **Spring Security (if enabled)**
- Ensure `/uploads/**` is permitted in your `SecurityConfig.java` so images can be accessed without authentication.

### 5. **After Pulling or Switching Branches**
- **Always check the above settings** after pulling updates or switching branches, as configs may be overwritten.
- If you see errors like `ERR_CONNECTION_REFUSED`, `404 Not Found` for images, or images not displaying, double-check your port and path settings.

### 6. **Common Issues & Solutions**
- **Images not displaying:**
  - Check that the image files exist in the correct `backend/uploads` folder.
  - Make sure the backend is running and serving the correct static locations.
  - Ensure the image URLs in the database use the correct port (delete and re-add products if needed).
- **Connection refused:**
  - Make sure the backend is running on the port your frontend expects.
- **404 for images:**
  - Check the static resource paths and file existence.

### 7. **Restart Required**
- After changing any config or code, **restart your backend** for changes to take effect.
- Restart the frontend if you change API URLs or environment variables.

---

**Following this checklist will help you avoid the most common setup and runtime errors!**

---

**🎉 You're all set!** The project should now run on any PC with the required software installed. 