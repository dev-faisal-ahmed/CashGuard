import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const port = process.env.PORT || 5000;
export const mongoUri = process.env.MONGO_URI;
export const environment = process.env.NODE_ENV;
export const salt = Number(process.env.BCRYPT_SALT_ROUND);
export const jwtSecret = process.env.JWT_SECRET;
