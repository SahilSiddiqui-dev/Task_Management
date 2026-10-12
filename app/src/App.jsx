import { useState, useEffect } from 'react';

// Replace with your backend URL & port
const API_URL = 'http://localhost:3000/api/tasks';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ title: '' });
  const [error, setError] = useState('');

  // 1. DISPLAY ALL TASKS (GET)
const fetchTask = async() => {
  try {
  const res = await fetch(API_URL);
  const data = await res.json();

  if(data.success){
    setTasks(data.data);
    }

  }catch(err){
    setError("Cant fetch the data");
  }
}
  useEffect(() => {
    fetchTask()
  }, []);

  // 2. ADD TASK (POST)
  const handleAddTask = async (e) => {
    e.preventDefault();
    setError('');

    if (!task.title.trim()) {
      setError('Please enter a valid task');
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task), // Sends { title: "..." }
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Error creating task');
        return;
      }

      // Add new task to the top of the UI list
      setTasks([data.data, ...tasks]);
      setTask({ title: '' }); // Clear input field
    } catch (err) {
      setError('Server error while adding task');
    }
  };

  // 3. DELETE TASK (DELETE)
  const handleDeleteTask = async (id) => {
    setError('');
    try {
    const res = await fetch(`${API_URL}/${id}`, {
      method : 'Delete',
    });
    const data = await res.json();

    if(data.success) {
      setTasks(tasks.filter((t) => t._id !== id));
    }
    else {
      setError(data.message || 'failed to dlt the task');
    }
  }
    catch(err) {
      setError('server error while deleting');
    }

  };
   
  return (
    <div style={{ maxWidth: '420px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Task Management</h2>

      {/* Input Form */}
      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Add
        </button>
      </form>

      {/* Error Message */}
      {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

      {/* Display List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((item) => (
          <li
            key={item._id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0',
              borderBottom: '1px solid #eee',
            }}
          >
            <span>{item.title}</span>
            <button
              onClick={() => handleDeleteTask(item._id)}
              style={{
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}