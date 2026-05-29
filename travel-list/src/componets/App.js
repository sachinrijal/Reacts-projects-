import { useState } from "react";
import { Logo } from "./Logo";
import { Form } from "./Form";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
// ];

export default function App() {
  const [item , setItem] = useState([])

  function handleFormSubmit(item){
    return setItem((items) => [...items , item])
  }

  function itemDelete(id){
    return setItem((item).filter((items) => items.id !== id  ) )
  }

  function packedOrunpacked(id){
    return setItem((item).map((items) => items.id === id ? {...items , packed: !items.packed} : {...items} ))
  }

  function handleClear(){
    const confirmed = window.confirm("Are you sure you want to do this ? ");
    if (confirmed) return setItem([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onSubmitForm={handleFormSubmit} />
      <PackingList item={item} itemDelete={itemDelete} handleItemToggle={packedOrunpacked} handleClear={handleClear} />
      <Stats item={item} />
    </div>
  );
}


