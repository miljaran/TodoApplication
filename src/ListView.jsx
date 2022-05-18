import AddItem from "./AddItem";
import React, { useState } from "react";

const ListView = (props) => {
  const items = props.items
  const [order, setOrder] = useState("none")

  const handleChange = (e) => {
    const newOrder = e.target.value
    setOrder(newOrder)
    if (newOrder === "alphabet") {
      items.sort(function(a, b) {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
    } else if (newOrder === "date") {
      items.sort(function(a, b) {
        const d1 = Date.parse(a.date)
        const d2 = Date.parse(b.date)
        if (d1 < d2) {
          return -1
        }
        if (d1 > d2) {
          return 1
        }
        return 0
      })
    } else if (newOrder === "done") {
      items.sort(function(a, b) {
        if (a.done && !b.done) {
          return -1
        }
        if (!a.done && b.done) {
          return 1
        }
        return 0
      })
    }
  }

  return (
    <div>
      <label>
        Järjestä:
        <select value={order} onChange={handleChange}>
          <option value="none">Ei mitään</option>
          <option value="alphabet">Aakkosittain</option>
          <option value="date">Päivämäärä</option>
          <option value="done">Status</option>
        </select>
      </label>
      {items.map(item => {
        const date = new Date(item.date)
        function select() {props.onSelect(item)}
        function handleCheck() {props.onCheck(item.name)}

        return (
          <div key={item.name}>
          <p>
            <span onClick={select}>{item.name}</span> - {date.toLocaleDateString()}
          </p>
          <input type="checkbox" checked={item.done} onChange={handleCheck}/>
          </div>
        )
      })}
      <AddItem onSubmit={props.onSubmit} items={items}/>
    </div>
  )
}

export default ListView;