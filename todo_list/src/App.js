import React, { useState } from "react";
import "./App.css";
const App = () => {
    const [todos, setTodos] = useState([]);
    const [todoEditing, setTodoEditing] = useState(null);

    // Add the handlesubmit code here
    function handleSubmit(e) {
        e.preventDefault();

        let todo = document.getElementById('todoAdd').value;

        const newTodo = {
            id: new Date().getTime(),
            text: todo.trim(),
            completed: false,

        };
        if (newTodo.text.length > 0) {
            setTodos([...todos].concat(newTodo));
        } else {
            alert("Ingrese una tarea valida");
        }
        document.getElementById('todoAdd').value = ""
    }

    // Add the deleteToDo code here
    function deleteTodo(id) {
        let updatedTodos = [...todos].filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }

    // Add the toggleComplete code here
    function toggleComplete(id) {
        let updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo
        });
        setTodos(updatedTodos);
    }

    // Add the submitEdits code here
    function submitEdits(newtodo) {
        const updatedTodos = [...todos].map((todo) => {
            if (todo.id === newtodo.id) {
                todo.text = document.getElementById(newtodo.id).value;
            }
            return todo
        });
        setTodos(updatedTodos);
        setTodoEditing(null);
    }

    return (
        <div id="todo-list">
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id='todoAdd'
                />
                <button type="submit">Add Todo</button>
            </form>
            {todos.map((todo) =>
                <div className="todo" key={todo.id}>
                    <div className="todo-text">
                        <input type="checkbox" id="completed" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
                        { /*si se esta editando, mostrar un input, de lo contrario, mostrar el texto*/
                            todo.id === todoEditing ?
                                (<input type="text" id={todo.id} defaultValue={todo.text} />) :
                                (<div>{todo.text}</div>)
                        }
                    </div>
                    <div className="todo-actions">
                        {
                            todo.id === todoEditing ?
                                (<button onClick={() => submitEdits(todo)}>Enviar edit</button>) :
                                (<button onClick={() => setTodoEditing(todo.id)}>Editar</button>)
                        }
                        <button onClick={() => deleteTodo(todo.id)}>Borrar</button>
                    </div>
                </div>)}
        </div>
    );
};
export default App;
