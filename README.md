
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
### Products
```http
GET /products
```
### Orders
```http
GET /orders
GET /orders/:id
```
### Users
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

[Gravação_de_tela_20260614_111226.webm](https://github.com/user-attachments/assets/252b1757-3bfa-4d83-a389-1b4f8abe9b9a)


## 📸 Screenshots

### Login Page

<img width="1861" height="988" alt="login" src="https://github.com/user-attachments/assets/dff55384-b2f5-4409-9ccf-7f9b8bd02cd2" />


### Analytics Dashboard

-    **Dark**

<img width="1868" height="995" alt="dashboard_escuro" src="https://github.com/user-attachments/assets/b20eee71-c071-4907-ba4c-1a47f564e16b" />

-    **Light**

  <img width="1868" height="995" alt="dashboard_light" src="https://github.com/user-attachments/assets/600249ec-5793-468b-af86-c149b7a62e29" />


### Products

<img width="1868" height="995" alt="tela_produtos" src="https://github.com/user-attachments/assets/cd4fa066-11ad-4853-8580-37ca653de6b6" />


### Orders 

<img width="1868" height="995" alt="pedidos" src="https://github.com/user-attachments/assets/157bf3b6-5ef6-4aee-85f6-9e57e6b1442f" />

### Orders Details

<img width="1868" height="995" alt="detalhe_pedidos" src="https://github.com/user-attachments/assets/c4311340-4446-40b6-a100-81c7a3a2846b" />


### Customer 

<img width="1868" height="995" alt="clientes" src="https://github.com/user-attachments/assets/c189e2ad-3ca1-435e-a27b-d9b8308fb7a9" />

### Customer Details

<img width="1868" height="995" alt="Screenshot 2026-06-14 at 11-08-50 frontend" src="https://github.com/user-attachments/assets/0e60884a-0a9c-4512-a6aa-f59cf6690c7f" />


### User Management (Admin)

<img width="1868" height="995" alt="Screenshot 2026-06-14 at 10-36-23 frontend" src="https://github.com/user-attachments/assets/d5c67fe3-9b5f-487e-be1d-54b178145cd3" />


# Contact

Pablo Vinícius Sousa Silva

- LinkedIn: [linkedin.com/in/pabloviniciusss](https://www.linkedin.com/in/pabloviniciusss)
- GitHub: [github.com/PabloVSS](https://github.com/PabloVSS)
- Email: [sviniciuspablo@gmail.com](mailto:sviniciuspablo@gmail.com)
