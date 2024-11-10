import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";

const AppTodo = () => {
  const [allItems, setAllItems] = useState([]); // Correct usage of useState
  const [inputText, setInputText] = useState("");

  function handleAdd() {
    setAllItems((ci) => [...ci, { text: inputText, ID: Date.now() }]);
    setInputText("");
  }

  function handleDelete(id) {
    setAllItems((curItem) => curItem.filter((e) => e.ID !== id));
  }

  return (
    <>
      <Parent>
        <Header
          inputText={inputText}
          setInputText={setInputText}
          handleAdd={handleAdd}
        />
        <TodoList
          allItems={allItems}
          handleDelete={handleDelete}
          setAllItems={setAllItems}
        />
      </Parent>
    </>
  );
};

function Parent({ children }) {
  return <div className="todoContainer">{children}</div>;
}

function Header({ inputText, setInputText, handleAdd }) {
  return (
    <div className="inputContainer">
      <h1 className="title">Input anything you want🤞</h1>
      <div className="container__input">
        <input
          className="input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <input
          type="button"
          className="btn btn-danger"
          value="Add"
          onClick={handleAdd}
        />
      </div>
    </div>
  );
}

function TodoList({ allItems, handleDelete, setAllItems }) {
  return (
    <div className="todolist__container">
      <ul className="content">
        {allItems.map((curItem) => (
          <List
            key={curItem.ID}
            curItem={curItem}
            setAllItems={setAllItems}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

function List({ curItem, handleDelete, setAllItems }) {
  const [isCheck, setIsCheck] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(curItem.text); // Temporary state for editing text

  function handCheck() {
    setIsCheck((ch) => !ch);
  }

  function handleEdit() {
    setEdit(true);
  }

  function handleSave() {
    setAllItems((prevItems) =>
      prevItems.map((item) =>
        item.ID === curItem.ID ? { ...item, text: editText } : item
      )
    );
    setEdit(false);
  }

  return (
    <li className="content__list">
      {edit ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <p style={{ textDecoration: isCheck ? "line-through" : "" }}>
          {curItem.text}
        </p>
      )}

      <div className="list__btn--container">
        {edit ? null : (
          <button className="list__button" onClick={handCheck}>
            {isCheck ? "❌" : "✔"}
          </button>
        )}

        {edit ? null : (
          <button
            className="list__button"
            style={{ background: "gray", color: "#fff" }}
            onClick={handleEdit}
          >
            🖊
          </button>
        )}

        {edit ? null : (
          <button
            style={{ background: "red", color: "#fff", marginLeft: "1rem" }}
            className="list__button"
            onClick={() => handleDelete(curItem.ID)}
          >
            🗑
          </button>
        )}

        {edit ? (
          <button className="btn btn-warning btn__save" onClick={handleSave}>
            save
          </button>
        ) : null}
      </div>
    </li>
  );
}

export default AppTodo;
