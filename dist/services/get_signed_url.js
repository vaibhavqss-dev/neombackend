"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignedUrl = void 0;
const supabase_1 = require("../config/supabase");
const getSignedUrl = async (userId, filename) => {
    try {
        const bucketName = "neom-images";
        const timestamp = Date.now();
        const uniqueFilename = `${timestamp}_${filename}`;
        const filePath = `profiles/${userId}/${uniqueFilename}`;
        const { data: buckets, error: bucketsError } = await supabase_1.supabase.storage.listBuckets();
        if (bucketsError) {
            console.error("Error listing buckets:", bucketsError);
            return null;
        }
        console.log("Available buckets:", buckets.map((b) => b.name));
        if (!buckets.some((b) => b.name === bucketName)) {
            console.error(`Bucket '${bucketName}' does not exist`);
            return null;
        }
        const { data, error } = await supabase_1.supabase.storage
            .from(bucketName)
            .createSignedUploadUrl(filePath);
        if (error) {
            console.error("Error generating signed upload URL:", error);
            return null;
        }
        console.log("Signed upload URL generated successfully");
        return {
            signedUrl: data.signedUrl,
            path: filePath,
            fullPath: `${bucketName}/${filePath}`,
        };
    }
    catch (err) {
        console.error("Unexpected error in getSignedUrl:", err);
        return null;
    }
};
exports.getSignedUrl = getSignedUrl;
