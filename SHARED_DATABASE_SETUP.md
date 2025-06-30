# 🚀 Shared Database Setup - Quick Start

This guide shows you how to set up shared products between multiple PCs.

## 📋 **Prerequisites**

1. **MySQL/XAMPP** running on each PC
2. **Java 17+** installed on each PC
3. **Node.js 18+** installed on each PC

## 🔧 **Step 1: Create Shared Database**

### **Using phpMyAdmin (XAMPP):**
1. Open browser: `http://localhost/phpmyadmin`
2. Click "New" on the left sidebar
3. Database name: `online_grocery_db`
4. Click "Create"

### **Using MySQL Command Line:**
```sql
CREATE DATABASE online_grocery_db;
```

## 🖥️ **Step 2: Configure Each PC**

### **PC 1 (Alice) - Port 8080:**
```bash
# Backend
cd backend
./mvnw spring-boot:run -Dspring.profiles.active=shared

# Frontend (new terminal)
cd frontend/grocery
npm run dev
# Access: http://localhost:5173
```

### **PC 2 (Bob) - Port 8081:**
```bash
# Update backend port in application-shared.properties
server.port=8081

# Backend
cd backend
./mvnw spring-boot:run -Dspring.profiles.active=shared

# Frontend (new terminal)
cd frontend/grocery
# Update vite.config.js port to 5174
npm run dev
# Access: http://localhost:5174
```

### **PC 3 (Charlie) - Port 8082:**
```bash
# Update backend port in application-shared.properties
server.port=8082

# Backend
cd backend
./mvnw spring-boot:run -Dspring.profiles.active=shared

# Frontend (new terminal)
cd frontend/grocery
# Update vite.config.js port to 5175
npm run dev
# Access: http://localhost:5175
```

## 🎯 **Step 3: Test Shared Products**

### **Test Scenario:**
1. **Alice** (PC 1) adds: Apple, Banana
2. **Bob** (PC 2) adds: Milk, Bread
3. **Charlie** (PC 3) adds: Orange, Cheese

### **Expected Result:**
- All customers see: Apple, Banana, Milk, Bread, Orange, Cheese
- Products are shared across all PCs

## 🔄 **Environment Switching**

### **Using the UI:**
1. Look for the **Environment Switcher** in the top-right corner
2. Select **"Shared DB"** from the dropdown
3. Select your **Developer** (Alice/Bob/Charlie)
4. The app will automatically connect to the correct backend

### **Using URL Parameters:**
```
# For shared database
http://localhost:5173/?env=shared&dev=alice
http://localhost:5173/?env=shared&dev=bob
http://localhost:5173/?env=shared&dev=charlie

# For individual database
http://localhost:5173/?env=dev&dev=alice
```

## ⚠️ **Important Notes**

### **For Shared Database:**
- ✅ All developers see the same products
- ✅ Realistic customer experience
- ❌ Can interfere with each other's work
- ❌ Need to coordinate testing

### **Communication:**
- 📢 Notify team before making changes
- 📢 Schedule testing times
- 📢 Use test data, not real data

## 🚨 **Troubleshooting**

### **Port Conflicts:**
```bash
# Check what's using the port
netstat -ano | findstr :8080  # Windows
lsof -i :8080                 # macOS/Linux

# Kill process or change port
```

### **Database Connection Issues:**
- Ensure MySQL/XAMPP is running
- Check database name: `online_grocery_db`
- Verify username/password in configuration

### **Frontend Issues:**
- Clear browser cache
- Check console for errors
- Verify API endpoints are correct

## 🎉 **Success Indicators**

### **When Working Correctly:**
- ✅ All PCs can access the admin dashboard
- ✅ Products added on one PC appear on others
- ✅ Environment switcher shows "✅ Shared Products"
- ✅ No port conflicts or connection errors

### **Test Commands:**
```bash
# Test backend
curl http://localhost:8080/api/products

# Test frontend
curl http://localhost:5173
```

---

**🎯 You're now ready to work with shared products across multiple PCs!** 