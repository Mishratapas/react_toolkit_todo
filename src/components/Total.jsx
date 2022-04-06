import React from 'react'
import { useSelector } from 'react-redux'

const Total = () => {
  const total = useSelector((state) =>
    state.todo.filter((todo) => todo.completed === true)
  )
  return <div className='mt-4'>Total Items: {total.length}</div>
}

export default Total
