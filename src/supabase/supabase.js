import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://clnqxoalxjzelrqryjrf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsbnF4b2FseGp6ZWxycXJ5anJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUzNzcxMjUsImV4cCI6MTk5MDk1MzEyNX0.1F4J5h206zpSXi3-hM2kCV2U9hFyVRMzG6z-y0LcZP0'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase