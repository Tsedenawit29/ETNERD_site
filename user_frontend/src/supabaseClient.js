import { createClient } from '@supabase/supabase-js';

// Make sure to use the correct URL format
const supabaseUrl = 'https://lyuqbekqidamzuvgtinu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5dXFiZWtxaWRhbXp1dmd0aW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzODQxMjMsImV4cCI6MjA2Njk2MDEyM30.MUDIyj5tJbzYbqw9-bmo22RvmrOfHLWAG40B0jdUADk';

export const supabase = createClient(supabaseUrl, supabaseKey); 