import {  Plus } from 'lucide-react';
import { useState } from 'react';
import type { Column, ID } from '../types';
import ColumnContainer from './ColumnContainer';

const Kanban = () => {
  const [columns, setColumns] = useState<Column[]>([])

  console.log(columns)

  function generateId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
  }

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`
    }
    setColumns([...columns, columnToAdd])
  }

  function deleteColumn(id: ID){
    const filteredColumns = columns.filter(col => col.id !== id)
    setColumns(filteredColumns);
  }
  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <div className="m-auto flex gap-4">
        <div className='flex gap-4'>
          {columns.map((col) => (
            <ColumnContainer key={col.id} column={col} deleteColumn={deleteColumn} />
          ))}
        </div>
        <button onClick={() => { createNewColumn() }} className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-gray-900 border-2 border-gray-800 p-4 ring-rose-500 hover:ring-2 flex items-center justify-center gap-2 text-white">
          <Plus className="w-5 h-5 text-white" />
          Add Column
        </button>
      </div>
    </div>
  )
}

export default Kanban