"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_1 = require("../config/supabase");
async function checkSupabaseSetup() {
    console.log("Checking Supabase configuration...");
    try {
        const { data: buckets, error: bucketsError } = await supabase_1.supabase.storage.listBuckets();
        if (bucketsError) {
            console.error("❌ Error accessing Supabase storage:", bucketsError);
            return;
        }
        console.log("✅ Successfully connected to Supabase");
        console.log("Available buckets:", buckets.map((b) => b.name));
        const neomBucket = buckets.find((b) => b.name === "neom-images");
        if (!neomBucket) {
            console.error("❌ The 'neom-images' bucket does not exist. Please create it in your Supabase dashboard.");
        }
        else {
            console.log("✅ Found 'neom-images' bucket");
            const { data: files, error: filesError } = await supabase_1.supabase.storage
                .from("neom-images")
                .list();
            if (filesError) {
                console.error("❌ Could not list files in bucket:", filesError);
            }
            else {
                console.log(`✅ Bucket contains ${files.length} files/folders at root level`);
                console.log(files.map((f) => f.name));
            }
        }
    }
    catch (error) {
        console.error("❌ Unexpected error checking Supabase setup:", error);
    }
}
checkSupabaseSetup();
