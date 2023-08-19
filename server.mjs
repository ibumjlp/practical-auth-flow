import express from "express";
import "./src/utils/environment.mjs";
import "./src/utils/db.connect.mjs";
import serverConfig from "./src/configs/server.config.mjs";
import setupSwaggerUI from "./src/server/swagger.setup.mjs";
import setupMiddleware from "./src/server/middleware.setup.mjs";
import authRoute from "./src/routes/auth.route.mjs";
import accountRoute from "./src/routes/account.route.mjs";
import { notFoundHandler, errorHandler } from "./src/server/server.handlers.mjs";

const app = express();

setupMiddleware(app);
setupSwaggerUI(app);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/account", accountRoute);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(serverConfig.PORT, () => {
    console.clear()
    console.log(`Server is running on port: ${serverConfig.PORT}`);
});