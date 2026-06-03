"use client";
import { useEffect, useState } from "react";
import { getTasks } from "./api";
import Card from "./card";
import { useRouter } from "next/navigation";

export default function Home() {
  const [tasks, setTasks] = useState(null);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const gettasksapi = async () => {
    try {
      const tasks = await getTasks( category,status);

      console.log(tasks.tasks);
      setTasks(tasks.tasks);
    } catch (error) {}
  };

  useEffect(() => {
    gettasksapi();
  }, [status,category]);
  const router = useRouter();
  return (
    <div className="">
      <div className="bg-gray-200 h-screen items-center flex flex-col">
        <div className=" p-10 flex max-w-3xl items-center gap-50">
          <h1 className="text-4xl">Tasks</h1>
          <div className="flex justify-center items-center">
            <h1 className="font-bold text-lg">Category</h1>

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
          <div className="flex justify-center items-center">
            <h1 className="font-bold text-lg">Status</h1>

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
            className="bg-blue-300 rounded-xl p-3 border border-gray-50 "
            onClick={() => {
              router.push("/tasks/new");
            }}
          >
            Create
          </button>
        </div>
        <div className="flex gap-3">
          {tasks?.map((v, i) => (
            <Card key={i} data={v} />
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
}
