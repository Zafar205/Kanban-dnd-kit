import { Trash2 } from "lucide-react";
import type { ID, Task } from "../types";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"

interface Props {
  task: Task,
  deleteTask: (id: ID) => void,
  updateTask: (taskId: ID, content: string) => void
}
function TaskCard(props: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { task, deleteTask, updateTask } = props;

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task
    },
    disabled: editMode
  })
  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  function toggleEditMode() {
    setEditMode(prev => !prev);
    setMouseIsOver(false);
  }

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className="bg-gray-900 p-2.5 opacity-30 h-[100px] min-h-[100px]
    border-2 border-rose-500 items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset cursor-grab relative ">
    </div>
  }

  if (editMode) {
    return <div className="bg-gray-900 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative justify-between"
      onClick={toggleEditMode}
      ref={setNodeRef} style={style} {...attributes} {...listeners}
    >
      <textarea className="h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none"
        value={task.content}
        autoFocus
        placeholder="Task Content Here"
        onBlur={toggleEditMode}
        onKeyDown={(e) => { if (e.key === "Enter" && e.shiftKey) toggleEditMode() }}
        onChange={(e) => updateTask(task.id, e.target.value)}
      >

      </textarea>

    </div>
  }
  return (
    <div className="bg-gray-900 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative justify-between task-scrollbar"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={toggleEditMode}
      ref={setNodeRef} style={style} {...attributes} {...listeners}
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p>

      {mouseIsOver &&
        <button className="opacity-60 hover:opacity-100" onClick={() => deleteTask(task.id)}>
          <Trash2 />
        </button>
      }
    </div>
  )
}

export default TaskCard