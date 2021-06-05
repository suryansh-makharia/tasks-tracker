import {v4 as uuidv4} from 'uuid';
import {useEffect, useState} from "react";

export default function Form({
                                 value,
                                 setValue,
                                 todos,
                                 setTodos,
                                 time,
                                 setTime
                             }) {
    const [error, setError] = useState('');
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setError('');
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [error]);
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!value) {
            setError('<i class="fas fa-exclamation-circle"></i> Please enter a task');
        } else {
            setTodos([...todos, {task: value, time, completed: false, id: uuidv4()}]);
            setValue('');
            setError('');
        }
    };
    return (
        <div className="form-container">
            <form className="task-form" onSubmit={handleFormSubmit}>
                <h3>Task: </h3>
                <input placeholder="Add Task" type="text" onChange={(e) => setValue(e.target.value)} value={value}
                       className="task-input"/>
                <h3>Time:</h3>
                <input type="time" onChange={(e) => setTime(e.target.value)} value={time}
                       className="task-input time-input"/>
                <button className="task-button">
                    Save Task
                </button>
                <span dangerouslySetInnerHTML={{__html: error}} className="error error-msg">
                </span>
            </form>
        </div>
    );
}