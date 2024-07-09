import express from "express";

const router = express.Router();

// Render home page with all posts
router.get("/", (req, res) => {
    res.sendStatus(200);
});

// Render user page with all posts by user
router.get("/:username", (req, res) => {
    res.sendStatus(200);
});

// Render the create new scribble page 
router.get("/scribble", (req, res) => {
    res.sendStatus(200);
});

// Render the specified scribble
router.get("/:username/:slug", (req, res) => {
    res.sendStatus(200);
});

// Render the edit scribble page
router.get("/:username/:slug/scribble", (req, res) => {
    res.sendStatus(200);
});

export default router;