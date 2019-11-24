import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.headers.post['Content-Type'] = 'application/json'

function App() {
  const [count, setCount] = useCounter()

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
      <div className="actions">
        <button onClick={increment}>Increment</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

function useCounter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    axios.get('/counter').then((res) => {
      setCount(res.data.counter)
    })
  }, [])

  function setRemoteCount(newCount) {
    return axios.post('/counter', { counter: newCount }).then(() => {
      setCount(newCount)
    })
  }

  return [count, setRemoteCount]
}

export default App
