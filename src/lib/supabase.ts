import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database helper functions with better error handling
export const createUser = async (userData: any) => {
  try {
    console.log('Creating user with data:', userData);
    
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();
    
    if (error) {
      console.error('Supabase createUser error:', error);
      throw new Error(`Failed to create user: ${error.message}`);
    }
    
    console.log('User created successfully:', data);
    return data;
  } catch (error: any) {
    console.error('Error in createUser:', error);
    throw new Error(error.message || 'Failed to create user');
  }
};

export const updateUser = async (id: string, updates: any) => {
  try {
    console.log('Updating user:', id, 'with data:', updates);
    
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Supabase updateUser error:', error);
      throw new Error(`Failed to update user: ${error.message}`);
    }
    
    console.log('User updated successfully:', data);
    return data;
  } catch (error: any) {
    console.error('Error in updateUser:', error);
    throw new Error(error.message || 'Failed to update user');
  }
};

export const getUserById = async (id: string) => {
  try {
    console.log('Getting user by ID:', id);
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // User not found - this is expected for new users
        console.log('User not found in database:', id);
        return null;
      }
      console.error('Supabase getUserById error:', error);
      throw new Error(`Failed to get user: ${error.message}`);
    }
    
    console.log('User found:', data);
    return data;
  } catch (error: any) {
    console.error('Error in getUserById:', error);
    if (error.message.includes('Failed to get user')) {
      throw error;
    }
    throw new Error('Failed to get user');
  }
};

export const createOrder = async (orderData: any) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error in createOrder:', error);
    throw error;
  }
};

export const getOrdersByCustomer = async (customerId: string) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Error in getOrdersByCustomer:', error);
    throw error;
  }
};

export const getAllOrders = async () => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        customer:users!orders_customer_id_fkey(name),
        assigned_employee:users!orders_assigned_employee_id_fkey(name)
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Error in getAllOrders:', error);
    throw error;
  }
};

export const updateOrder = async (id: string, updates: any) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error in updateOrder:', error);
    throw error;
  }
};

export const getEmployees = async () => {
  try {
    const { data, error } = await supabase
      .from('employee_stats')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Error in getEmployees:', error);
    throw error;
  }
};

export const getOrdersByEmployee = async (employeeId: string) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('assigned_employee_id', employeeId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Error in getOrdersByEmployee:', error);
    throw error;
  }
};