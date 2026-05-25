import { useEffect, useState } from "react"
import { getTasks } from "../api/task.api"
import { Link } from "react-router-dom"

const Home =()=>{
    const [tasks, setTasks] = useState([])

    const getAllTasks=async()=>{
        const data = await getTasks()
        console.log(data);
        
        setTasks(data.tasks)
    }

    useEffect(()=>{
        getAllTasks()
    },[])

    console.log(tasks, "taskstasks");
    
    return <div style={{textAlign: 'start'}}>
    <h1>Tasks</h1>
    <Link to={'/tasks/new'}>Add Task</Link>
    <div style={{display: "grid", gridTemplateColumns:"auto auto auto", gap: "10px"}}>{
        tasks.map(item=>(
            <Link to={`/tasks/${item._id}`} style={{textDecoration: 'none'}}>
            <div style={{border:"1px solid black"}}>
                <h3>{item.title}</h3>
                <h3>{item.category}</h3>
                <h3>{item.status}</h3>
            </div>
            </Link>
        ))
        }</div>
    </div>
}
export default Home