import { useState, ChangeEvent, FormEvent } from "react";
import { ClipboardText } from "phosphor-react";
import { Description } from "./Description";
import { Summary } from "./Summary";
import { Task } from "./Task";
import styles from "./Panel.module.css";

interface TaskProps {
  id: number;
  description: string;
  completed: boolean;
}

export function Panel() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [description, setDescription] = useState("");

  function createNewTask(event: FormEvent) {
    event.preventDefault();
    const newTask = {
      id: totalTasksRegistered + 1,
      description,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setDescription("");
  }

  function newDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }

  function deleteComment(taskToDelete: number) {
    const tasksWithoutDeletedOne = tasks.filter(
      (task) => task.id !== taskToDelete
    );
    setTasks(tasksWithoutDeletedOne);
  }

  function markTaskasComplete(taskToMarkasComplete: number) {
    const taskComplete = tasks.map((task) => {
      if (task.id === taskToMarkasComplete) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(taskComplete);
  }

  const totalTasksRegistered = tasks.length;
  const totalTasksCompleted = tasks.filter((task) => task.completed).length;
  const isTasksEmpty = tasks.length === 0;

  return (
    <main>
      <Description
        description={description}
        onCreateNewTask={createNewTask}
        onNewDescriptionChange={newDescriptionChange}
      />

      <Summary
        totalTasksRegistered={totalTasksRegistered}
        totalTasksCompleted={totalTasksCompleted}
      />

      {isTasksEmpty && (
        <div className={styles.container_zero_tasks}>
          <div className={styles.no_chores_around_here}>
            <i>
              <ClipboardText size={56} weight="thin" />
            </i>
            <div>
              <strong>
                <p>Você ainda não tem tarefas cadastradas</p>
              </strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          </div>
        </div>
      )}

      {!isTasksEmpty &&
        tasks.map((task) => {
          return (
            <Task
              task={task}
              onDeleteComment={deleteComment}
              onMarkTaskasComplete={markTaskasComplete}
            />
          );
        })}
    </main>
  );
}
