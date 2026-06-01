import { useState } from "react";
import "./index.css";

const startingFriends = [
  {
    id:1,
    name:"Rabin",
    balance:10,
    image:"https://i.pravatar.cc/48?u=4476"
  },
  {
    id:2,
    name:"Rojan",
    balance:-30,
    image:'https://i.pravatar.cc/48?u=4994'
  }
]

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [friends, setFriends] = useState( startingFriends);
  const [curOpenBill, setCurOpenBill] = useState(null);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} setCurOpenBill={setCurOpenBill} curOpenBill={curOpenBill} setIsOpen={setIsOpen} />
        {isOpen && <AddFriendForm setFriends={setFriends} friends={friends} setIsOpen={setIsOpen} />}
        <Button handleClick={handleClick}>
          {" "}
          {isOpen ? "Close" : "Add friend "}{" "}
        </Button>
      </div>
      {curOpenBill !== null && (
        <SplitBillForm
          friend={curOpenBill}
          friends={friends}
          setFriends={setFriends}
          setCurOpenBill={setCurOpenBill}
        />
      )}
    </div>
  );
}

function FriendList({ friends, setCurOpenBill , curOpenBill , setIsOpen}) {
  // friends = startingFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          setCurOpenBill={setCurOpenBill}
          curOpenBill={curOpenBill}
          setIsOpen={setIsOpen}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, setCurOpenBill ,curOpenBill ,setIsOpen }) {


  function handleClick() {
  setCurOpenBill((current) =>
    current?.id === friend.id ? null : friend
  );
  setIsOpen(false)
}
  
  const isselected = friend.id === curOpenBill?.id;

  return (
    <li className={isselected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name}></img>

      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe me {Math.abs(friend.balance)}${" "}
        </p>
      )}
      {friend.balance < 0 && (
        <p className="red">
          I owe {friend.name} {Math.abs(friend.balance)}${" "}
        </p>
      )}
      {friend.balance === 0 && <p> We are equal. </p>}

      <Button handleClick={handleClick}>{ isselected ? "closed" : "select" }</Button>
    </li>
  );
}

function SplitBillForm({ friend, friends, setFriends , setCurOpenBill}) {
  const [bill, setBill] = useState("");
  const [expense, setExpense] = useState("");
  const [billMan, setBillMan] = useState("me");
  const billPaidByFriend = bill ? bill - expense : "";


  function handleSubmit(evt) {
    evt.preventDefault();

    if (!bill || !expense ) return ;

    const new_balance = billMan === "me" ? billPaidByFriend : (-expense);


    setFriends( friends.map((f) => f.id === friend.id ? {...f , balance:f.balance + new_balance} : {...f}))

    setCurOpenBill(null);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {friend.name} </h2>

      <label>🤑 Bill Value </label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>😊 Your expenses </label>
      <input
        type="number"
        value={expense}
        onChange={(e) => setExpense(Number(e.target.value) > bill ? expense : Number(e.target.value) )}
      />

      <label>👥 {friend.name} </label>
      <input type="number" disabled value={billPaidByFriend} />

      <label>🫣 Who is paying ? </label>
      <select value={billMan} onChange={(e) => setBillMan(e.target.value)}>
        <option value="me">me</option>
        <option value={friend.name}>{friend.name}</option>
      </select>

      <Button > Split Bill </Button>
    </form>
  );
}

function AddFriendForm({ setFriends, friends ,setIsOpen }) {
  const [friendName, setFriendName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=499476");

  function handleSubmit(evt) {

    if (!friendName || !image )return ;

    evt.preventDefault();
    
    const item = { id: Date.now(), name: friendName, image: image, balance: 0 };
    setFriends((friends) => [...friends, item]);

    setFriendName("");
    setIsOpen(false);
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👥 Friend Name </label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      ></input>

      <label>📷 Friend Image </label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>

      <Button > Add </Button>
    </form>
  );
}

function Button({ handleClick, children }) {
  return (
    <button className="button" onClick={handleClick}>
      {children}
    </button>
  );
}
