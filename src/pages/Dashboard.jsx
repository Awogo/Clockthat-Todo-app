import { useState, useEffect } from "react";

function Dashboard({ logout }) {
  // TASK STATE (PERSISTED)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [recentlyDeleted, setRecentlyDeleted] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  // FORM STATE
  const [form, setForm] = useState({
    title: "",
    desc: "",
    date: "",
    time: "",
    priority: "normal",
  });

  // SAVE TASKS TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // SOUNDS
  const addSound = new Audio("/add.mp3");
  const deleteSound = new Audio("/delete.mp3");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title) return;

    if (editingId) {
      setTasks(
        tasks.map((task) =>
          task.id === editingId ? { ...task, ...form } : task
        )
      );
      setEditingId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), ...form, done: false }]);
      addSound.play();
    }

    setForm({
      title: "",
      desc: "",
      date: "",
      time: "",
      priority: "normal",
    });
  }

  function editTask(task) {
    setForm(task);
    setEditingId(task.id);
  }

  function deleteTask(task) {
    setTasks(tasks.filter((t) => t.id !== task.id));
    setRecentlyDeleted([task, ...recentlyDeleted]);
    deleteSound.play();

    setMessage("Task deleted successfully 💔");
    setTimeout(() => setMessage(""), 2000);
  }
  function toggleDone(id) {
  setTasks(
    tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    )
  );
}

  const today = new Date().toISOString().split("T")[0];

  const filteredTasks = tasks.filter((task) => {
    if (filter === "high") return task.priority === "high";
    if (filter === "overdue") return task.date < today;
    return true;
  });

  return (
    <div className="page active dashboard-layout">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-content">
          <h3 className="logo">⏱️ ClockDat Task</h3>
          <button className="logout" onClick={logout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-body">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <h4> Filters</h4>
          <button onClick={() => setFilter("all")}>All Tasks</button>
          <button onClick={() => setFilter("high")}> High Priority</button>
          <button onClick={() => setFilter("overdue")}>Overdue</button>
          <button onClick={() => setFilter("deleted")}>
            🗑 Recently Deleted
          </button>
        </aside>

        {/* MAIN CONTENT */}
        <main className="todo-container">
          <h2>My Tasks</h2>
          {message && <p className="success-msg">{message}</p>}

          {/* FORM */}
          <form className="todo-form" onSubmit={handleSubmit}>
            <input
              name="title"
              placeholder="Task title..."
              value={form.title}
              onChange={handleChange}
              required
            />

            <input
              name="desc"
              placeholder="Task description"
              value={form.desc}
              onChange={handleChange}
            />

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />

            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            />

            <select className="select"
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="normal"> Normal</option>
              <option value="high"> High Priority</option>
            </select>

            <button className="btn-primary">
              {editingId ? "Update Task" : "Add Task"}
            </button>
          </form>

          {/* TASK LIST */}
          <div className="todo-list">
            {filter === "deleted"
              ? recentlyDeleted.map((task) => (
                  <div key={task.id} className="todo-item faded">
                    <h4>{task.title}</h4>
                    <small>Deleted</small>
                  </div>
                ))
              : filteredTasks.map((task) => (
                  <div key={task.id} className={`todo-item ${task.done ? "done" : ""}`}>
                    <input
                     type="checkbox"
                     className="task-check"
                     checked={task.done}
                    onChange={() => toggleDone(task.id)}
                            />

                    <h4>
                      {task.title}{" "}
                      {task.priority === "high" && "🔥"}
                    </h4>
                    <p>{task.desc}</p>
                    <small>
                      {task.date} • {task.time}
                    </small>

                    <div className="todo-actions">
                      <button onClick={() => editTask(task)}>
                        ✏️ Edit
                      </button>
                      <button onClick={() => deleteTask(task)}>
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
