export default function Task({task, deleteTask}) {
    return (
        <div className="task">
        <input type="text" value={task.title} placeholder="Enter task title"/>
        <button type="submit" onClick={() => {}}>Submit</button>
        </div>
    )
}