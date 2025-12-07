import { useEffect, useState } from "react";

const API_BASE = "http://localhost:8080/task";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load tasks on first render
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to load tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError("Could not load tasks. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      setError("");
      const res = await fetch(`${API_BASE}/text`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text.trim(),
          completed: false,
        }),
      });

      if (!res.ok) throw new Error("Failed to create task");

      const created = await res.json();
      setTasks((prev) => [...prev, created]);
      setText("");
    } catch (err) {
      console.error(err);
      setError("Could not create task.");
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      setError("");
      const res = await fetch(`${API_BASE}/edit/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: task.text,
          completed: !task.completed,
        }),
      });

      if (!res.ok) throw new Error("Failed to update task");

      const updated = await res.json();
      setTasks((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      );
    } catch (err) {
      console.error(err);
      setError("Could not update task.");
    }
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      const res = await fetch(`${API_BASE}/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok && res.status !== 204)
        throw new Error("Failed to delete task");

      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      setError("Could not delete task.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#020617",
          borderRadius: "16px",
          padding: "1.5rem",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
          border: "1px solid #1e293b",
        }}
      >
        <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
          📝 My Todo List
        </h1>

        <form
          onSubmit={handleAddTask}
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <input
            type="text"
            placeholder="What do you want to do?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              flex: 1,
              padding: "0.6rem 0.8rem",
              borderRadius: "8px",
              border: "1px solid #334155",
              background: "#020617",
              color: "white",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.6rem 1rem",
              borderRadius: "8px",
              border: "none",
              background: "#22c55e",
              color: "#020617",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </form>

        {loading && <p>Loading tasks...</p>}
        {error && (
          <p style={{ color: "#f97316", marginBottom: "0.5rem" }}>{error}</p>
        )}

        {tasks.length === 0 && !loading && (
          <p style={{ color: "#9ca3af" }}>No tasks yet. Add your first one!</p>
        )}

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.5rem 0.25rem",
                borderBottom: "1px solid #1e293b",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task)}
                />
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "#6b7280" : "white",
                  }}
                >
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => handleDelete(task.id)}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#f97316",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
