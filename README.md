# IT342-Online-Grocery-System

An online grocery system built with Spring Boot (backend) and React (frontend). This project is developed as part of IT342 coursework, following best practices for version control, modular design, and iterative MVP development.

## Figma UI/Prototype

Figma Design Link: [Figma @blissfuljuan](https://www.figma.com/@blissfuljuan)

*Please ensure you have access to the Figma file. If not, request access from the owner or provide a direct file link.*

## GitHub Repository

This repository contains both backend and frontend code. Please use feature branches and clear commit messages for contributions.

## Getting Started

### Prerequisites
- Node.js (for frontend)
- Java 17+ and Maven (for backend)
- MySQL (database)

### Backend Setup
1. Navigate to `backend/`
2. Configure your MySQL database in `src/main/resources/application.properties` (default: `online_grocery_db`)
3. Run: `./mvnw spring-boot:run` (Linux/Mac) or `mvnw.cmd spring-boot:run` (Windows)

### Frontend Setup
1. Navigate to `frontend/grocery/`
2. Run: `npm install`
3. Run: `npm run dev`

### Accessing the App
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:8080](http://localhost:8080)

## MVP Milestone
- User registration/login
- Product listing
- Add to cart
- Checkout
- Admin product management

Further enhancements will be added iteratively.

