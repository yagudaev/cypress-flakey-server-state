import React, { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  function increment() {
    setCount(count + 1)
  }

  function reset() {
    setCount(0)
  }

  return (
    <div className="App">
      <header className="App-header">
        Counter
      </header>
      <p data-cy="counter">{count}</p>
      <div class="actions">
        <button onClick={increment}>Increment</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

export default App
