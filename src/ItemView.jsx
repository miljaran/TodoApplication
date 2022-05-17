import React, { useState } from "react";

const ItemView = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.editItem(item.name, inputs)
    setInputs({})
  }
  const [inputs, setInputs] = useState({})
  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputs(values => ({...values, [name]: value}))
  }
  const handleDelete = (e) => {
    e.preventDefault();
    props.delete(item.name)
  }
  const item = props.item
  const date = new Date(item.date)

  return (
    <div>
      <p>Tehtävän nimi: {item.name}</p>
      <p>Tehtävän kuvaus: {item.description}</p>
      <p>Tehtävän deadline: {date.toLocaleDateString()}</p>
      <h2>Muokkaa tehtävää</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Uusi kuvaus:
          <input
            type="text"
            name="description"
            value={inputs.description || ""}
            onChange={handleInput}
          />
        </label>
        <br/>
        <label>
          Uusi päivämäärä:
          <input
            type="date"
            name="date"
            value={inputs.date || ""}
            onChange={handleInput}
          />
        </label>
        <br/>
        <input type="submit" />
      </form>
      <button onClick={handleDelete}>Poista tehtävä</button>
    </div>
  )
}

export default ItemView;