import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

export default function About() {
  const context = useContext(noteContext);
  return (
    <div>
      <h1>This is About {context.name}</h1>
    </div>
  );
}
