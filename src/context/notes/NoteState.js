import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNote] = useState(notesInitial);

  //Get All Notes
  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1NjgwNjQ3NzBhOGQ4NTY0MjVhODViIn0sImlhdCI6MTY4MzQ1NTkzNn0.0hgdY7aI_tEeu0NtoXwG7TSdKLJG8BrB16z3Abfim1g`,
      },
    });
    const data = await response.json();
    setNote(data);
  };
  //Add a Note
  const addNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1NjgwNjQ3NzBhOGQ4NTY0MjVhODViIn0sImlhdCI6MTY4MzQ1NTkzNn0.0hgdY7aI_tEeu0NtoXwG7TSdKLJG8BrB16z3Abfim1g`,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const res = await response.json();
    console.log(res);
    console.log();
    const note = {
      id: 1,
      user: "64568064770a8d856425a85b",
      title,
      description,
      tag,
      date: "2023-05-17T19:13:17.647Z",
      __v: 0,
    };
    setNote(notes.concat(note));
  };
  //Delete a Note
  const deleteNote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1NjgwNjQ3NzBhOGQ4NTY0MjVhODViIn0sImlhdCI6MTY4MzQ1NTkzNn0.0hgdY7aI_tEeu0NtoXwG7TSdKLJG8BrB16z3Abfim1g`,
      },
    });
    const json = await response.json();
    console.log(json);
    setNote(notes.filter((note) => note._id !== id));
  };
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1NjgwNjQ3NzBhOGQ4NTY0MjVhODViIn0sImlhdCI6MTY4MzQ1NTkzNn0.0hgdY7aI_tEeu0NtoXwG7TSdKLJG8BrB16z3Abfim1g`,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const res = await response.json();
    console.log(res);

    for (let i = 0; i < notes.length; i++) {
      if (notes._id === id) {
        notes.title = title;
        notes.description = description;
        notes.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
