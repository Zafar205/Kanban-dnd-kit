import {Plus} from 'lucide-react';

const Kanban = () => {
  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
        <div className="m-auto">
                <button className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-gray-900 border-2 border-gray-800 p-4 ring-rose-500 hover:ring-2 flex items-center justify-center gap-2 text-white">
                  <Plus className="w-5 h-5 text-white" />
                  Add Column
                </button>
        </div>
    </div>
  )
}

export default Kanban