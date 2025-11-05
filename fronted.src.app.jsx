
```jsx
import React, { useEffect, useState } from 'react'
import TodoList from './components/TodoList'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => { fetchTodos() }, [])

  async function fetchTodos() {
    setLoading(true)
    const res = await fetch(`${API}/todos`)
    const data = await res.json()
    setTodos(data)
    setLoading(false)
  }

  async function addTodo(e) {
    e.preventDefault()
    if (!text.trim()) return
    const res = await fetch(`${API}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
    const created = await res.json()
    setTodos(prev => [created, ...prev])
    setText('')
  }

  async function toggleComplete(id) {
    const todo = todos.find(t => t._id === id)
    const res = await fetch(`${API}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed })
    })
    const updated = await res.json()
    setTodos(prev => prev.map(t => t._id === id ? updated : t))
  }

  async function deleteTodo(id) {
    await fetch(`${API}/todos/${id}`, { method: 'DELETE' })
    setTodos(prev => prev.filter(t => t._id !== id))
  }

  return (
    <div className="app">
      <h1>Todo App</h1>
      <form onSubmit={addTodo} className="add-form">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>

      {loading ? <p>Loading...</p> : <TodoList todos={todos} onToggle={toggleComplete} onDelete={deleteTodo} />}
    </div>
  )
}
```
