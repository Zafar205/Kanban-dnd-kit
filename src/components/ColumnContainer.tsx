import type { Column, ID } from "../types"
import { useSortable } from "@dnd-kit/sortable"
import {CSS} from "@dnd-kit/utilities"
import { Trash2 } from "lucide-react"
interface Props {
    column: Column,
    deleteColumn: (id: ID) => void
}

const ColumnContainer = (props: Props) => {
    const { column, deleteColumn } = props;

    const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
        id : column.id,
        data : {
            type : "Column",
            column
        }
    })


    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }
    if(isDragging){
        return (
            <div ref={setNodeRef} style={style} className="bg-gray-800 w-[350px] h-[500px] opacity-40 border-2 border-rose-500 max-h-[500px] rounded-md flex flex-col">
            </div>
        )
    }

    return (
        <div ref = {setNodeRef} style = {style} className="bg-gray-800 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
            <div {...attributes} {...listeners} className="bg-gray-900 text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-gray-800 border-4 flex items-center justify-between">                
                <div className="flex gap-2">
                    <div className="flex justify-center items-center bg-gray-800 px-2 py-1 text-sm rounded-full">0</div>
                    <div className="py-[2px]">{column.title}</div>
                </div>
                <div onClick={() => deleteColumn(column.id)}>
                    <Trash2 className="hover:bg-gray-600" />
                </div>
            </div>
            
            <div className="flex flex-grow">Content</div>
            <div>footer</div>
        </div>
    )
}

export default ColumnContainer