import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

export default function NoteItem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note } = props;
  const delNote = () => {
    deleteNote(note._id);
  };
  return (
    <div className="col-md-3 mx-2">
      <div className="card my-3" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fa-solid fa-pen-to-square mx-2"
            style={{ color: "#13c6c9" }}
          ></i>
          <i
            className="fa-solid fa-trash mx-2"
            style={{ color: "#1f5151" }}
            onClick={delNote}
          ></i>
        </div>
      </div>
    </div>
  );
}
