import React, { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  function increment() {
    setCount(count + 1)
  }

  return (
    <div className="App">
      <header className="App-header">
        Counter
      </header>
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

export default App
