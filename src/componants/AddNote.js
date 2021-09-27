import React, { useContext, useState } from "react";
import NoteContext from "../contexts/NoteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tags: "",
  });
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    context.addNote(note.title, note.description, note.tags);
    setNote({
      title: "",
      description: "",
      tags: "",
    });
    console.log("new note adeed");
  };
  return (
    <div className="container my-3">
      <h1>Add a Note ✍ </h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            placeholder="upto 20 characters"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            aria-describedby="emailHelp"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Tags
          </label>
          <input
            type="text"
            className="form-control"
            id="tags"
            name="tags"
            value={note.tags}
            onChange={handleChange}
          />
        </div>

        <button
          disabled={
            note.title.length < 5 ||
            note.description.length < 5 ||
            note.tags.length < 5
          }
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Note ➕
        </button>
      </form>
    </div>
  );
};

export default AddNote;
