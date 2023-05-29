const express = require("express");
const router = express.Router();
const fetchuser = require("./../middleware/getUser");
const { body, validationResult } = require("express-validator");
const Notes = require("./../models/Notes");

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.status(200).json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Error Occurred");
  }
});

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let status = false;
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status, errors: errors.array() });
      }

      const note = new Notes({ user: req.user.id, title, description, tag });
      const saveNote = await note.save();
      status = true;
      res.status(200).json({ status, saveNote });
    } catch (error) {
      res.status(500).json({ status, message: "Some Error Occurred" });
    }
  }
);

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  let status = false;
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ status, message: "Note Not Found" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ status, message: "Not Allowed" });
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    status = true;
    res.status(200).json({ status, note });
  } catch (error) {
    res.status(500).json({ status, message: "Some Error Occurred" });
  }
});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  let status = false;
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ status, message: "Note Not Found" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ status, message: "Not Allowed" });
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    status = true;
    res.status(200).json({ status, message: "Success:Note has been deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status, message: "Some Error Occurred" });
  }
});
module.exports = router;
