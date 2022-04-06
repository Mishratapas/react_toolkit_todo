import { useDispatch } from 'react-redux'
import { deleteTodoAsync, toggleTodos } from '../redux/todoSlice'

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch()

  const handleChecked = () =>
    dispatch(toggleTodos({ id: id, completed: !completed }))

  const handleDelete = () => {
    dispatch(deleteTodoAsync({ id: id }))
  }
  return (
    <li className={`list-group-item ${completed && 'list-group-item-success'}`}>
      <div className='d-flex justify-content-between'>
        <span className='d-flex align-items-center'>
          <input
            type='checkbox'
            className='mr-3'
            checked={completed}
            onChange={handleChecked}
          />
          {title}
        </span>
        <button onClick={handleDelete} className='btn btn-danger'>
          Delete
        </button>
      </div>
    </li>
  )
}

export default TodoItem
