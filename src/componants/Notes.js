import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../contexts/NoteContext";
import NoteItem from "./NoteItem";
const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, fetchAllNotes, updateNote } = context;
  useEffect(() => {
    fetchAllNotes();
    // eslint-disable-next-line
  }, []);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etags: "",
  });

  const ref = useRef(null);

  const refclose = useRef(null);
  const updateNoteProp = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etags: currentNote.tags,
    });
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    refclose.current.click();
    updateNote(note.id, note.etitle, note.edescription, note.etags);

    // console.log(note);
  };
  return (
    <div className="row my-3">
      <h1>Your Notes </h1>
      {/* <!-- Button trigger modal --> */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update here..
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* form for update data  */}
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="upto 20 characters"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
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
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
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
                    id="etags"
                    name="etags"
                    value={note.etags}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 ||
                  note.edescription.length < 5 ||
                  note.etags.length < 5
                }
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      {notes.map((note) => {
        return (
          <NoteItem
            key={note._id}
            note={note}
            updateNoteProp={updateNoteProp}
          />
        );
      })}
    </div>
  );
};

export default Notes;
