import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import logger from "morgan";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./src/api/swagger.json" assert { type: "json" };

import authRoute from "./src/routes/auth.route.mjs";
import accountRoute from "./src/routes/account.route.mjs";

import "./src/utils/environment.mjs";

const PORT = process.env.PORT;
const dbURI = process.env.DB_URI;
const dbName = process.env.DB_NAME;

const swaggerUiOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'API Documentation',
    // customfavIcon: '/path/to/favicon.png',
};

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerUiOptions));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/account", accountRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).json({
        message: "No such route exists"
    });
});

// Internal server error handler
app.use(async function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).json({
        message: "Internal server error"
    })
});

app.listen(PORT, () => {
    console.clear()
    console.log(`Server is running on port: ${PORT}`);
});

// MongoDB connection
mongoose.connect(dbURI + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

export const db = mongoose.connection