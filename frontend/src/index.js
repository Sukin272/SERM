import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* onclick send {"1": "2"} to backend(localhost:4000) */}
    <button
      onClick={() =>
        fetch("http://localhost:4000/testAPI/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 1: 2 }),
        })
      }
    >
      Send
    </button>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
