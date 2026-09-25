# ProjectHub — Multi-User Project Management Platform

A modern **Angular-based project management platform** designed for multiple users, with role-based access, project tracking, employee management, assignments, dashboards, and secure REST API integration.

ProjectHub provides the **frontend experience** of a full-stack project management ecosystem, connected to a Spring Boot backend for authentication, business logic, data management, and persistence.

## ✨ Key Features

* 🔐 **Authentication & role-based access control**
* 👥 **Multi-user project management**
* 📊 **Interactive dashboards and data visualization**
* 📁 **Project creation and management**
* 👨‍💼 **Employee management**
* 🏷️ **Category management**
* 🔄 **Employee ↔ project assignments**
* 🛡️ **Route protection with Angular Guards**
* 🔑 **JWT authentication through HTTP interceptors**
* 🌐 **REST API integration**
* 📱 **Responsive Angular interface**
* ☁️ **Cloud deployment with Vercel**

## 🏗️ Full-Stack Architecture

ProjectHub is designed as a decoupled frontend application communicating with a dedicated backend API.

```text
┌──────────────────────────────┐
│        ProjectHub            │
│      Angular 16 Frontend     │
│                              │
│  • Authentication            │
│  • Dashboards                │
│  • Projects                  │
│  • Employees                 │
│  • Categories                │
│  • Assignments               │
└──────────────┬───────────────┘
               │
          REST API + JWT
               │
               ▼
┌──────────────────────────────┐
│       ProjectFlow            │
│    Spring Boot Backend       │
│                              │
│  • Business Logic            │
│  • Authentication            │
│  • Authorization             │
│  • PostgreSQL                │
│  • Project Management        │
└──────────────────────────────┘
```

## 👥 Multi-User Experience

The application supports different user experiences depending on the authenticated role.

### Administrator

Administrators can manage the main platform resources:

* Employees
* Projects
* Categories
* Employee/project assignments
* Administrative dashboards

### Employee

Employees access a dedicated workspace focused on their assigned projects and personal project activity.

This role-based structure creates a clear separation between **administrative operations and employee workflows**.

## 🔐 Frontend Security

ProjectHub implements several mechanisms to secure access to protected application areas.

### JWT Authentication

Authentication tokens are stored client-side and automatically attached to API requests through an Angular HTTP interceptor.

```text
User Login
    ↓
Authentication API
    ↓
JWT Token
    ↓
HTTP Interceptor
    ↓
Authorization: Bearer <token>
    ↓
Protected API
```

### Route Guards

Angular route guards prevent unauthorized users from accessing protected routes and verify the required role before allowing navigation.

```typescript
if (!isLoggedIn) {
    redirectToLogin();
}

if (requiredRole !== currentUser.role) {
    denyAccess();
}
```

## 📊 Dashboard & Data Visualization

The platform includes dashboard-oriented interfaces for presenting project and workforce information in a more accessible way.

Data visualization is implemented using:

* **Chart.js**
* **ng2-charts**
* Angular components
* REST API data

This provides users with a visual overview of project-management information rather than relying exclusively on raw tables.

## 🧩 Main Modules

| Module             | Purpose                               |
| ------------------ | ------------------------------------- |
| Authentication     | Login and user authentication         |
| Admin Dashboard    | Central administrative overview       |
| Projects           | Create, update and manage projects    |
| Employees          | Manage platform users/employees       |
| Categories         | Organize employees by category        |
| Assignments        | Manage employee/project relationships |
| Employee Workspace | Access assigned projects              |
| Shared Components  | Reusable UI and application elements  |

## 🛠️ Technology Stack

### Frontend

* **Angular 16**
* **TypeScript**
* **RxJS**
* **Angular Router**
* **Angular Forms**
* **Angular Material / CDK**
* **Chart.js**
* **ng2-charts**

### Architecture & Security

* Modular Angular architecture
* Feature-based organization
* REST API integration
* JWT authentication
* HTTP interceptors
* Route guards
* Role-based navigation
* Environment-based configuration

### Testing

* Jasmine
* Karma
* Angular TestBed
* Component and service specifications

### Deployment

* **Vercel**
* Production environment configuration
* SPA routing configuration
* Remote backend API integration

## 📁 Project Structure

```text
src/
├── app/
│   ├── admin/
│   │   ├── affectations/
│   │   ├── categories/
│   │   ├── dashboard/
│   │   ├── employes/
│   │   ├── layout/
│   │   └── projets/
│   │
│   ├── auth/
│   │   └── login/
│   │
│   ├── core/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── services/
│   │
│   ├── employe/
│   │   ├── employe-layout/
│   │   ├── employes-projet/
│   │   └── mes-projets/
│   │
│   └── shared/
│
├── environments/
│   ├── environment.ts
│   └── environment.development.ts
│
├── app-routing.module.ts
└── app.module.ts
```

## 🔌 API Integration

The frontend communicates with the Spring Boot backend through a centralized REST API configuration.

### Development

```text
Angular → http://localhost:8081/api
```

### Production

```text
Angular → Production REST API
```

Environment-based configuration allows the frontend to switch between development and production API endpoints without modifying application logic.

## ☁️ Deployment

ProjectHub is configured for deployment on **Vercel**, including SPA rewrite rules required by Angular routing.

```text
Developer
   │
   ▼
GitHub Repository
   │
   ▼
Vercel Build
   │
   ▼
Angular Production Build
   │
   ▼
Deployed ProjectHub
   │
   ▼
Production Spring Boot API
```

## 🧪 Testing

The project includes Angular testing infrastructure using **Jasmine, Karma and Angular TestBed**.

Tests are organized around important application components and services, including:

* Authentication
* Guards
* HTTP interceptors
* Dashboard components
* Project management
* Employee management
* Categories
* Assignments
* Layout components

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/erij2000/ProjectHub-Project-Management-Platform.git
cd ProjectHub-Project-Management-Platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
ng serve
```

The application will be available at:

```text
http://localhost:4200
```

Make sure the ProjectFlow Spring Boot backend is running locally when using the development environment.

## 🏆 Engineering Highlights

ProjectHub demonstrates practical experience with:

* **Angular application architecture**
* **Role-based multi-user applications**
* **JWT-based authentication flows**
* **Secure API communication**
* **Route-level authorization**
* **Modular feature organization**
* **REST API consumption**
* **Environment-specific configuration**
* **Dashboard and data visualization**
* **Cloud deployment**
* **Frontend/backend separation**
* **Automated frontend testing**

Rather than being a simple CRUD interface, ProjectHub is structured as the **client application of a complete multi-user project management system**, combining authentication, authorization, business workflows, dashboards, API integration, and cloud deployment.

## 🔮 Future Improvements

Potential extensions include:

* Advanced project filtering and search
* Real-time notifications
* Richer analytics dashboards
* File/document management
* Activity history and audit logs
* Advanced permission management
* CI/CD automation
* Enhanced automated testing
* Progressive Web App capabilities

## 🔗 Project Ecosystem

**ProjectHub** — Angular frontend and user experience
**ProjectFlow** — Spring Boot REST API and backend services

Together they form a complete **full-stack, role-based project management platform**.

---

**Developed by Erij Kacem**
Computer Engineering Student · Software Engineering · AI & Data
