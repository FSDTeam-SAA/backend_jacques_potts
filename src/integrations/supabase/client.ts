import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uvsxosexezyafgfimklv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2c3hvc2V4ZXp5YWZnZmlta2x2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0NjAzMjMsImV4cCI6MjA0OTAzNjMyM30.gYaVNAMVc1hrZovdMEa8Xc9gIPZhb0QPUuRtoKCTIFk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    debug: true 
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  }
});