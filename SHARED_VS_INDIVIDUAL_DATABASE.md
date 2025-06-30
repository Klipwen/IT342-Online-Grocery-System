# 🗄️ Shared vs Individual Database - When to Use Each

This guide explains the difference between individual and shared database approaches for collaborative development.

## 🎯 **Two Approaches**

### **Approach 1: Individual Databases (Current Setup)**
```
Developer A: online_grocery_db_dev_alice
Developer B: online_grocery_db_dev_bob
Developer C: online_grocery_db_dev_charlie
```

### **Approach 2: Shared Database**
```
All Developers: online_grocery_db (same database)
```

## 📊 **Comparison Table**

| Aspect | Individual Databases | Shared Database |
|--------|---------------------|-----------------|
| **Product Sharing** | ❌ No - Each PC has different products | ✅ Yes - All PCs see same products |
| **Customer Experience** | ❌ Different products per PC | ✅ Consistent experience across PCs |
| **Development Safety** | ✅ Safe - Can't break others' work | ❌ Risky - Can affect others |
| **Testing** | ✅ Independent testing | ❌ Can interfere with others |
| **Data Conflicts** | ✅ None | ❌ Possible conflicts |
| **Setup Complexity** | ✅ Simple | ✅ Simple |

## 🔧 **How to Set Up Each Approach**

### **Option 1: Individual Databases (Recommended for Development)**

#### **Setup:**
```bash
# Each developer creates their own database
CREATE DATABASE online_grocery_db_dev_alice;
CREATE DATABASE online_grocery_db_dev_bob;
CREATE DATABASE online_grocery_db_dev_charlie;
```

#### **Configuration:**
```properties
# application-dev.properties
spring.datasource.url=jdbc:mysql://localhost:3306/online_grocery_db_dev_[your-name]
```

#### **Run:**
```bash
./mvnw spring-boot:run -Dspring.profiles.active=dev
```

#### **Result:**
- ✅ Each developer works independently
- ❌ Customers see different products on different PCs
- ✅ Safe development environment

### **Option 2: Shared Database (For Testing Customer Experience)**

#### **Setup:**
```bash
# All developers use the same database
CREATE DATABASE online_grocery_db;
```

#### **Configuration:**
```properties
# application-shared.properties
spring.datasource.url=jdbc:mysql://localhost:3306/online_grocery_db
```

#### **Run:**
```bash
./mvnw spring-boot:run -Dspring.profiles.active=shared
```

#### **Result:**
- ✅ All customers see the same products
- ❌ Developers can interfere with each other
- ✅ Realistic customer experience

## 🎯 **When to Use Each Approach**

### **Use Individual Databases When:**
- 🔧 **Active Development**: Working on new features
- 🧪 **Testing**: Testing different scenarios
- 🐛 **Debugging**: Fixing bugs without affecting others
- 📝 **Learning**: Learning the codebase safely

### **Use Shared Database When:**
- 👥 **Customer Testing**: Testing how customers see products
- 🎭 **Demo**: Showing the application to stakeholders
- 🔄 **Integration Testing**: Testing how features work together
- 📊 **Data Validation**: Ensuring data consistency

## 🚀 **Recommended Workflow**

### **Phase 1: Development (Individual Databases)**
```bash
# Each developer works independently
./mvnw spring-boot:run -Dspring.profiles.active=dev
```

**Benefits:**
- Safe development
- No conflicts
- Independent testing

### **Phase 2: Integration Testing (Shared Database)**
```bash
# Test with shared database
./mvnw spring-boot:run -Dspring.profiles.active=shared
```

**Benefits:**
- Test customer experience
- Validate data consistency
- Demo to stakeholders

### **Phase 3: Production (Shared Database)**
```bash
# Production deployment
./mvnw spring-boot:run -Dspring.profiles.active=prod
```

## 📋 **Step-by-Step Setup for Shared Database**

### **Step 1: Create Shared Database**
```sql
-- All developers run this
CREATE DATABASE online_grocery_db;
```

### **Step 2: Coordinate Ports**
```properties
# Developer A
server.port=8080

# Developer B  
server.port=8081

# Developer C
server.port=8082
```

### **Step 3: Run with Shared Profile**
```bash
# All developers run this
./mvnw spring-boot:run -Dspring.profiles.active=shared
```

### **Step 4: Test Customer Experience**
- Developer A adds products
- Developer B adds different products
- All customers see both sets of products

## ⚠️ **Important Considerations**

### **For Shared Database:**

#### **1. Communication is Key**
```bash
# Before making changes, notify team:
"Adding new products to shared database"
"Testing admin features"
"Resetting database for demo"
```

#### **2. Coordinate Testing**
```bash
# Don't test during others' demos
# Schedule testing times
# Use test data, not real data
```

#### **3. Backup Strategy**
```sql
-- Regular backups
mysqldump -u root -p online_grocery_db > backup_shared.sql
```

### **For Individual Databases:**

#### **1. Regular Sync**
```bash
# Pull latest code changes
git pull origin main

# Update your local database schema
# Restart application
```

#### **2. Data Migration**
```sql
-- When needed, migrate data between databases
-- Export from one, import to another
```

## 🎉 **Best Practices**

### **Development Workflow:**
1. **Start with Individual Databases** for development
2. **Switch to Shared Database** for integration testing
3. **Use Shared Database** for demos and customer testing
4. **Return to Individual Databases** for continued development

### **Communication:**
- 📢 Notify team when switching to shared database
- 📢 Coordinate testing schedules
- 📢 Backup shared database regularly
- 📢 Use clear commit messages

### **Testing:**
- 🧪 Test features on individual database first
- 🧪 Test integration on shared database
- 🧪 Validate customer experience regularly

## 🔄 **Quick Switch Commands**

### **Switch to Individual Development:**
```bash
./mvnw spring-boot:run -Dspring.profiles.active=dev
```

### **Switch to Shared Development:**
```bash
./mvnw spring-boot:run -Dspring.profiles.active=shared
```

### **Check Current Profile:**
```bash
# Look at application logs to see which profile is active
```

---

**🎯 Choose the right approach based on your current needs!** 