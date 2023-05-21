import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";

export default function AddNote() {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const createNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form className="my-3">
          <div className="form-group my-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              placeholder="Pen Down Title"
              onChange={onChange}
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Pen Down Description"
              onChange={onChange}
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              className="form-control"
              id="tags"
              name="tags"
              placeholder="Note Tags"
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={createNote}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}
