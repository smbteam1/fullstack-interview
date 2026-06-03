"use client"

import { useRouter } from "next/navigation";

const Card = ({ data }) => {

    const router=useRouter()
  return (
    <div onClick={()=>{
        router.push(`/tasks/${data.id}`)

        localStorage.setItem('task',JSON.stringify(data))
    }} className="p-3 w-sm bg-blue-100 flex gap-4 flex-col border border-black rounded-xl">
      <h1>Title:{data.title}</h1>
      <h1>Description:{data.description}</h1>
      <h1>Category:{data.category}</h1>
    </div>
  );
};

export default Card;
