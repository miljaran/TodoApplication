import React, { useState } from "react";

const AddItem = (props) => {
  const [inputs, setInputs] = useState({})
  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (e) => {
    const error = document.querySelector("#error");
    error.innerHTML = "";
    e.preventDefault();
    if (!inputs.name) {
      error.innerHTML = "Tehtävälle pitää antaa nimi"
    } else if (props.items.find((obj) => obj.name === inputs.name)) {
      error.innerHTML = `${inputs.name} -niminen tehtävä on jo olemassa`
    } else {
      props.onSubmit(inputs)
      setInputs({})
    }
  }

  return (
    <div>
      <h3>Lisää uusi tehtävä</h3>
      <div id="error"></div>
      <form onSubmit={handleSubmit}>
        <label>
          Tehtävän nimi:
          <input
            type="text"
            name="name"
            value={inputs.name || ""}
            onChange={handleInput}
          />
        </label>
        <br/>
        <label>
          Tehtävän kuvaus:
          <input
            type="text"
            name="description"
            value={inputs.description || ""}
            onChange={handleInput}
          />
        </label>
        <br/>
        {<label>
          Tehtävän deadline:
          <input
            type="date"
            name="date"
            value={inputs.date || ""}
            onChange={handleInput}
          />
        </label>}
        <br/>
        <input type="submit" />
      </form>
    </div>
  )
}

export default AddItem;