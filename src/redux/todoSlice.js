import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getTodos = createAsyncThunk('todos/getTodos', async () => {
  const response = await fetch('http://localhost:7000/todos/')
  if (response.ok) {
    const todos = await response.json()
    return { todos }
  }
})

export const createTodos = createAsyncThunk(
  'todos/createTodos',
  async (payload) => {
    const response = fetch('http://localhost:7000/todos/', {
      method: 'POST',
      headers: {
        Accept: 'appplication/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: payload.title }),
    })
    if (response.ok) {
      const todo = await response.json()
      return { todo }
    }
  }
)

export const toggleTodos = createAsyncThunk(
  'todos/toggleTodos',
  async (payload) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        body: JSON.stringify({ completed: payload.completed }),
      },
    })
    if (response.ok) {
      const todo = await response.json()
      return { id: todo.id, completed: todo.completed }
    }
  }
)

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (payload) => {
    const response = fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: payload.id }),
    })
    if (response.ok) {
      const todo = await response.json()
      return { id: todo.id }
    }
  }
)

const initialState = [
  { id: 1, title: 'React', completed: false },
  { id: 2, title: 'Redux', completed: false },
  { id: 3, title: 'Next', completed: false },
  { id: 4, title: 'Native', completed: false },
]

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      }
      state.push(newTodo)
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      state[index].completed = action.payload.completed
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id)
    },
  },
  extraReducers: {
    [getTodos.fulfilled]: (state, action) => {
      return action.payload.todos
    },
    [createTodos.fulfilled]: (state, action) => {
      state.push(action.payload.todo)
    },
  },
  [toggleTodos.fulfilled]: (state, action) => {
    const index = state.findIndex((todo) => todo.id === action.payload.id)
    state[index].completed = action.payload.completed
  },
  [deleteTodoAsync.fulfilled]: (state, action) => {
    return state.filter((todo) => todo.id !== action.payload.id)
  },
})

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions
export default todoSlice.reducer
