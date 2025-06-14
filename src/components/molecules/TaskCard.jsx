import React from "react";
import Button from "../atoms/Button";
import ImageWithFallback from "../atoms/ImageWithFallback";

const TaskCard = ({ task, onDelete }) => (
  <div className="bg-white rounded shadow p-4 flex flex-col h-full">
    <div className="font-bold text-lg mb-2 break-words">{task.title}</div>
    <div className="mb-2">Награда: {task.reward}</div>
    <div className="mb-2">Тип: {task.task_type}</div>
    <div className="mb-2 break-all">
      Ссылка: <a href={task.link} className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">{task.link}</a>
    </div>
    {task.image && (
      <div className="mb-2 flex-shrink-0">
        <ImageWithFallback
          src={typeof task.image === "string" && task.image.startsWith("http") ? task.image : `https://quackit.ru:8443/images/tasks/${task.image}`}
          alt={task.title}
          className="w-32 h-32 object-contain"
        />
      </div>
    )}
    <div className="mt-auto pt-4 flex gap-2">
      <Button onClick={() => onDelete(task.id)} className="bg-red-600 text-white">Удалить</Button>
    </div>
  </div>
);

export default TaskCard; 