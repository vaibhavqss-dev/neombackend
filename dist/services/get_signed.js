"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_1 = require("../config/supabase");
async function getSignedUrl() {
    const bucketName = "neom-images";
    const filePath = "folder/filename.png";
    const expiresIn = 60;
    const { data, error } = await supabase_1.supabase.storage
        .from(bucketName)
        .createSignedUrl(filePath, expiresIn);
    if (error) {
        console.error("Error generating signed URL:", error.message);
        return;
    }
    console.log("Signed URL:", data.signedUrl);
    return data.signedUrl;
}
getSignedUrl();
