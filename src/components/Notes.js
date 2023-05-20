import React, { useContext, useEffect } from "react";
import noteContext from "./../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

export default function Notes() {
  const context = useContext(noteContext);
  const { notes, getAllNotes } = context;
  useEffect(() => {
    getAllNotes();
  }, []);
  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h2>Your Note</h2>
        {notes.map((note) => {
          return <NoteItem note={note} key={note.title} />;
        })}
      </div>
    </>
  );
}
