"use client";
import { createTask } from "@/app/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [desciption, setDescription] = useState("");
  const [category, setCategory] = useState("work");
  const [status, setStatus] = useState("");

  const router=useRouter()
  
  const createTaskApi = async () => {
    try {
      const data = await createTask(title, desciption, category, status);
      console.log(data);
      alert("task added succsufully");
    } catch (error) {
      alert("something wrong");
    }
  };

  const handleClick = () => {
    if (!title.trim() || !category.trim()) {
      alert("title and category are required");
      return;
    }

    createTaskApi();
  };
  return (
    <div>
      <button onClick={()=>{
     router.push('/')
      }} className="bg-blue-500 rounded-xl border border-gray-50 p-5">
        Back
      </button>

      <div className="flex justify-center h-screen items-center">
        <div className=" border gap-5 flex flex-col border-gray-400 rounded-xl p-10">
          <div className="flex ga-3 justify-center items-center">
            <h1 className="font-bold text-lg">Title :</h1>
            <input
              className="border border-gray-300 rounded-xl p-3"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="flex ga-3 justify-center items-center">
            <h1 className="font-bold text-lg">Desciption :</h1>
            <input
              className="border border-gray-300 rounded-xl p-3"
              type="text"
              value={desciption}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          <div className="flex ga-3 justify-center items-center">
            <h1 className="font-bold text-lg">Category :</h1>

            <select
              className="border border-gray-200 p-3 rounded-xl"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value={"work"}>work</option>
              <option value={"personal"}>personal</option>
              <option value={"shoping"}>shoping</option>
              <option value={"other"}>other</option>
            </select>
          </div>
          <div className="flex ga-3 justify-center items-center">
            <h1 className="font-bold text-lg">Status :</h1>

            <select
              className="border border-gray-200 p-3 rounded-xl"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value={"pending"}>pending</option>
              <option value={"inProgress"}>in-progress</option>
              <option value={"completed"}>completed</option>
            </select>
          </div>

          <button
            onClick={handleClick}
            className="bg-blue-400 cursor-pointer rounded-xl p-4 border border-gray-200 text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
