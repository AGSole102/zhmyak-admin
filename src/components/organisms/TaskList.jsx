import React from "react";
import TaskCard from "../molecules/TaskCard";

const TaskList = ({ tasks, onDelete }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {tasks.map((task) => (
      <TaskCard key={task.id} task={task} onDelete={onDelete} />
    ))}
  </div>
);

export default TaskList; 