import React, { useState } from "react";
import './App.css';
import Stats from './Stats';
import ListView from "./ListView";
import ItemView from "./ItemView";

const itemList = [
  {
    name: "test",
    description: "testing",
    date: "2019-06-01",
    done: true
  },
  {
    name: "test2",
    description: "testing2",
    date: "2022-01-01",
    done: true
  }
]

function App() {
  const [todoItems, setTodoItems] = useState(itemList)
  const [currentPage, setPage] = useState("list")
  const [selectedItem, setItem] = useState({})

  function submitNew(item) {
    const date = (new Date()).toISOString().slice(0, 10)
    const newItem = { name: item.name, description: item.description || "Ei kuvausta", date: item.date || date, done: false }
    const newList = todoItems.concat(newItem)
    setTodoItems(newList)
    toList();
  }

  function editItem(name, newProps) {
    const copy = JSON.parse(JSON.stringify(todoItems));
    const item = copy.find((obj) => obj.name === name);
    if (newProps.description) {item.description = newProps.description}
    if (newProps.date) {item.date = newProps.date}
    setTodoItems(copy)
    setItem(item)
  }

  function markDone(name) {
    const copy = JSON.parse(JSON.stringify(todoItems));
    const item = copy.find((obj) => obj.name === name);
    item.done = !item.done;
    setTodoItems(copy)
  }

  function deleteItem(name) {
    const copy = JSON.parse(JSON.stringify(todoItems));
    setTodoItems(copy.filter(item => item.name !== name))
    toList()
  }

  function toList() {
    setPage("list")
  }

  function toStats() {
    setPage("stats")
  }

  function toItem(item) {
    setItem(item)
    setPage("item")
  }

  return (
    <div className="App">
      <h1>Tehtävälistasovellus</h1>
      <button onClick={toList}>
        Tehtävät
      </button>
      <button onClick={toStats}>
        Tilastoja
      </button>
      {currentPage === "list"
      ? <ListView items={todoItems} onSubmit={submitNew} onSelect={toItem} onCheck={markDone}/>
      : currentPage === "stats"
        ? <Stats items={todoItems}/>
        : <ItemView item={selectedItem} editItem={editItem} delete={deleteItem}/>
      }
    </div>
  );
}

export default App;
