import express from "express";
import axios from "axios";

const router = express.Router();
const server = "http://localhost:3000";

// Render home page with all posts
router.get("/", async (req, res) => {
    try {
        const data = (await axios.get(`${server}/api/scribbles`)).data;
        const filteredDocs = data.docs.map(doc => {
            const { password, ...filteredDoc } = doc;
            return filteredDoc;
        });
        res.render("scribbles", { docs: filteredDocs });
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
        const data = (await axios.get(`${server}/api/${req.params.username}/scribbles`)).data;
        const filteredDocs = data.docs.map(doc => {
            const { password, ...filteredDoc } = doc;
            return filteredDoc;
        });
        res.render("scribbles", { docs: filteredDocs });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to find scribbles"});
    }
});

// Render the specified scribble
router.get("/:username/:slug", async (req, res) => {
    try {
        const doc = (await axios.get(`${server}/api/${req.params.username}/${req.params.slug}`)).data;
        const { password, ...filteredDoc } = doc;
        res.render("scribble", filteredDoc);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to find scribble"});
    }
});

// Render the edit scribble page
router.get("/:username/:slug/scribble", async (req, res) => {
    try {
        const doc = (await axios.get(`${server}/api/${req.params.username}/${req.params.slug}`)).data;
        const { password, ...filteredDoc } = doc;
        res.render("scribble-edit", filteredDoc);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to find scribble"});
    }
});

export default router;