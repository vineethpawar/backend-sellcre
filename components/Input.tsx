import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import deleteIcon from "./delete.svg";

const HOST_URL = "http://localhost:3001";

const Input: React.FC<any> = ({ highlight, highlights, setHighlights }) => {
  const [text, setText] = useState(highlight?.highlight || "");

  const updateHighlight = (e: any) => {
    setText(e?.target?.value);
    axios
      .put(`${HOST_URL}/api/highlights/${highlight.id}`, {
        highlight: e?.target?.value,
      })
      ?.catch((err) => console.log(err));
  };
  const deleteHighlight = (id: any) => {
    axios
      .delete(`${HOST_URL}/api/highlights/${highlight.id}`)
      ?.then((res) => {
        console.log(res);
        setHighlights(
          highlights?.filter((highlight: any) => highlight.id != id)
        );
      })
      ?.catch((err) => console.log(err));
  };

  return (
    <div style={{ display: "flex", width: "80%", marginBottom: "10px" }}>
      <input
        style={{
          background: "white",
          color: "black",
          width: "100%",
          padding: "5px",
          borderRadius: "5px",
          outline: 0,
          border: "1px solid lightgray",
        }}
        value={text}
        onChange={(e) => updateHighlight(e)}
      />
      <Image
        onClick={() => deleteHighlight(highlight?.id)}
        src={deleteIcon}
        alt="delete"
      />
    </div>
  );
};

export default Input;
