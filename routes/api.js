import express from "express";
import Datastore from "nedb";
import slugify from "slugify";
import { promisify } from "util";
import path from "path";
import { fileURLToPath } from "url";
import { error } from "console";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __parentDirName = path.dirname(__dirname);

// Initialize the NeDB datastores
let db = new Datastore({ filename: path.join(__parentDirName, "data", "scribbles.db"), autoload: true });
db.ensureIndex({fieldName: "slug"}, function (err) {
    if (err) console.log(err);
});

// Promisify NeDB methods
db.insertAsync = promisify(db.insert);
db.findAsync = promisify(db.find);
db.findOneAsync = promisify(db.findOne);
db.updateAsync = promisify(db.update);
db.removeAsync = promisify(db.remove);

const router = express.Router();

// Get all scribbles irrespective of the user
router.get("/scribbles", async (req, res) => {
    try {
        const docs = await db.findAsync({});
        console.log("Scribbles found:", docs);
        res.status(200).json({ docs: docs });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to find scribble"});
    }
});

// Get scribbles by the specified user
router.get("/:username/scribbles", async (req, res) => {
    try {
        const docs = await db.findAsync({ username: req.params.username });
        console.log("Scribbles found:", docs);
        res.status(200).json({ docs: docs });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to find scribble"});
    }
});

// Get the specified scribble by user and slug URL
router.get("/:username/:slug", async (req, res) => {
    try {
        const doc = await db.findOneAsync({ username: req.params.username, slug: req.params.slug });
        console.log("Scribble found:", doc);
        res.status(200).json(doc);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to find scribble"});
    }
})

// Create a new scribble
router.post("/scribble", async (req, res) => {
    try {
        const body = req.body;
        // create a new entry in scribbles with title, slug, gist, scribble, username, password, createdAt, updatedAt
        const at = new Date();
        const slug = slugify(body.title.toLowerCase());
        const scribble = {
            title: body.title,
            slug: slug,
            gist: body.gist,
            scribble: body.scribble,
            username: body.username,
            password: body.password,
            createdAt: at,
            updatedAt: at
        };
        const doc = await db.insertAsync(scribble);
        console.log("Scribble inserted:", doc);

        // send a created status code, with a redirect Url in the header
        const scribbleUri = `/${body.username}/${slug}`;
        res.set('Location', scribbleUri);
        res.status(201).json({ message: "Scribble created", redirectUrl: scribbleUri});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to create scribble"});
    }
});

// Update a scribble
router.put("/:username/:slug", async (req, res) => {
    try {
        const body = req.body;
        const at = new Date();
        const slug = slugify(body.title.toLowerCase());
        const scribble = {
            title: body.title,
            slug: slug,
            gist: body.gist,
            scribble: body.scribble,
            updatedAt: at
        };
        const numReplaced = await db.updateAsync({ username: req.params.username, slug: req.params.slug, password: body.password }, { $set: scribble}, {});
        if (numReplaced === 0) {
            throw error("Failed to find scribble to update");
        }
        // send a updated status code, with a redirect Url in the header
        const scribbleUri = `/${req.params.username}/${slug}`;
        res.set('Location', scribbleUri);
        res.status(200).json({ message: "Scribble updated", redirectUrl: scribbleUri });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to update scribble"});
    }
});

// Delete a scribble
router.delete("/:username/:slug", async (req, res) => {
    try {
        const additionalInfo = JSON.parse(req.headers['x-additional-info']);
        const numRemoved = await db.removeAsync({ username: req.params.username, slug: req.params.slug, password: additionalInfo.password }, {});
        if (numRemoved === 0) {
            throw error("Failed to find scribble to delete");
        }
        const userUri = `/${req.params.username}`;
        res.set('Location', userUri);
        res.status(200).json({ message: "Scribble deleted", redirectUrl: userUri });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to delete scribble"});
    }
});

export default router;