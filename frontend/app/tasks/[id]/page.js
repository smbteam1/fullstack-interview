"use client";
import { deleteTask, updateTask } from "@/app/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [desciption, setDescription] = useState("");
  const [category, setCategory] = useState("work");
  const [status, setStatus] = useState("");
  const params = useParams();
  let id=params.id

  useEffect(() => {
    let val1 = localStorage.getItem("task");
let val=JSON.parse(val1)

console.log(val);


    setTitle(val?.title);
    setDescription(val?.description);
    setCategory(val?.category);
    setStatus(val?.status);
  }, []);
  const router = useRouter();

  const handleClick = () => {
    if (!title.trim() || !category.trim()) {
      alert("title and category are required");
      return;
    }

    updateTaskpi();
    alert('task updated')
    router.push('/')
  };

  const updateTaskpi = async () => {
    try {

      const update = await updateTask(
        id,
        title,
        desciption,
        category,
        status,
      );
      console.log(update);
      
    } catch (error) {}
  };
  const handleDelete=async()=>{
    try {
      
   console.log(id);
   
      const del=await deleteTask(id)
        
      console.log(del);
      
      router.push('/')
    } catch (error) {
      
    }

  }
  return (
    <div>
      <button
        onClick={() => {
          router.push("/");
        }}
        className="bg-blue-500 rounded-xl border border-gray-50 p-5"
      >
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
          <button
            onClick={handleDelete}
            className="bg-red-400 cursor-pointer rounded-xl p-4 border border-gray-200 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
