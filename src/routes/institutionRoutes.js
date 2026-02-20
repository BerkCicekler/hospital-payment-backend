import express from "express";
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  getNearbyInstitutions,
  searchInstitutions,
} from "../controllers/institutionController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/nearby", getNearbyInstitutions);
router.get("/search", searchInstitutions);

export default router;