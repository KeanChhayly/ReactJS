import React, { useReducer, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Todolist = () => {
  const [text, setText] = useState("");
  const [listItem, dispatch] = useReducer(reducefuntion, []);

  function reducefuntion(listItem, action) {
    switch (action.type) {
      case "delete": {
        return listItem.filter((items) => items.id !== action.id);
      }
      case "add": {
        return [...listItem, { text: action.text, id: Date.now() }];
      }
      case "changed": {
        return listItem.map((item) =>
          item.id === action.id ? { ...item, text: action.text } : item
        );
      }
      default:
        throw Error("Unknown action: " + action.type);
    }
  }

  return (
    <div className="main__container">
      <Input text={text} setText={setText} dispatch={dispatch} />
      <ItemBox listItem={listItem} dispatch={dispatch} />
    </div>
  );
};

function Input({ text, setText, dispatch }) {
  function handleChange(e) {
    e.preventDefault();
    setText(e.target.value);
  }

  function handleAddClick() {
    if (text.trim()) {
      dispatch({ type: "add", text });
      setText(""); // Clear the input after adding
    }
  }

  return (
    <>
      <h1 className="text-center py-4 fs-1 fw-bold text-light">Todolist</h1>

      <form className="container">
        <input
          className="inputBox"
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="input value"
          required
        />
        <input
          className="btn__add btn btn-danger"
          type="button"
          onClick={handleAddClick}
          value="Submit"
        />
      </form>
    </>
  );
}

function ItemBox({ listItem, dispatch }) {
  const [edit, setEdit] = useState(false);

  return (
    <div className="content__container">
      <ul className="content">
        {listItem.map((items) => (
          <li key={items.id} className="mt-5" style={{ display: "flex" }}>
            {edit ? (
              <div className="change_result">
                <input
                  value={items.text}
                  onChange={(e) =>
                    dispatch({
                      type: "changed",
                      id: items.id,
                      text: e.target.value,
                    })
                  }
                />
                <button
                  className="btn btn-danger ms-3"
                  onClick={() => setEdit(false)}
                >
                  save
                </button>
              </div>
            ) : (
              <>
                <div className="original_result">
                  <p>{items.text}</p>
                  <button
                    className="btn btn-danger ms-3"
                    onClick={() => setEdit(true)}
                  >
                    edit
                  </button>

                  <button
                    className="btn btn-warning ms-3"
                    onClick={() => dispatch({ type: "delete", id: items.id })}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todolist;
