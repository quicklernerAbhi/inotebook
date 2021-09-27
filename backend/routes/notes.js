const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
// we need middleware to fetch id of user
const fetchuser = require("../middleware/fetchuser");
// 1st route for getting all notes of user

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error ocurred");
  }
});
// 2nd route for adding notes login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "please enter title").isLength({ min: 2 }),
    body("description", "please enter description").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tags } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tags,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error ocurred");
    }
  }
);
// 3rd route for updating notes login required
router.put(
  "/updatenote/:id",
  fetchuser,

  async (req, res) => {
    const { title, description, tags } = req.body;
    try {
      const updatedNote = {};
      if (title) {
        updatedNote.title = title;
      }
      if (description) {
        updatedNote.description = description;
      }
      if (tags) {
        updatedNote.tags = tags;
      }
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }
      // console.log(note);
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: updatedNote },
        { new: true }
      );
      res.json({ note });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error ocurred");
    }
  }
);
// 4th route for deleting notes login required
router.delete(
  "/deletenote/:id",
  fetchuser,

  async (req, res) => {
    try {
      // fininding note for deletion
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }
      // console.log(note);
      //  is user is a owner of note only then allowed to delete
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
      note = await Note.findByIdAndDelete(req.params.id);
      res.json({ successs: "note is successfuly deleted", note: note });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error ocurred");
    }
  }
);
module.exports = router;
