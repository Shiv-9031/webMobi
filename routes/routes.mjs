import express from "express";

import { login, registration, profile } from "../controllers/users.mjs";

import auth from "../config/auth.mjs";

const routes = express.Router();

//users routes
routes.route("/user/registration").post(registration); //for registration
routes.route("/user/login").post(login); //for login
routes.route("/user/profile").get(auth, profile);

export default routes;
