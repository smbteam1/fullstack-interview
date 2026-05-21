'use client';

import { useState, useEffect } from 'react';
import { Task } from '../Types/common';
import { API_URL } from '../config/common';

interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  openTasks: number;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStats>({ totalTasks: 0, completedTasks: 0, openTasks: 0 });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Work');
  const fetchData = async () => {
    try {
      const [tasksRes, statsRes] = await Promise.all([
        fetch(API_URL),
        fetch(`${API_URL}/stats`),
      ]);

      if (tasksRes.ok) setTasks(await tasksRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
    } catch (err) {
      console.error('Failed fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, category }),
      });
      if (res.ok) {
        setTitle('');
        setDescription('');
        setCategory('Work');
        fetchData();
      }
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const handleToggleStatus = async (task: Task) => {
    const nextStatusMap: Record<string, string> = {
      OPEN: 'IN_PROGRESS',
      IN_PROGRESS: 'DONE',
      DONE: 'OPEN',
    };
    const nextStatus = nextStatusMap[task.status] || 'OPEN';

    try {
      const res = await fetch(`${API_URL}/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Total</p>
          <p className="text-2xl font-bold text-blue-900">{stats.totalTasks}</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Open</p>
          <p className="text-2xl font-bold text-amber-900">{stats.openTasks}</p>
        </div>
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wider">Completed</p>
          <p className="text-2xl font-bold text-green-900">{stats.completedTasks}</p>
        </div>
      </div>

      <form onSubmit={handleCreate} className="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Add New Task</h2>
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task title"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task description"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition">
          Create Task
        </button>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Your Tasks ({tasks.length})</h2>
        {tasks.length === 0 ? (
          <p className="text-slate-400 italic text-center">No tasks found. Create one above!</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-slate-800">{task.title}</h3>
                  {task.category && (
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded border border-slate-200">
                      {task.category}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500">{task.description}</p>
                <span className={`inline-block text-xs px-2 py-1 rounded-full font-bold ${
                  task.status === 'DONE' ? 'bg-green-100 text-green-700' :
                  task.status === 'IN_PROGRESS' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {task.status}
                </span>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleToggleStatus(task)} className="px-3 py-1 text-xs border rounded bg-slate-50 hover:bg-slate-100 text-slate-600 font-medium">
                  Cycle Status
                </button>
                <button onClick={() => handleDelete(task.id)} className="px-3 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600 font-medium">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
