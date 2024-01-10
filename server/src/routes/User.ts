import { RegisterUser } from "../controllers/User";
import express from "express";

const router = express.Router();

router.post("/sign-up", RegisterUser);
// router.post("/sign-in", CreateTodo);


module.exports = router;