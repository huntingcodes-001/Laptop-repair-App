export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  pincode?: string;
  role: 'customer' | 'admin' | 'employee';
  age?: number;
  status?: 'active' | 'inactive';
  created_at?: string;
  updated_at?: string;
}

export interface Order {
  id: string;
  customer_id: string;
  customer_name?: string;
  device_type: string;
  device_model: string;
  model_number: string;
  problem: string;
  expected_timeline: string;
  quotation?: number;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'rejected';
  assigned_employee_id?: string;
  assigned_employee_name?: string;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  age?: number;
  address?: string;
  city?: string;
  pincode?: string;
  status: 'active' | 'inactive';
  total_assigned: number;
  completed_orders: number;
  in_progress_orders: number;
  created_at: string;
  updated_at: string;
}

export interface AuthUser {
  id: string;
  email: string;
  user_metadata: {
    name?: string;
    avatar_url?: string;
  };
}