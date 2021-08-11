import React, { useState } from "react";
import "./addTask.css";
import taskData from "../data.json";
// import taskData from "../shortdata.json";

var today = new Date();
  // day = 1000 * 60 * 60 * 24;

// Set to 00:00:00:000 today
today.setUTCHours(0);
today.setUTCMinutes(0);
today.setUTCSeconds(0);
today.setUTCMilliseconds(0);
today = today.getTime();
var taskType = ["Project", "Task"];
function AddTask({ setData, showHidePopup, parents }) {
  let owners = taskData.map((x, i) => {
    return x.owner;
  });
  parents = [...new Set(parents)];
  owners = [...new Set(owners)];
  const [validation, setValidation] = useState({
    projectName: false,
    taskName: false,
  });

  // var StartDay = new Date();
  // var EndDay = new Date().getDate();
  // console.log(EndDay);
  const [task, setTask] = useState({
    projectName: "",
    taskName: "",
    taskType: taskType[0],
    parent: parents[1],
    milestone: false,
    owner: owners[0],
    collapsed: false,
    start: new Date().getTime(),
    end: new Date().getTime() + 86400000 * 2,
  });

  return (
    <div className="form-popup">
      <div className="overlay">
        <div>
          <h3>Add New Task</h3>
          {validation.projectName && (
            <div className="error-messange">Please Add Project Name</div>
          )}
          {validation.taskName && (
            <div className="error-messange">Please Add Task Name</div>
          )}
          <label>
            Type
            <select
              onChange={(e) => setTask({ ...task, taskType: e.target.value })}
            >
              {taskType.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            {task.taskType === "Project" ? "Project Name" : "Task Name "}
            <input
              type="text"
              value={
                task.taskType === "Project" ? task.projectName : task.taskName
              }
              onChange={(e) => {
                const newTask = { ...task };
                if (task.taskType === "Project") {
                  newTask.projectName = e.target.value;
                } else {
                  newTask.taskName = e.target.value;
                }
                setTask(newTask);
              }}
            />
          </label>

          {task.taskType === "Project" && (
            <label>
              Task Name
              <input
                type="text"
                value={task.taskName}
                onChange={(e) => setTask({ ...task, taskName: e.target.value })}
              />
            </label>
          )}

          {task.taskType !== "Project" && (
            <label>
              Parent
              <select
                onChange={(e) => setTask({ ...task, parent: e.target.value })}
              >
                {parents.map(
                  (opt) =>
                    opt !== undefined && (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    )
                )}
              </select>
            </label>
          )}

          <label>
            Select Owner
            <select
              onChange={(e) => setTask({ ...task, owner: e.target.value })}
            >
              {owners.map(
                (opt) =>
                  opt !== undefined && (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  )
              )}
            </select>
          </label>

          <label>
            Milestone
            <input
              type="checkbox"
              value={task.milestone}
              onChange={(e) =>
                setTask({ ...task, milestone: e.target.checked })
              }
            />
          </label>

          <label>
            Start Date
            <input
              type="date"
              min={new Date().toISOString().substring(0, 10)}
              value={new Date(task.start).toISOString().substring(0, 10)}
              onChange={(e) => {
                setTask({
                  ...task,
                  start: new Date(e.target.value).getTime(),
                });
              }}
            />
          </label>

          <label>
            End Date
            <input
              type="date"
              min={new Date(task.start).toISOString().substring(0, 10)}
              value={new Date(task.end).toISOString().substring(0, 10)}
              onChange={(e) => {
                setTask({ ...task, end: new Date(e.target.value).getTime() });
              }}
            />
          </label>
          <button
            className="btn"
            onClick={() => {
              if (task.taskType === "Project") {
                if (task.projectName !== "" && task.taskName !== "") {
                  setData(task);
                } else {
                  setValidation({
                    ...validation,
                    projectName: true,
                    taskName: true,
                  });
                }
              } else {
                if (task.taskName !== "") {
                  setData(task);
                } else {
                  setValidation({
                    ...validation,
                    taskName: true,
                  });
                }
              }
            }}
          >
            Add
          </button>
          <button
            className="btn cancel"
            onClick={() => {
              showHidePopup(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddTask;
