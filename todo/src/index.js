import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

var WelcomeApp = React.createClass({
  getInitialState: function () {
    return {
      tasks: [
        { text: "Hello World", completed: false },
        { text: "Flux", completed: false },
        { text: "ReactJS", completed: false },
        { text: "AngularJS", completed: true },
      ],
    };
  },
  addTask: function (task) {
    if (task.text) {
      this.state.tasks.push(task);
      this.setState(this.state);
    }
  },
  removeTask: function (index) {
    if (index >= 0 && this.state.tasks.length > 0) {
      this.state.tasks.splice(index, 1);
      this.setState(this.state);
    }
  },
  taskAction: function (index) {
    this.state.tasks[index].completed = !this.state.tasks[index].completed;
    this.setState(this.state);
  },
  render: function () {
    return (
      <div>
        <ToDoForm action={this.addTask} />
        <ToDoList
          tasks={this.state.tasks}
          removeTask={this.removeTask}
          taskAction={this.taskAction}
        />
      </div>
    );
  },
});
var ToDoForm = React.createClass({
  handleAdd: function () {
    var task = { text: this.refs.task.value, completed: false };
    this.props.action(task);
  },
  render: function () {
    return (
      <div className="jumbotron">
        <form>
          <div className="row">
            <div className="col-md-9">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Task"
                  ref="task"
                />
              </div>
            </div>
            <div className="col-md-3">
              <button
                type="button"
                onClick={this.handleAdd}
                className="btn btn-primary btn-block"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  },
});
var TaskAction = React.createClass({
  getButton: function () {
    if (!this.props.completed) {
      return (
        <button
          type="button"
          onClick={this.props.setStatus.bind(this, this.props.index)}
          className="btn btn-xs btn-success"
        >
          <i className="glyphicon glyphicon-ok"></i>
        </button>
      );
    } else {
      return (
        <button
          type="button"
          onClick={this.props.setStatus.bind(this, this.props.index)}
          className="btn btn-xs btn-info"
        >
          <i className="glyphicon glyphicon-repeat"></i>
        </button>
      );
    }
  },
  render: function () {
    return (
      <div className="btn-group btn-group-xs pull-right" role="group">
        {this.getButton()}
        <button
          type="button"
          onClick={this.props.remove.bind(this, this.props.index)}
          className="btn btn-xs btn-danger"
        >
          <i className="glyphicon glyphicon-remove"></i>
        </button>
      </div>
    );
  },
});
var ToDoList = React.createClass({
  render: function () {
    return (
      <div className="row">
        <div className="col-lg-12">
          <h4>Tasks</h4>
          <hr />
          <ul className="list-group">
            {this.props.tasks.map(function (task, index) {
              var cssClass = "list-group-item list-group-item-";
              if (task.completed) {
                cssClass += "info";
              } else {
                cssClass += "success";
              }
              return (
                <li key={index} className={cssClass}>
                  <TaskAction
                    index={index}
                    completed={task.completed}
                    setStatus={this.props.taskAction}
                    remove={this.props.removeTask}
                  />
                  {task.text}
                </li>
              );
            }, this)}
          </ul>
        </div>
      </div>
    );
  },
});

ReactDOM.render(<App />, document.getElementById("container"));
