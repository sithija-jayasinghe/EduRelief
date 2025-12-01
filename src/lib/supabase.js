import { createClient } from '@supabase/supabase-js';

// Hardcoded for now - move back to env vars later
const supabaseUrl = 'https://fscfwudsjefhvtqejkvd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzY2Z3dWRzamVmaHZ0cWVqa3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MTc1MjUsImV4cCI6MjA4MDA5MzUyNX0.H1gIlT5j8z2rvRbVaeJzS_8K81E_oaF4WbXC52vECxI';

export const supabase = createClient(supabaseUrl, supabaseKey);
