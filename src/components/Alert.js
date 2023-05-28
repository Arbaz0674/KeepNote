import React from "react";

export default function Alert(props) {
  const requestStatus = (word) => {
    let status = word === "true" ? "Success" : "Fail";
    console.log(props.alert.message);
    return status;
  };

  return (
    <div style={{ height: "50px" }}>
      {props.alert && (
        <div
          className={`alert alert-${
            props.alert.type === "true" ? "success" : "danger"
          }`}
          role="alert"
        >
          <strong>{requestStatus(props.alert.type)}</strong>:
          {props.alert.message}
        </div>
      )}
    </div>
  );
}
