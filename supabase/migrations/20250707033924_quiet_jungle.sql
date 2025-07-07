/*
  # Fix Authentication and RLS Issues

  1. Security Changes
    - Remove all conflicting RLS policies
    - Create simple, non-recursive policies
    - Fix admin access without circular references
    - Enable proper user creation flow

  2. Database Changes
    - Update trigger function for new users
    - Ensure proper user creation during signup
    - Fix policy conflicts
*/

-- Disable RLS temporarily to clean up
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Enable read access for users on own data" ON users;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON users;
DROP POLICY IF EXISTS "Enable update for users on own data" ON users;
DROP POLICY IF EXISTS "Enable admin read access" ON users;
DROP POLICY IF EXISTS "Enable admin insert access" ON users;
DROP POLICY IF EXISTS "Enable admin update access" ON users;
DROP POLICY IF EXISTS "Users can insert own data" ON users;
DROP POLICY IF EXISTS "Allow user creation during signup" ON users;
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Admins can insert users" ON users;
DROP POLICY IF EXISTS "Admins can read all users" ON users;
DROP POLICY IF EXISTS "Admins can update all users" ON users;
DROP POLICY IF EXISTS "Enable admin insert access" ON users;
DROP POLICY IF EXISTS "Enable admin read access" ON users;
DROP POLICY IF EXISTS "Enable admin update access" ON users;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON users;
DROP POLICY IF EXISTS "Enable read access for users on own data" ON users;
DROP POLICY IF EXISTS "Enable update for users on own data" ON users;

-- Re-enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create simple, working policies
-- 1. Users can read their own data
CREATE POLICY "users_select_own" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- 2. Users can insert their own data (for signup)
CREATE POLICY "users_insert_own" ON users
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

-- 3. Users can update their own data
CREATE POLICY "users_update_own" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 4. Admin policies (using a different approach to avoid recursion)
-- Create a function to check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users au
    JOIN users u ON au.id = u.id
    WHERE au.id = auth.uid()
    AND u.role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin can read all users
CREATE POLICY "admin_select_all" ON users
  FOR SELECT TO authenticated
  USING (is_admin());

-- Admin can insert users
CREATE POLICY "admin_insert_all" ON users
  FOR INSERT TO authenticated
  WITH CHECK (is_admin());

-- Admin can update all users
CREATE POLICY "admin_update_all" ON users
  FOR UPDATE TO authenticated
  USING (is_admin());

-- Update the trigger function to handle user creation properly
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert user with default values, ignore conflicts
  INSERT INTO public.users (
    id, 
    email, 
    role, 
    status, 
    created_at, 
    updated_at
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    'customer',
    'active',
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.users TO authenticated;
GRANT ALL ON public.orders TO authenticated;