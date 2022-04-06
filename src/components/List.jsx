import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getTodos } from '../redux/todoSlice'
import TodoItem from './TodoItem'

const List = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todo)

  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])

  return (
    <ul className='list-group'>
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
        />
      ))}
    </ul>
  )
}

export default List
