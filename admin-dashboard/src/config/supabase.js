import { createClient } from '@supabase/supabase-js';

// Make sure to use the correct URL format
const supabaseUrl = 'https://lyuqbekqidamzuvgtinu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5dXFiZWtxaWRhbXp1dmd0aW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzODQxMjMsImV4cCI6MjA2Njk2MDEyM30.MUDIyj5tJbzYbqw9-bmo22RvmrOfHLWAG40B0jdUADk';

// Create Supabase client with additional options
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-application-name': 'admin-dashboard'
    }
  }
});

// Test the connection
const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('our_work').select('count').limit(1);
    if (error) {
      console.error('Supabase connection test failed:', error);
    } else {
      console.log('Supabase connection successful');
    }
  } catch (error) {
    console.error('Supabase connection test error:', error);
  }
};

// Run the test
testConnection();

export default supabase; 