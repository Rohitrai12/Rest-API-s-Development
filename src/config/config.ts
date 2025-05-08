import {config as conf} from 'dotenv'

conf()
const _config = {
    port: process.env.PORT || 3000,
    mongo_uri: process.env.MONGO_URI,
    env:process.env.Node_env,
    JWT_SECRET:process.env.JWT_SECRET,
    cloudinaryCloud:process.env.djo9a9i3i,
    cloudinaryApiKey:process.env.CLOUDINARY_API_KEY,
    cloudinarySecret:process.env.CLOUDINARY_API_SECRET
}

export const config = Object.freeze(_config);