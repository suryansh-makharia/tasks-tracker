import {useEffect, useState} from "react";
import './App.css';
import Form from './components/Form';
import TaskContainer from "./components/TaskContainer";

function App() {
    const currentTime = (new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()) + ':' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes());
    const [todos, setTodos] = useState([]);
    const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [selectValue, setSelectValue] = useState('all');
    const [time, setTime] = useState(currentTime);
    useEffect(() => {
            if(localStorage.getItem('todos') === null){
                localStorage.setItem('todos', JSON.stringify([]));
            } else {
                const localTodos = JSON.parse(localStorage.getItem('todos'));
                setTodos(localTodos);
            }
    }, []);
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);
    return (
        <div className="App">
            <Form setFilteredTodos={setFilteredTodos} todos={todos} setTodos={setTodos} value={value} time={time}
                  setTime={setTime} setValue={setValue}/>
            <hr/>
            <h1 style={{textAlign: 'center', padding: '1rem 0'}}>Tasks To-Do:</h1>
            {todos.length === 0 && <h2 style={{textAlign: 'center', padding: '1rem 0'}}>No Tasks Left.</h2>}
            <TaskContainer filteredTodos={filteredTodos} setTodos={setTodos} todos={todos} time={time} setTime={setTime}
                           setFilteredTodos={setFilteredTodos} searchValue={searchValue} setSearchValue={setSearchValue}
                           selectValue={selectValue} setSelectValue={setSelectValue}/>
        </div>
    );
}

export default App;
