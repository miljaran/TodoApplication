import AddItem from "./AddItem";
import React, { useState } from "react";
import SingleItem from "./SingleItem";
import './ListView.css'

const ListView = (props) => {
  const items = props.items
  const [order, setOrder] = useState("none")

  // Funktio valinnan muuttamiseen
  const handleChange = (e) => {
    e.preventDefault();
    const newOrder = e.target.value
    setOrder(newOrder)

    // Tehtävien uudestaan järjestäminen
    if (newOrder === "alphabet") {
      items.sort(function(a, b) {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1;
        return 0;
      })
    } else if (newOrder === "date") {
      items.sort(function(a, b) {
        const d1 = Date.parse(a.date)
        const d2 = Date.parse(b.date)
        if (d1 < d2) return -1
        if (d1 > d2) return 1
        return 0
      })
    } else if (newOrder === "done") {
      items.sort(function(a, b) {
        if (a.done && !b.done) return -1
        if (!a.done && b.done) return 1
        return 0
      })
    }
  }

  return (
    <>
      <div className="itemList">
        <h3>Tehtävät</h3>
        <label className="orderBy">
          Järjestä:&nbsp;
          <select value={order} onChange={handleChange}>
            <option value="none">Ei mitään</option>
            <option value="alphabet">Aakkosittain</option>
            <option value="date">Päivämäärä</option>
            <option value="done">Status</option>
          </select>
        </label>
        {items.map(item => {
          return <SingleItem key={item.name} item={item} onSelect={props.onSelect} onCheck={props.onCheck}/>
        })}
      </div>
      <hr/>
      <AddItem onSubmit={props.onSubmit} items={items}/>
    </>
  )
}

export default ListView;