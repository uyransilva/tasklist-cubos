import './style.css';
import { useState } from 'react'

function Main() {
  const [ task , setTasks ] = useState([]);
  

  function handleAddTask (event) {
    const content = event.target.value
    if( event.key != 'Enter' || content === ''){
      return;
    }

    const localTasks = [...task];
    const newTask = {
      id:localTasks.length > 0 ? localTasks[localTasks.length - 1].id + 1 : 1,
      name : content,
      done: false
    }

    localTasks.push(newTask);

    setTasks(localTasks);

    event.target.value = ''

  }

  function handleDeleteTask ( taskId ){
    const localTasks = [...task];

    const taskIndex = localTasks.findIndex((task) => task.id === taskId);

    if(taskIndex === -1){
      return;
    }

    localTasks.splice(taskIndex, 1);

    setTasks(localTasks);
  }

  function handleRiskTask (taskId) {
    const localTasks = [...task];

    const findTask = localTasks.find((task) => task.id === taskId);


    if(!findTask){
      return;
    }

    findTask.done = !findTask.done;

    setTasks(localTasks)

  }

  return (
    <div className='container'>
      <div>
        <input
        type='text'
        placeholder = 'Nova tarefa'
        onKeyDown={(event) => handleAddTask(event)}></input>
      </div>

      <div>
        <ul>
          {task.map((task) => 
          <li key={ task.id }>
            <span
            className= {`${task.done ? 'task-done' : ''}`}
            onClick={() => handleRiskTask(task.id)}>
            { task.name }</span>
            <button 
            className='btn-del'
            onClick={ () => handleDeleteTask(task.id)}>X</button>
          </li>
          )}
        </ul>

      </div>
    </div>
  );
}

export default Main;
