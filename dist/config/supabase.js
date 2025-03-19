"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = "https://oplsgvveavucoyuifbte.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wbHNndnZlYXZ1Y295dWlmYnRlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjM3Mzc3NSwiZXhwIjoyMDU3OTQ5Nzc1fQ.jptuZYt_xrlCnGPEpmRsCn-ZdLaHEI24d_oKghwtMuQ";
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
