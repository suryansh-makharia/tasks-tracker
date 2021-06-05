import {useRef} from 'react';
export default function Task({todo, filteredTodos, setTodos, index, todos}) {
    const taskRef = useRef();
    const handleCheckClick = () => {
        setTodos(todos.map(task => {
            if (filteredTodos[index] === task) {
                return {...task, completed: !task.completed}
            }
            return task;
        }));
    };
    const handleDeleteClick = () => {
        taskRef.current.classList.add('fall');
        taskRef.current.addEventListener('transitionend', () => {
            setTodos(todos.filter(task => task !== filteredTodos[index]));
        });
    }
        return (
            <div ref={taskRef} className={`task ${todo.completed ? 'completed' : ''}`}>
                <button onClick={handleDeleteClick} className="delete-btn"><i className="far fa-times-circle"> </i></button>
                <div className="task-text">
                <div className="task-item">{todo.task}</div>
                <div className="time">{`At ${parseInt(todo.time) > 12 ? parseInt(todo.time) - 12 +  todo.time.substring(2, 5)  + ' PM' : todo.time + ' AM'}`}</div>
                </div>
                <button onClick={handleCheckClick} className="complete-btn"><i className="fas fa-check"> </i></button>
        </div>
    );
}