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

  return (
    <div className="App">
      <ul>
        <li>{done.length}/{items.length} tehävistä tehty</li>
        <li>{} tehtävistä tehty ajallaan</li>
        <li>Tehtävistä {isLate()} on myöhässä</li>
        <li>Seuraava deadline on {}</li>
      </ul>
    </div>
  );
}

export default Stats;