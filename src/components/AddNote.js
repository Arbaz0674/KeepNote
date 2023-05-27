import "./../css/Style.css";
import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";

export default function AddNote() {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const createNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-3 text-center">
        <h1 className="title">Add a Note</h1>
        <form className="my-3">
          <div className="form-group my-2">
            <label htmlFor="title" className="item-label my-2">
              Title
            </label>
            <input
              type="text"
              className="form-control my-2"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              placeholder="Pen Down Title"
              value={note.title}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="description" className="item-label my-2">
              Description
            </label>
            <input
              type="text"
              className="form-control my-2"
              id="description"
              name="description"
              placeholder="Pen Down Description"
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="tags" className="item-label">
              Tags
            </label>
            <input
              type="text"
              className="form-control my-2"
              id="tags"
              name="tags"
              placeholder="Note Tags"
              value={note.tag}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn btn-primary my-2"
            onClick={createNote}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}
