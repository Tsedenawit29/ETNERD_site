import { createClient } from '@supabase/supabase-js';

// Make sure to use the correct URL format
const supabaseUrl = 'https://vyatfkqmezubsgafsuak.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5YXRma3FtZXp1YnNnYWZzdWFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MDE4ODUsImV4cCI6MjA2NTI3Nzg4NX0._Lyc85xTgA8KQ9Yw9mO0nQctIEIe7pdSKFbMP7JHgn0';

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