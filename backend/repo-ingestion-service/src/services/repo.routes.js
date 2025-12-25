import { Router } from "express";
import { searchRepos } from "../services/repo.controller.js";

const router = Router();

router.get("/search", searchRepos);

export default router;