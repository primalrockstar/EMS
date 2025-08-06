import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
const LOCAL_STORAGE_KEY = "todo-list";
const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");
    useEffect(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored)
            setTodos(JSON.parse(stored));
    }, []);
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);
    const addTodo = () => {
        if (input.trim() === "")
            return;
        setTodos([
            ...todos,
            { id: Date.now(), text: input, completed: false }
        ]);
        setInput("");
    };
    const toggleTodo = (id) => {
        setTodos(todos => todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };
    const removeTodo = (id) => {
        setTodos(todos => todos.filter(todo => todo.id !== id));
    };
    return (_jsxs("div", { style: { maxWidth: 400, margin: "2rem auto" }, children: [_jsx("h2", { children: "To-Do List" }), _jsxs("div", { style: { display: "flex", marginBottom: 8 }, children: [_jsx("input", { value: input, onChange: e => setInput(e.target.value), placeholder: "Add a new task", style: { flex: 1, marginRight: 8 }, onKeyDown: e => e.key === "Enter" && addTodo() }), _jsx("button", { onClick: addTodo, children: "Add" })] }), _jsx("ul", { style: { padding: 0, listStyle: "none" }, children: todos.map(todo => (_jsxs("li", { style: {
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 4,
                        textDecoration: todo.completed ? "line-through" : undefined
                    }, children: [_jsx("input", { type: "checkbox", checked: todo.completed, onChange: () => toggleTodo(todo.id), style: { marginRight: 8 } }), _jsx("span", { style: { flex: 1 }, children: todo.text }), _jsx("button", { onClick: () => removeTodo(todo.id), style: { marginLeft: 8 }, children: "\u274C" })] }, todo.id))) })] }));
};
export default TodoList;
