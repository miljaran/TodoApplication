const SingleItem = (props) => {

  const item = props.item
  const date = new Date(item.date)
  // Funktiot tehtävän valitsemiseen ja statuksen vaihtamiseen
  function select() {props.onSelect(item)}
  function handleCheck() {props.onCheck(item.name)}

  return (
    <div className="item" key={item.name}>
      <span className="itemName" onClick={select}>{item.name}</span>
      &nbsp;<span className="itemDate">- {date.toLocaleDateString()}</span>
        <input type="checkbox" checked={item.done} onChange={handleCheck}/>
    </div>
  );
}

export default SingleItem;