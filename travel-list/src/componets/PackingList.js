import { useState } from "react";
import { List } from "./List.js";

export function PackingList({ item, itemDelete, handleItemToggle, handleClear }) {
  const [sort, setSort] = useState('input');

  let sortedItems;
  if (sort === 'input')
    sortedItems = item;

  if (sort === 'description')
    sortedItems = item.slice().sort((a, b) => a.description.localeCompare(b.description));

  if (sort === 'packed')
    sortedItems = item.slice().sort((a, b) => Number(a.packed) - Number(b.packed));



  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <List item={item} key={item.id} itemDelete={itemDelete} handleItemToggle={handleItemToggle} />
        ))}
      </ul>

      <div className="actions">
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value='input'>Sort by input values  </option>
          <option value='description'>Sort by description </option>
          <option value='packed'>Sort by packed  </option>
        </select>
        <button onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
}
