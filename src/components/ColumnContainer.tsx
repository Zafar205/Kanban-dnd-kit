import type { Column, ID, Task } from "../types"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import TaskCard from "./TaskCard"
interface Props {
    column: Column,
    deleteColumn: (id: ID) => void,
    updateColumn: (id: ID, title: string) => void,
    createTask: (columnId: ID) => void,
    deleteTask: (taskId : ID) => void,
    tasks: Task[]
}

const ColumnContainer = (props: Props) => {
    const { column, deleteColumn, updateColumn, createTask, deleteTask,tasks} = props;
    const [editMode, setEditMode] = useState(false);

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column
        },
        disabled: editMode
    })


    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }
    if (isDragging) {
        return (
            <div ref={setNodeRef} style={style} className="bg-gray-800 w-[350px] h-[500px] opacity-40 border-2 border-rose-500 max-h-[500px] rounded-md flex flex-col">
            </div>
        )
    }

    return (
        <div ref={setNodeRef} style={style} className="bg-gray-800 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
            <div onClick={() => { setEditMode(true) }} {...attributes} {...listeners} className="bg-gray-900 text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-gray-800 border-4 flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="flex justify-center items-center bg-gray-800 px-2 py-1 text-sm rounded-full">0</div>
                    <div className="py-[2px]">
                        {!editMode && column.title}
                        {editMode && <input
                            className="bg-black focus:border-rose-700 border rounded outline-none px-2"
                            value={column.title}
                            onChange={(e) => updateColumn(column.id, e.target.value)}
                            autoFocus
                            onBlur={() => {
                                setEditMode(false)
                            }}
                            onKeyDown={(e) => {
                                if (e.key !== "Enter") return;
                                setEditMode(false);
                            }} />}
                    </div>
                </div>
                <div onClick={() => deleteColumn(column.id)}>
                    <Trash2 className="hover:bg-gray-600" />
                </div>
            </div>

            <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
                {
                    tasks.map((task) => (
                        <TaskCard key={task.id} task={task} deleteTask={deleteTask}/>
                    ))
                }
            </div>

            <button className="flex gap-2 items-center border-gray-800 border-2 rounded-md p-4 hover:text-rose-500 active:bg-black"
                    onClick={()=>{
                        createTask(column.id)
                    }}>
                <Plus />
                Add Task
            </button>
        </div>
    )
}

export default ColumnContainer