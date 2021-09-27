import React, { useContext } from "react";
import NoteContext from "../contexts/NoteContext";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNoteProp } = props;
  return (
    <div className="col-md-3">
      <div className="card  my-1">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between  ">
            <h5 className="card-title">{note.title}</h5>
            <div className="d-flex flex-row">
              <i
                className="fas fa-trash-alt mx-2"
                onClick={() => {
                  deleteNote(note._id);
                }}
              ></i>
              <i
                className="far fa-edit "
                onClick={() => {
                  updateNoteProp(note);
                  // console.log(note);
                }}
              ></i>
            </div>
          </div>

          <p className="card-text">{note.description}</p>
          <p className="card-text">{note.tags}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
