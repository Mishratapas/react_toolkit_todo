import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTodos } from '../redux/todoSlice'

const Add = () => {
  const [values, setValues] = useState('')
  const dispatch = useDispatch()
  const onSubmit = (e) => {
    e.preventDefault()
    setValues('')
    dispatch(createTodos({ title: values }))
  }

  return (
    <form onSubmit={onSubmit} className='form-inline'>
      <input
        type='text'
        placeholder='Add Todo'
        className='form-control mb-2 mr-sm-2'
        value={values}
        onChange={(e) => setValues(e.target.value)}
      />
      <button className='btn btn-primary'>Submit</button>
    </form>
  )
}

export default Add
