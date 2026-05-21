import TaskManager from "./components/TaskManager";


export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 py-12">
      <h1 className="text-3xl font-extrabold text-center text-slate-900 mb-8">
        Task Management System
      </h1>
      <TaskManager />
    </main>
  );
}
