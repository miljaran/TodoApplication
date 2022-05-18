import React, { useState } from "react";

const AddItem = (props) => {
  const [inputs, setInputs] = useState({})

  // Funktiot lomakkeen käsittelyyn
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
    <div className="addItem">
      <h3>Lisää uusi tehtävä</h3>
      <p style={{ color: "#a13548" }} id="error"></p>
      <form onSubmit={handleSubmit}>
        <label className="label">
          Tehtävän nimi:&nbsp;
          <input
            className="checkbox"
            type="text"
            name="name"
            value={inputs.name || ""}
            onChange={handleInput}
          />
        </label>
        <br/>
        <label> 
          Tehtävän kuvaus:&nbsp;
          <input
            type="text"
            name="description"
            value={inputs.description || ""}
            onChange={handleInput}
          />
        </label>
        <br/>
        {<label>
          Tehtävän deadline:&nbsp;
          <input
            type="date"
            name="date"
            value={inputs.date || ""}
            onChange={handleInput}
          />
        </label>}
        <br/>
        <input className="button" type="submit" value="Lisää" />
      </form>
    </div>
  )
}

export default AddItem;