import React, { useState, useEffect, useContext } from 'react';
import './App.css';

function Todo({
  todo,
  index,
  completeTodo,
  deleteTodo
}) {
  return (
    <div className="todo"
      style={{textDecoration: todo.isCompleted ? 'line-through' : ''}}>
      { todo.text }
      <div>
        <button onClick={() => completeTodo(index)}>
          Complete
        </button>
        <button onClick={() => deleteTodo(index)}>
          X
        </button>
      </div>
    </div>
  );
}

function TodoForm() {
  const [value, setValue] = useState('');
  const addTodo = useContext(Context);

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  }

  return(
    <form onSubmit={handleSubmit}>
      <input type="text" className="input" value={value} onChange={e => setValue(e.target.value)} />
    </form>
  )
}


const Context = React.createContext();

function App() {
  const [state, setState] = useState({
    foo: '',
    todos:
      [{
        text: 'Learn about React',
        isCompleted: false,
      },
      {
        text: 'Meet friend for launch',
        isCompleted: false,
      },
      {
        text: 'Build really cool todo app',
        isCompleted: false,
      }]
  });
  useEffect(() => {
    console.log(state)
    // console.log(newState)
  }, [state]);
  const [newState, setNewState] = useState(0)
  useEffect(() => {
    // console.log(state)
    console.log(newState)
    return function cleanup() {
      console.log('Cleaning up!');
    }
  }, [newState]);
  

  const addTodo = text => {
    // const newTodos = [...state.todos, {text}];
    // setState({
    //   ...state,
    //   todos: newTodos
    // });
    setNewState(newState+ 1);
  }

  const completeTodo = index => {
    const newTodos = [...state.todos];
    newTodos[index].isCompleted = true;
    setState({
      ...state,
      todos: newTodos
    });
  }

  const deleteTodo = index => {
    const newTodos = [...state.todos];
    newTodos.splice(index, 1);
    setState({
      ...state,
      todos: newTodos
    });
  }

  return (
    <Context.Provider value={addTodo} >
      <div className="app">
        <div className="todo-list">
          { state.todos.map((todo, index) => (
            <Todo key={index} index={index} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo}/>
          ))}
          <TodoForm />
        </div>
      </div>
    </Context.Provider>
  )
}

export default App;