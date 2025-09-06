# ElectroRepair: Electronics Repair Service Application

![ElectroRepair Logo](https://raw.githubusercontent.com/lucide-icons/lucide/master/icons/settings.svg)

## Overview

ElectroRepair is a modern, full-stack web application designed to streamline the process of electronics repair. It provides a robust platform for customers to place and track repair orders, for employees to manage their assigned tasks, and for administrators to oversee the entire operation. Built with React and powered by a Supabase backend, this application is production-ready, featuring a clean, responsive UI crafted with Tailwind CSS and an efficient, role-based access control system.

## ✨ Features

### General Features
* **Intuitive UI**: A sleek, appealing design built with Tailwind CSS.
* **Authentication**: Secure user login and signup using Supabase Auth.
* **Role-Based Access Control**: Different dashboards and permissions for customers, employees, and admins, implemented with protected routes and database policies.

### Customer Dashboard
* **Place New Orders**: Easily submit a new repair request with details about the device and problem.
* **Track Orders**: View a history of all submitted orders and their current status.
* **Profile Management**: Update personal information directly from the dashboard.

### Employee Dashboard
* **View Assigned Orders**: See a list of all orders assigned to them, categorized by status (In Progress, Completed).
* **Update Order Status**: Mark orders as "In Progress" or "Completed" as they work on them.

### Admin Dashboard
* **Order Management**: View all pending, in-progress, and completed orders.
* **Assign Orders**: Assign new orders to available employees with a single click.
* **Employee Management**: View all employee profiles and add new employees to the system.

## 💻 Tech Stack

* **Frontend**: React, TypeScript, Vite.
* **Styling**: Tailwind CSS.
* **Icons**: Lucide React.
* **State Management**: React Context API for authentication.
* **Backend**: Supabase (PostgreSQL for database, Auth for user management).
* **Routing**: React Router DOM v6.

## 🚀 Getting Started

### Prerequisites
* Node.js (v18 or higher)
* npm
* A Supabase account

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd laptop-repair-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Supabase Setup
1.  **Create a new Supabase project** and get your `Project URL` and `anon public key`.
2.  **Set up the database schema** by running the migration files in the `supabase/migrations/` directory in order:
    * `20250706183051_velvet_smoke.sql`
    * `20250707031714_white_dawn.sql`
    * `20250707032958_amber_sound.sql`
    * `20250707033924_quiet_jungle.sql`
3.  **Create a `.env` file** in the root of the project with your Supabase credentials:
    ```
    VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
    VITE_SUPABASE_ANON_KEY="YOUR_ANON_KEY"
    ```

### Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
2.  Open your browser and navigate to `http://localhost:5173`.

## 🤝 Contributing

We welcome contributions! Please feel free to open a pull request or submit an issue on the repository.
