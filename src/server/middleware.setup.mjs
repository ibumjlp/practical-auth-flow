import cors from "cors";
import express from "express";
import logger from "morgan";

const setupMiddleware = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(logger('dev'));
};

export default setupMiddleware;