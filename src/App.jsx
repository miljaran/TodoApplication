import React, { useState } from "react";
import './App.css';
import './normalize.css'
import Stats from './Stats';
import ListView from "./ItemList/ListView";
import ItemView from "./ItemView";

// Esimerkkisisältö
const dummyItems = [
  {
    name: "Projekti",
    description: "VPJ-kurssin loppuprojekti",
    date: "2022-05-18",
    done: true
  },
  {
    name: "Viikkotehtävät",
    description: "Ohjelmointikurssin viikkotehtävät",
    date: "2022-05-05",
    done: false
  },
  {
    name: "Essee",
    description: "HCI-kurssin essee",
    date: "2022-05-23",
    done: false
  },
  {
    name: "Tenttiin lukeminen",
    description: "Lue matikan tenttiin",
    date: "2022-06-12",
    done: false
  }
]

function App() {
  const [todoItems, setTodoItems] = useState(dummyItems)
  const [currentPage, setPage] = useState("list")
  const [currentItem, setItem] = useState({})

  // Funktiot tehtävien lisäämiseen ja muokkaamiseen
  function addItem(item) {
    const today = (new Date()).toISOString().slice(0, 10);
    const newItem = { name: item.name, description: item.description || "Ei kuvausta", date: item.date || today, done: false }
    const newList = todoItems.concat(newItem);
    setTodoItems(newList);
  }

  function editItem(name, newProps) {
    const copy = JSON.parse(JSON.stringify(todoItems));
    const item = copy.find((obj) => obj.name === name);
    if (newProps.description) {item.description = newProps.description}
    if (newProps.date) {item.date = newProps.date}
    setTodoItems(copy)
    setItem(item)
  }

  function deleteItem(name) {
    const copy = JSON.parse(JSON.stringify(todoItems));
    setTodoItems(copy.filter(item => item.name !== name))
    toList()
  }

  function itemDone(name) {
    const copy = JSON.parse(JSON.stringify(todoItems));
    const item = copy.find((obj) => obj.name === name);
    item.done = !item.done;
    setTodoItems(copy)
  }

  // Funktiot "sivunvaihtoon"
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
      <header>
        <h1 className="heading">Tehtävälistasovellus</h1>
        <button className="nav" onClick={toList}>
          Tehtävät
        </button>
        <button className="nav" onClick={toStats}>
          Tilastoja
        </button>
      </header>
      <div>
      {
      currentPage === "list" ? <ListView items={todoItems} onSubmit={addItem} onSelect={toItem} onCheck={itemDone}/>
      : currentPage === "stats" ? <Stats items={todoItems}/>
      : <ItemView item={currentItem} editItem={editItem} delete={deleteItem}/>
      }
      </div>
    </div>
  );
}

export default App;
