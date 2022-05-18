const Stats = (props) => {
  const allItems = props.items
  const doneItems = allItems.filter(item => item.done)
  const divStyle = {margin: "30px"}

  // Funktiot jotka etsivät ehdon mukaisia tehtäviä
  function lateItems() {
    const items = allItems.filter(item => new Date(item.date) < new Date() && !item.done)
    return items.length
  }

  function nextDeadline() {
    const notDone = allItems.filter(item => !item.done)
    const dates = notDone.map(item => new Date(item.date))
    const today = new Date()
    const filtered = dates.filter((date) => date > today)
    if (filtered.length !== 0) {
      const min = filtered.reduce(function (a, b) { return a < b ? a : b; });
      return `Seuraava deadline on ${min.toLocaleDateString()}`
    } else {
      return "Edessä ei ole deadlineja";
    }
  }

  function datesInRange(days) {
    const notDone = allItems.filter(item => !item.done)
    const dates = notDone.map(item => new Date(item.date))
    const today = new Date()
    const end = new Date(Date.now() + (Number(days) * 3600 * 1000 * 24))
    const filtered = dates.filter((date) => date > today && date < end)
    return filtered.length
  }

  return (
    <div className="App">
      <div style={divStyle}>
        <h3>Tehtävät</h3>
        <p>Tehtävistä <b>{doneItems.length}/{allItems.length}</b> on tehty</p>
        <p><b>{allItems.length - doneItems.length}</b> tehtävää on tekemättä</p>
        <p>Tehtävistä <b>{lateItems()}</b> on myöhässä</p>
      </div>
      <hr/>
      <div style={divStyle}>
        <h3>Deadlinet</h3>
        <p>{nextDeadline()}</p>
        <p>Seuraavan kahden viikon aikana edessä on <b>{datesInRange(14)}</b> deadlinea</p>
        <p>Seuraavan kuukauden aikana edessä on <b>{datesInRange(30)}</b> deadlinea</p>
      </div>
    </div>
  );
}

export default Stats;