const Stats = (props) => {
  const items = props.items
  const done = items.filter(item => item.done)

  function isLate() {
    var late = 0
    items.forEach(item => {
      if (new Date(item.date) < new Date() && !item.done) {
        late += 1
      }
    });
    return late;
  }

  function nextDeadline() {
    const notDone = items.filter(item => !item.done)
    const copy = notDone.map(item => {
      return new Date(item.date)
    })
    const today = new Date()
    const filtered = copy.filter((date) => date > today)
    if (filtered.length !== 0) {
      const min = filtered.reduce(function (a, b) { return a < b ? a : b; });
      return `Seuraava deadline on ${min.toLocaleDateString()}`
    } else {
      return "Edessä ei ole deadlineja";
    }
  }

  function datesInRange(days) {
    const notDone = items.filter(item => !item.done)
    const copy = notDone.map(item => {
      return new Date(item.date)
    })
    const today = new Date()
    const end = new Date(Date.now() + (Number(days) * 3600 * 1000 * 24))
    const filtered = copy.filter((date) => date > today && date < end)
    return filtered.length
  }

  return (
    <div className="App">
      <ul>
        <li>{done.length}/{items.length} tehtävistä tehty</li>
        <li>{items.length - done.length} tehtävää tekemättä</li>
        <li>Tehtävistä {isLate()} on myöhässä</li>
        <li>{nextDeadline()}</li>
        <li>Seuraavan kahden viikon aikana edessä on {datesInRange(14)} deadlinea</li>
        <li>Seuraavan kuukauden aikana edessä on {datesInRange(30)} deadlinea</li>
      </ul>
    </div>
  );
}

export default Stats;