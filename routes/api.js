import express from "express";
import Datastore from "nedb";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = express.Router();

// Get all users
router.get("/users", (req, res) => {
    res.sendStatus(200);
});

// Get user by username
router.get("/:username", (req, res) => {
    res.sendStatus(200);
});

// Get all scribbles irrespective of the user
router.get("/scribbles", (req, res) => {
    res.sendStatus(200);
});

// Get scribbles by the specified user
router.get("/:username/scribbles", (req, res) => {
    res.sendStatus(200);
});

// Get the specified scribble by user and slug URL
router.get("/:username/:slug", (req, res) => {
    res.sendStatus(200);
})

// Create a new scribble
router.post("/scribble", (req, res) => {
    res.sendStatus(200);
});

// Update a scribble
router.put("/:username/:slug", (req, res) => {
    res.sendStatus(200);
});

// Delete a scribble
router.delete(":username/:slug", (req, res) => {
    res.sendStatus(200);
});

export default router;