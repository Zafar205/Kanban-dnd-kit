import { Trash2 } from "lucide-react";
import type { ID, Task } from "../types";
import { useState } from "react";

interface Props {
  task: Task,
  deleteTask: (id: ID) => void,
  updateTask: (taskId: ID, content: string) => void
}
function TaskCard(props: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { task, deleteTask, updateTask } = props;

  function toggleEditMode() {
    setEditMode(prev => !prev);
    setMouseIsOver(false);
  }

  if (editMode) {
    return <div className="bg-gray-900 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative justify-between"
      onClick={toggleEditMode}
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