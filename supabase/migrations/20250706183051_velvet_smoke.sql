/*
  # Create Electronics Repair Service Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key, matches auth.users)
      - `email` (text, unique)
      - `name` (text)
      - `phone` (text)
      - `address` (text)
      - `city` (text)
      - `pincode` (text)
      - `role` (text, enum: customer, admin, employee)
      - `age` (integer, optional)
      - `status` (text, default: active)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `orders`
      - `id` (uuid, primary key)
      - `customer_id` (uuid, foreign key to users)
      - `customer_name` (text)
      - `device_type` (text)
      - `device_model` (text)
      - `model_number` (text)
      - `problem` (text)
      - `expected_timeline` (text)
      - `quotation` (decimal, optional)
      - `status` (text, enum: pending, accepted, in_progress, completed, rejected)
      - `assigned_employee_id` (uuid, foreign key to users, optional)
      - `assigned_employee_name` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Customers can only access their own data
    - Admins can access all data
    - Employees can access assigned orders

  3. Functions
    - Trigger to update updated_at timestamp
    - Function to automatically assign user role on signup
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  phone text,
  address text,
  city text,
  pincode text,
  role text NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'employee')),
  age integer,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  customer_name text,
  device_type text NOT NULL,
  device_model text NOT NULL,
  model_number text NOT NULL,
  problem text NOT NULL,
  expected_timeline text NOT NULL,
  quotation decimal(10,2),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'rejected')),
  assigned_employee_id uuid REFERENCES users(id) ON DELETE SET NULL,
  assigned_employee_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at 
  BEFORE UPDATE ON orders 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can read all users"
  ON users
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Admins can update all users"
  ON users
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Admins can insert users"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Orders policies
CREATE POLICY "Customers can read own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

CREATE POLICY "Customers can create orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Admins can read all orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Admins can update all orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Employees can read assigned orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (assigned_employee_id = auth.uid());

CREATE POLICY "Employees can update assigned orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (assigned_employee_id = auth.uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_assigned_employee_id ON orders(assigned_employee_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- Function to handle user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email, role)
  VALUES (NEW.id, NEW.email, 'customer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create view for employee statistics
CREATE OR REPLACE VIEW employee_stats AS
SELECT 
  u.id,
  u.email,
  u.name,
  u.phone,
  u.age,
  u.address,
  u.city,
  u.pincode,
  u.status,
  u.created_at,
  u.updated_at,
  COALESCE(total_orders.count, 0) as total_assigned,
  COALESCE(completed_orders.count, 0) as completed_orders,
  COALESCE(in_progress_orders.count, 0) as in_progress_orders
FROM users u
LEFT JOIN (
  SELECT assigned_employee_id, COUNT(*) as count
  FROM orders
  WHERE assigned_employee_id IS NOT NULL
  GROUP BY assigned_employee_id
) total_orders ON u.id = total_orders.assigned_employee_id
LEFT JOIN (
  SELECT assigned_employee_id, COUNT(*) as count
  FROM orders
  WHERE assigned_employee_id IS NOT NULL AND status = 'completed'
  GROUP BY assigned_employee_id
) completed_orders ON u.id = completed_orders.assigned_employee_id
LEFT JOIN (
  SELECT assigned_employee_id, COUNT(*) as count
  FROM orders
  WHERE assigned_employee_id IS NOT NULL AND status IN ('accepted', 'in_progress')
  GROUP BY assigned_employee_id
) in_progress_orders ON u.id = in_progress_orders.assigned_employee_id
WHERE u.role = 'employee';