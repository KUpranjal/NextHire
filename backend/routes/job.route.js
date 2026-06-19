import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";

import {
    getAdminJobs,
    getAllJobs,
    getJobById,
    postJob
} from "../controllers/job.controller.js";

const router = express.Router();

// post job
router.route("/post").post(
    isAuthenticated,
    postJob
);

// get all jobs
router.route("/get").get(
    isAuthenticated,
    getAllJobs
);

// get admin jobs
router.route("/getadminjob").get(
    isAuthenticated,
    getAdminJobs
);

// get job by id
router.route("/get/:id").get(
    isAuthenticated,
    getJobById
);

export default router;