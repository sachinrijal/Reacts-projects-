import { useState } from "react";

export function Form({ onSubmitForm }) {
  const [description, setDescription] = useState("");
  const [select, setSelect] = useState(1);



  function handleSubmit(evt) {
    evt.preventDefault();
    if (!description) return;

    const newItem = { id: Date.now(), description, select, packed: false };

    onSubmitForm(newItem);

    setSelect(1);
    setDescription('');

  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for a Trip ? </h3>
      <select value={select} onChange={(e) => setSelect(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add </button>
    </form>
  );
}
