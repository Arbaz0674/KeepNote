import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "64652734e51ed606d44051d7",
      user: "64568064770a8d856425a85b",
      title: "My Title",
      description: "My Description",
      tag: "My Tags",
      date: "2023-05-17T19:12:52.781Z",
      __v: 0,
    },
    {
      _id: "6465274de51ed606d44051d9",
      user: "64568064770a8d856425a85b",
      title: "My Title1",
      description: "My Description1",
      tag: "My Tags1",
      date: "2023-05-17T19:13:17.647Z",
      __v: 0,
    },
  ];
  const [notes, setNote] = useState(notesInitial);

  return (
    <NoteContext.Provider value={{ notes, setNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
