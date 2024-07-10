import express from "express";
import axios from "axios";

const router = express.Router();
const server = "http://localhost:3000";

// Render home page with all posts
router.get("/", async (req, res) => {
    try {
        const docs = (await axios.get(`${server}/api/scribbles`)).data;
        res.render("scribbles", docs);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to find scribbles"});
    }
});

// Render the create new scribble page 
router.get("/scribble", (req, res) => {
    res.render("scribble-create");
});

// Render user page with all posts by user
router.get("/:username", async (req, res) => {
    try {
        const docs = (await axios.get(`${server}/api/${req.params.username}/scribbles`)).data;
        res.render("scribbles", docs);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to find scribbles"});
    }
});

// Render the specified scribble
router.get("/:username/:slug", async (req, res) => {
    try {
        const doc = (await axios.get(`${server}/api/${req.params.username}/${req.params.slug}`)).data;
        res.render("scribble", {
            title: doc.title,
            gist: doc.gist,
            username: doc.username,
            createdAt: doc.createdAt,
            scribble: doc.scribble
        });
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