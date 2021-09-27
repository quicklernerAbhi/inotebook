import React, { useState } from "react";
import NoteContext from "./NoteContext";
import Alert from "../componants/Alert";
const host = "http://localhost:5000";
const NoteState = (props) => {
  let initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  // fetch all notes
  const fetchAllNotes = async () => {
    // api call
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNzE0ZDJhNWE1ZTU2YTg3NTQ5OThjIn0sImlhdCI6MTYzMDk5OTgyNn0.lUcOrphq50Om2Z2hrZoOiVl2YGKmLPQr15SKTMYCe9w",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // function for adding new note
  // api for adding new note
  const addNote = async (title, description, tags) => {
    // api call for adding a note
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNzE0ZDJhNWE1ZTU2YTg3NTQ5OThjIn0sImlhdCI6MTYzMDk5OTgyNn0.lUcOrphq50Om2Z2hrZoOiVl2YGKmLPQr15SKTMYCe9w",
      },
      body: JSON.stringify({ title, description, tags }),
    });
    const note = await response.json();

    setNotes(notes.concat(note));
    // fetchAllNotes();
  };

  // function for updating new note

  const updateNote = (id, title, description, tags) => {
    // api call for updating a note
    const url = `${host}/api/notes/updatenote/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNzE0ZDJhNWE1ZTU2YTg3NTQ5OThjIn0sImlhdCI6MTYzMDk5OTgyNn0.lUcOrphq50Om2Z2hrZoOiVl2YGKmLPQr15SKTMYCe9w",
      },
      body: JSON.stringify({ title, description, tags }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log(id, title, description, tags);
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tags = tags;
        break;
      }
    }
    setNotes(newNotes);
    // fetchAllNotes();
  };

  // function for deleting new note
  // const deleteNote = async (id) => {
  //   // api call
  //   const url = `${host}/api/notes/deletenote/${id}`;
  //   const response = await fetch(url, {
  //     method: "DELETE",

  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token":
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNzE0ZDJhNWE1ZTU2YTg3NTQ5OThjIn0sImlhdCI6MTYzMDk5OTgyNn0.lUcOrphq50Om2Z2hrZoOiVl2YGKmLPQr15SKTMYCe9w",
  //     },
  //   });
  //   const json = await response.json();
  //   console.log(json);

  //   console.log(id);
  //   const newNotes = notes.filter((note) => {
  //     return note._id !== id;
  //   });
  //   setNotes(newNotes);
  // };
  // Delete a Note
  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deletenote/${id}`;
    // API Call
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNzE0ZDJhNWE1ZTU2YTg3NTQ5OThjIn0sImlhdCI6MTYzMDk5OTgyNn0.lUcOrphq50Om2Z2hrZoOiVl2YGKmLPQr15SKTMYCe9w",
      },
    });
    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    fetchAllNotes();
  };
  const showAlert = (type, message) => {};

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        updateNote,
        deleteNote,
        fetchAllNotes,
        showAlert,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
