import mongoose from "mongoose";
import serverConfig from "../configs/server.config.mjs";

mongoose.connect(serverConfig.dbURI + serverConfig.dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

export const db = mongoose.connection