//      _                  _     
//     / \   _ __  _ __   (_)___ 
//    / _ \ | '_ \| '_ \  | / __|
//   / ___ \| |_) | |_) | | \__ \
//  /_/   \_\ .__/| .__(_)/ |___/
//          |_|   |_|   |__/     


import React from 'react';
import TodoList from './components/TodoComponents/TodoList';
import TodoForm from './components/TodoComponents/TodoForm';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      inputText: '',
      };
  }

  addTask = (event) => {
    event.preventDefault();
    if (this.state.inputText.trim() !== '') {
      this.setState({
        tasks: [
          {
            task: this.state.inputText, 
            id: Date.now(), 
            completed: false
          },
          ...JSON.parse(window.localStorage.getItem('tasks'))
        ]
      }, () => { window.localStorage.setItem('tasks', JSON.stringify(this.state.tasks)); return this.forceUpdate() });
      this.setState({
        inputText: ''
      })
    }
  }

  clearTasks = (event) => {
    event.preventDefault();
    console.log('buttons working dude');
    this.setState({
      tasks: JSON.parse(window.localStorage.getItem('tasks')).filter(x => Object.values(x).includes(false))
    }, () => { window.localStorage.setItem('tasks', JSON.stringify(this.state.tasks)); return this.forceUpdate() })
  }

  changeHandler = (event) => {
    this.setState({
      inputText: event.target.value
    })
  }

  completedToggle = (id) => {
    this.setState({
      tasks: JSON.parse(window.localStorage.getItem('tasks')).map(x => {
        if (Object.values(x).includes(id)) {
          return {
          ...x,
          completed: x.completed === true ? false : true
          };
        } else {
          return x;
        }
      })
    }, () => { window.localStorage.setItem('tasks', JSON.stringify(this.state.tasks)); return this.forceUpdate() })
  }

  pointer = (event) => {
    event.target.style.cursor = 'pointer'
  }
  

  // you will need a place to store your state in this component.
  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state
  render() {
    return (
      <div className="App">
        <TodoForm addTask={this.addTask} pointer={this.pointer} clearTasks={this.clearTasks} inputText={this.state.inputText} changeHandler={this.changeHandler} />
        <TodoList completedToggle={this.completedToggle} pointer={this.pointer} todoArray={JSON.parse(window.localStorage.getItem('tasks'))} />
      </div>
    );
  }
}

export default App;
