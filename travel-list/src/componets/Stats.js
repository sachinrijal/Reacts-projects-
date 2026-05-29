export function Stats({ item }) {

  if (!item.length)
    return <footer className="stats">Start adding items </footer>;


  const itemLength = item.length;
  const itemPackedLength = item.filter((i) => i.packed === true).length;
  const percentage = Math.floor((itemPackedLength * 100) / itemLength);

  return (
    <footer className="stats">
      {percentage === 100 ? <em>You have packed all the items </em> :
        <em>You have {itemLength} items in your list and you have {percentage}% completed.</em>}
    </footer>
  );
}
