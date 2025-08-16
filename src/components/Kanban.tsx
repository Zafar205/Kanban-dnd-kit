import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { Column, ID, Task } from '../types';
import ColumnContainer from './ColumnContainer';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';

const Kanban = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([])
  const [activeColumn, setActiveColumn] = useState<Column | null>();

  //array of colum ids
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns])
  // console.log(columns)

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

  function deleteColumn(id: ID) {
    console.log("delete trigerred")
    const filteredColumns = columns.filter(col => col.id !== id)
    setColumns(filteredColumns);
  }

  function onDragStart(event: DragStartEvent) {
    // console.log("Drag Start", event)
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current?.column);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;
    if (activeColumnId === overColumnId) return;
    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );

      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );
      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }
  function createTask(columnId: ID) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`
    }
    setTasks([...tasks, newTask])
  }

  function updateTask(taskId: ID, content : string){
    const newTasks = tasks.map((task)=> {
      if(task.id !== taskId) return task;
      return {...task, content}
    })

    setTasks(newTasks)
  }
  function deleteTask(taskId: ID) {
    const newTasks = tasks.filter((task)=> task.id !== taskId);
    setTasks(newTasks)
  }
  function updateColumn(id: ID, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3 //3px
      }
    })
  )

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="m-auto flex gap-4">

          <div className='flex gap-4'>
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer key={col.id} column={col} deleteColumn={deleteColumn} updateColumn={updateColumn} createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)} />
              ))}
            </SortableContext>
          </div>
          <button onClick={() => { createNewColumn() }} className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-gray-900 border-2 border-gray-800 p-4 ring-rose-500 hover:ring-2 flex items-center justify-center gap-2 text-white">
            <Plus className="w-5 h-5 text-white" />
            Add Column
          </button>
        </div>
        {
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer deleteColumn={deleteColumn} column={activeColumn} updateColumn={updateColumn} createTask={createTask} deleteTask={deleteTask}
                  tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                  updateTask={updateTask} />
              )}
            </DragOverlay>, document.body
          )
        }
      </DndContext>
    </div>
  )
}

export default Kanban