export function List({ item, itemDelete, handleItemToggle }) {

  return (
    <li>
      <input type="checkbox" onChange={() => handleItemToggle(item.id)}></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.select} {item.description}
      </span>
      <button onClick={() => itemDelete(item.id)}>❌</button>
    </li>
  );
}
