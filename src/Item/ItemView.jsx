import React, { useState } from "react";

const ItemView = (props) => {
  const [inputs, setInputs] = useState({})
  const item = props.item
  const descStyle = {color: "#633d44"}

  // Funktiot lomakkeen käsittelyyn
  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputs(values => ({...values, [name]: value}))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    props.editItem(item.name, inputs)
    setInputs({})
  }
  const handleDelete = (e) => {
    e.preventDefault();
    props.delete(item.name)
  }

  return (
    <>
    <div>
      <h2>{item.name}</h2>
      <p><b>Kuvaus:</b> <span style={descStyle}>{item.description}</span></p>
      <p><b>Deadline:</b> <span style={descStyle}>{new Date(item.date).toLocaleDateString()}</span></p>
    </div>
    <div>
      <h3>Muokkaa tehtävää</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Uusi kuvaus:&nbsp;
          <input
            type="text"
            name="description"
            value={inputs.description || ""}
            onChange={handleInput}
          />
        </label>
        <br/>
        <label>
          Uusi päivämäärä:&nbsp;
          <input
            type="date"
            name="date"
            value={inputs.date || ""}
            onChange={handleInput}
          />
        </label>
        <br/>
        <input className="button" type="submit" value="Päivitä" />
      </form>
      <button className="button" onClick={handleDelete}>Poista tehtävä</button>
      </div>
    </>
  )
}

export default ItemView;