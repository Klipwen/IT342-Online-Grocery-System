# 🤝 Collaborative Development Guide

This guide explains how multiple developers can work on the same project simultaneously without conflicts.

## 🎯 Development Strategies

### **Option 1: Individual Development (Recommended)**

Each developer works on their own local environment with separate databases and ports.

#### **Benefits:**
- ✅ No conflicts with other developers
- ✅ Independent testing and development
- ✅ No risk of breaking others' work
- ✅ Can work offline

#### **Setup for Each Developer:**

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd IT342-Online-Grocery-System
   ```

2. **Create Personal Configuration**
   ```bash
   # Copy and modify configuration files
   cp backend/src/main/resources/application.properties backend/src/main/resources/application-dev.properties
   ```

3. **Modify Ports (Avoid Conflicts)**
   
   **Developer A:**
   - Backend: Port 8080
   - Frontend: Port 5173
   
   **Developer B:**
   - Backend: Port 8081
   - Frontend: Port 5174
   
   **Developer C:**
   - Backend: Port 8082
   - Frontend: Port 5175

4. **Create Personal Database**
   ```sql
   -- Each developer creates their own database
   CREATE DATABASE online_grocery_db_dev_a;  -- Developer A
   CREATE DATABASE online_grocery_db_dev_b;  -- Developer B
   CREATE DATABASE online_grocery_db_dev_c;  -- Developer C
   ```

5. **Update Configuration Files**

   **For Developer B (example):**
   
   `backend/src/main/resources/application-dev.properties`:
   ```properties
   server.port=8081
   spring.datasource.url=jdbc:mysql://localhost:3306/online_grocery_db_dev_b
   ```

   `frontend/grocery/vite.config.js`:
   ```javascript
   server: {
     port: 5174,
     proxy: {
       '/api': {
         target: 'http://localhost:8081',
       }
     }
   }
   ```

6. **Run with Development Profile**
   ```bash
   # Backend
   ./mvnw spring-boot:run -Dspring.profiles.active=dev
   
   # Frontend
   npm run dev
   ```

### **Option 2: Shared Development Environment**

All developers work on the same shared environment (not recommended for active development).

#### **Setup:**
1. **Shared Database**: All developers connect to the same database
2. **Shared Ports**: Coordinate port usage
3. **Communication**: Notify team before making changes

#### **Risks:**
- ❌ Data conflicts
- ❌ Code overwrites
- ❌ Broken functionality
- ❌ Hard to debug issues

## 🔄 Git Workflow for Collaboration

### **Best Practices:**

1. **Create Feature Branches**
   ```bash
   git checkout -b feature/admin-dashboard
   git checkout -b feature/user-authentication
   git checkout -b feature/payment-integration
   ```

2. **Regular Commits**
   ```bash
   git add .
   git commit -m "Add admin dashboard CRUD functionality"
   ```

3. **Pull Before Push**
   ```bash
   git pull origin main
   git push origin feature/admin-dashboard
   ```

4. **Create Pull Requests**
   - Merge feature branches to main
   - Code review before merging
   - Resolve conflicts in pull requests

### **Branch Naming Convention:**
```
feature/description
bugfix/description
hotfix/description
```

## 🛠️ Development Environment Setup

### **Individual Developer Setup:**

#### **1. Personal Configuration Files**

Create `backend/src/main/resources/application-dev-[name].properties`:

```properties
# Developer A Configuration
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/online_grocery_db_dev_a
spring.datasource.username=root
spring.datasource.password=

# Developer B Configuration  
server.port=8081
spring.datasource.url=jdbc:mysql://localhost:3306/online_grocery_db_dev_b
spring.datasource.username=root
spring.datasource.password=
```

#### **2. Frontend Configuration**

Update `frontend/grocery/vite.config.js` for each developer:

```javascript
// Developer A
server: { port: 5173, proxy: { '/api': { target: 'http://localhost:8080' } } }

// Developer B  
server: { port: 5174, proxy: { '/api': { target: 'http://localhost:8081' } } }
```

#### **3. Environment Variables (Optional)**

Create `.env` files for each developer:

```bash
# .env.developer-a
VITE_API_URL=http://localhost:8080
VITE_FRONTEND_PORT=5173

# .env.developer-b
VITE_API_URL=http://localhost:8081
VITE_FRONTEND_PORT=5174
```

## 📋 Development Checklist

### **Before Starting Work:**
- [ ] Pull latest changes from main branch
- [ ] Create feature branch
- [ ] Update personal configuration
- [ ] Test local setup

### **During Development:**
- [ ] Regular commits with clear messages
- [ ] Test functionality locally
- [ ] Communicate with team about major changes

### **Before Pushing:**
- [ ] Pull latest changes
- [ ] Resolve any conflicts
- [ ] Test all functionality
- [ ] Create pull request

## 🚨 Conflict Resolution

### **Common Conflicts and Solutions:**

#### **1. Database Schema Conflicts**
```sql
-- If database schemas get out of sync
DROP DATABASE online_grocery_db_dev_a;
CREATE DATABASE online_grocery_db_dev_a;
-- Restart application to recreate schema
```

#### **2. Port Conflicts**
```bash
# Check what's using the port
netstat -ano | findstr :8080  # Windows
lsof -i :8080                 # macOS/Linux

# Kill process or change port
```

#### **3. Git Merge Conflicts**
```bash
# Resolve conflicts in conflicted files
git status
# Edit conflicted files
git add .
git commit -m "Resolve merge conflicts"
```

## 🎯 Recommended Workflow

### **Daily Development:**
1. **Start of Day:**
   ```bash
   git pull origin main
   git checkout feature/your-feature
   ```

2. **During Development:**
   ```bash
   # Make changes
   git add .
   git commit -m "Descriptive commit message"
   ```

3. **End of Day:**
   ```bash
   git push origin feature/your-feature
   ```

### **Feature Completion:**
1. **Create Pull Request**
2. **Code Review**
3. **Merge to Main**
4. **Delete Feature Branch**

## 📞 Team Communication

### **Communication Channels:**
- **Git Commit Messages**: Clear, descriptive messages
- **Pull Request Descriptions**: Explain changes and testing
- **Team Chat**: Notify about major changes
- **Documentation**: Update README files

### **Important Notifications:**
- Database schema changes
- New API endpoints
- Breaking changes
- Configuration updates

## 🔧 Tools for Collaboration

### **Recommended Tools:**
- **Git**: Version control
- **GitHub/GitLab**: Repository hosting
- **Slack/Discord**: Team communication
- **Trello/Jira**: Task management
- **Postman**: API testing

### **Development Tools:**
- **VS Code**: Code editor with Git integration
- **DBeaver**: Database management
- **Postman**: API testing
- **Chrome DevTools**: Frontend debugging

## 🎉 Success Tips

### **For Smooth Collaboration:**
1. **Always pull before starting work**
2. **Use descriptive commit messages**
3. **Test your changes thoroughly**
4. **Communicate with your team**
5. **Keep your local environment clean**
6. **Document your changes**

### **Avoid These Mistakes:**
- ❌ Working directly on main branch
- ❌ Pushing without testing
- ❌ Using same ports as others
- ❌ Not communicating changes
- ❌ Ignoring merge conflicts

---

**🎯 With these practices, your team can work efficiently without conflicts!** 