import { Router } from "express";
const router = Router();

import * as userCtrl from "../controllers/user.controller";
import { authJwt } from "../middlewares";

router.get(
    "/", 
    [authJwt.verifyToken, authJwt.isAdmin], 
    userCtrl.getUsers
);

router.get(
    "/autocomplete/:email",
    [authJwt.verifyToken, authJwt.isAdmin], 
    userCtrl.autocomplete
);

export default router;