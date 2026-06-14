# Sales Analytics Platform

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Node.js](https://img.shields.io/badge/Node.js-20-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)

A production-ready full-stack SaaS analytics platform built with **React**, **Node.js**, **TypeScript**, **PostgreSQL**, **Prisma ORM**, and **Docker**.

The application provides business intelligence capabilities through interactive dashboards, customer insights, product performance tracking, revenue analysis, and role-based access control.

## 🚀 Features

### Analytics Dashboard

-   KPI cards (Total Orders, Revenue, Average Ticket)
-   Monthly Revenue Line Chart
-   Revenue by Category Bar Chart
-   Top 10 Customers
-   Top 10 Products
-   Custom Date Filters

### Order Management

-   Paginated order listing
-   Status, customer, and date filters
-   CSV export
-   Order details with items, quantities, prices, and subtotals

### Customer Management

- Customer listing with pagination
- Customer details page
- Order history visualization

### Product Management

-   Product listing
-   Search functionality
-   Category filtering

### User Management

-   Admin-only user listing
-   Role-based access control (RBAC)

### Security

-   JWT Authentication
-   Protected API endpoints
-   Protected frontend routes
-   Password hashing with bcrypt

### User Experience

-   Responsive layout
-   Collapsible sidebar
-   Dark/Light theme support
-   Loading and empty states

### Testing

- End-to-End testing with Playwright
- SQL validation tests
- Backend API tests

## 🧱 Tech Stack

| Layer       | Technologies |
|-------------|--------------|
| Frontend    | React, TypeScript, Vite, Tailwind CSS, React Query, React Router, Recharts, Axios |
| Backend     | Node.js, Express, TypeScript, Prisma ORM, JWT (bcrypt, jsonwebtoken), Zod validation |
| Database    | PostgreSQL (schema `sales`), views, triggers, functions, migrations |
| Testing     | Playwright (E2E), SQL validation tests |
| DevOps      | Docker Compose, environment variables, Prisma migrations |

### Architecture

```
Frontend (React) 
    ↓ 
REST API 
    ↓ 
Backend (Node.js + Express)
    ↓ 
Prisma ORM 
    ↓ 
PostgreSQL
```

### Technical Highlights

-   Full TypeScript stack
-   Modular backend architecture
-   PostgreSQL views and triggers
-   Role-Based Access Control (RBAC)
-   JWT Authentication
-   CSV Export functionality
-   React Query data caching
-   Dockerized development environment
-   End-to-End testing with Playwright
-   SQL validation suite

## 📁 Project Structure


```
sales-analytics-platform
│
├── backend
│   ├── src
│   ├── prisma
│   └── tests
│
├── frontend
│   ├── src
│   └── tests-e2e
│
├── database
│   ├── migrations
│   ├── seed
│   ├── views
│   ├── triggers
│   ├── functions
│   ├── procedures
│   └── tests
│
├── docs
│   ├── architecture.md
│   ├── database.md
│   ├── api.md
│   └── deployment.md
│
├── docker-compose.yml
└── README.md
```

## Main API Endpoints

### Authentication
```http
POST /auth/login
```
### Dashboard
```http
GET /dashboard/summary 
GET /dashboard/revenue 
GET /dashboard/top-customers 
GET /dashboard/top-products 
GET /dashboard/categories
```
### Customers
```http
GET /customers
GET /customers/:id
```
## Products
```http
GET /products
```
## Orders
```http
GET /orders
GET /orders/:id
```
##Users
```http
GET /users
```

## ⚙️ Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (if running locally)
- PostgreSQL 14+ (if not using Docker)

### 1. Clone and set up environment
```bash
git clone <your-repo-url>
cd sales-analytics-platform
cp backend/.env.example backend/.env
```
# Edit backend/.env with your DB credentials and JWT secret

### 2. Start the database (Docker)

```bash
docker-compose up -d database
```

### 3. Run database migrations and seeds

```sql
docker exec -i sales_analytics_db psql -U postgres -d sales_analytics < database/scripts/01_setup_database.sql
docker exec -i sales_analytics_db psql -U postgres -d sales_analytics < database/scripts/02_load_seeds.sql
docker exec -i sales_analytics_db psql -U postgres -d sales_analytics < database/scripts/03_create_objects.sql
```
### 4. Start the backend
```bash
cd backend
npm install
npx prisma generate
npm run dev
```
### 5. Start the frontend

```bash
cd frontend
npm install
npm run dev
```
**Obs** : The app will be available at http://localhost:5173.

## Demo Credentials

Email:
admin@sales.com

Password:
123456

## Running Tests

### Playwright (E2E)

```bash
cd frontend
npx playwright test
```
### SQL tests

```sql
docker exec -i sales_analytics_db psql -U postgres -d sales_analytics < database/scripts/04_run_tests.sql
```


# Dashboard Views

The dashboard uses PostgreSQL views to aggregate data efficiently:

| View | Description |
|--------|-------------|
| sales.vw_sales_summary | Total orders, revenue, average ticket |
| sales.vw_monthly_revenue | Revenue grouped by month |
| sales.vw_top_customers | Top customers by total spent |
| sales.vw_top_products | Top products by units sold |
| sales.vw_sales_by_category | Revenue by category |

These views are automatically updated when new orders are inserted (triggers keep total_amount in sync).

# Authentication & Roles

- JWT tokens – generated on login, stored in localStorage

- Role‑based access – ADMIN users can access /users page

- Protected routes – frontend redirects to login if not authenticated

- API middleware – backend validates token on every private endpoint


##  Why This Project?

This project simulates a real-world SaaS analytics platform used by managers and administrators to monitor business performance.

It demonstrates:

- Full‑stack application development
- Database design and optimization
- API architecture and security
- Modern React development practices
- Automated testing strategies
- Production‑oriented project organization

## Demo

Coming soon.

Screenshots and live deployment will be available in future releases.

# Contact

Pablo Vinícius Sousa Silva

- LinkedIn: [linkedin.com/in/pabloviniciusss](https://www.linkedin.com/in/pabloviniciusss)
- GitHub: [github.com/PabloVSS](https://github.com/PabloVSS)
- Email: [sviniciuspablo@gmail.com](mailto:sviniciuspablo@gmail.com)
