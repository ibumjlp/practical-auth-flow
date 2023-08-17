import crypto from "crypto";

const bitLength = 256;
const secretKey = crypto.randomBytes(bitLength).toString('hex');

console.log("secret:", secretKey);