import React, { useEffect } from "react";
import Button from "../components/atoms/Button";
import Modal from "../components/molecules/Modal";
import TaskList from "../components/organisms/TaskList";
import TaskForm from "../components/molecules/TaskForm";
import { useTasks } from "../hooks/useTasks";

const TasksPage = () => {
  const {
    tasks,
    loading,
    error,
    showModal,
    form,
    modalError,
    openModal,
    closeModal,
    handleChange,
    handleSubmit,
    handleDelete,
    fetchTasks,
  } = useTasks();

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Задания</h1>
      <div className="mb-4">
        <Button onClick={openModal} className="bg-blue-600 text-white">Создать задание</Button>
      </div>
      {loading && <div>Загрузка...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {!loading && !error && <TaskList tasks={tasks} onDelete={handleDelete} />}
      <Modal
        open={showModal}
        onClose={closeModal}
        title="Создать задание"
      >
        <TaskForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          error={modalError}
        />
      </Modal>
    </div>
  );
};

export default TasksPage; 