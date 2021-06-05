import Task from './Task';
import {useEffect} from "react";

export default function TaskContainer({
                                          setFilteredTodos,
                                          filteredTodos,
                                          setTodos,
                                          todos,
                                          searchValue,
                                          setSearchValue,
                                          selectValue,
                                          setSelectValue,
                                      }) {
    useEffect(() => {
        handleSelectChange();
    }, [selectValue]);
    const handleSelectChange = () => {
        switch (selectValue) {
            case 'completed':
                setFilteredTodos(todos.filter(todo => todo.completed === true));
                break;
            case 'incomplete':
                setFilteredTodos(todos.filter(todo => todo.completed === false))
                break;
            default:
                setFilteredTodos(todos);
                break;
        }
    };
    useEffect(() => {
            setFilteredTodos(todos.filter(todo => {
                if (!searchValue) {
                    return todo;
                }
                return todo.task.toLowerCase().includes(searchValue.toLowerCase());
            }));
    }, [todos, searchValue]);
    return (
        <div>
            {todos.length !== 0 && <div className="filter">
                <div className="filter-tasks">
                    <input onChange={(e) => setSearchValue(e.target.value)} value={searchValue}
                           placeholder="Search Tasks"
                           type="text" className="filter-input"/>
                    <i className="fas fa-search"> </i>
                </div>
                <div className="select">
                    <select onChange={(e) => setSelectValue(e.target.value)} name="tasks" id="filter-tasks">
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="incomplete">Incomplete</option>
                    </select>
                    <span className="dropdown">
                    </span>
                </div>
            </div>}
            <div className="container">
                <div className="collection">
                    {filteredTodos.map((todo, index) => {
                        return <Task key={todo.id} todo={todo} todos={todos} setTodos={setTodos}
                                     filteredTodos={filteredTodos} index={index}/>
                    })}
                </div>
            </div>
            {todos.length !== 0 &&
            <button onClick={() => setTodos([])} className="clear-btn"><i className="fas fa-trash"> </i></button>}
        </div>
    )
}