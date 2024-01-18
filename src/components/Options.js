import React from "react";

function Options({ question }) {
  return (
    <div className="options">
      {question.options.map((el, i) => {
        return (
          <button className="btn btn-option" key={i}>
            {el}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
