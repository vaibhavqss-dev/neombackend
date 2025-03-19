import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://oplsgvveavucoyuifbte.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wbHNndnZlYXZ1Y295dWlmYnRlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjM3Mzc3NSwiZXhwIjoyMDU3OTQ5Nzc1fQ.jptuZYt_xrlCnGPEpmRsCn-ZdLaHEI24d_oKghwtMuQ";
export const supabase = createClient(supabaseUrl, supabaseKey);

