import { Trash2 } from "lucide-react";
import type { ID, Task } from "../types";
import { useState } from "react";

interface Props{
    task: Task,
    deleteTask: (id: ID) => void
}
function TaskCard(props : Props) {
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const {task, deleteTask} = props;
  return (
    <div className="bg-gray-900 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative justify-between"
    onMouseEnter={()=>setMouseIsOver(true)}
    onMouseLeave={()=>setMouseIsOver(false)}
    >
        {task.content}
        { mouseIsOver && 
        <button className="opacity-60 hover:opacity-100" onClick={()=> deleteTask(task.id)}>
            <Trash2/>
        </button>
        }
    </div>
  )
}

export default TaskCard