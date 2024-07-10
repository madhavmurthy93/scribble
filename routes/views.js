import express from "express";
import axios from "axios";

const router = express.Router();
const server = "http://localhost:3000";

// Render home page with all posts
router.get("/", (req, res) => {
    res.render("home");
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
router.get("/:username/:slug", async (req, res) => {
    try {
        const doc = await axios.get(`${server}/api/${req.params.username}/${req.params.slug}`);
        res.status(200).json(doc.data);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to find scribble"});
    }
});

// Render the edit scribble page
router.get("/:username/:slug/scribble", (req, res) => {
    res.sendStatus(200);
});

export default router;