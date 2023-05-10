import { useState, ChangeEvent, FormEvent, InvalidEvent } from "react";
import {
  Trash,
  Circle,
  CheckCircle,
  ClipboardText,
  PlusCircle,
} from "phosphor-react";
import styles from "./Task.module.css";

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

export function Task() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [description, setDescription] = useState("");

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    const newTask = {
      id: totalTasksRegistered + 1,
      description,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setDescription("");
  }

  function handleNewDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }

  function handleNewDescriptionInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function handleDeleteComment(taskToDelete: number) {
    const tasksWithoutDeletedOne = tasks.filter(
      (task) => task.id !== taskToDelete
    );
    setTasks(tasksWithoutDeletedOne);
  }

  function handleMarkTaskasComplete(taskToMarkasComplete: number) {
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
  const isNewDescriptionEmpty = description === "";

  return (
    <main>
      {/* Input */}
      <form onSubmit={handleCreateNewTask} className={styles.content}>
        <input
          type="text"
          value={description}
          onChange={handleNewDescriptionChange}
          onInvalid={handleNewDescriptionInvalid}
          placeholder="Adicione uma nova tarefa"
          required
        />
        <button type="submit" disabled={isNewDescriptionEmpty}>
          Criar
          <i>
            <PlusCircle size={24} />
          </i>
        </button>
      </form>

      {/* Panel */}
      <div className={styles.container}>
        <div className={styles.panel}>
          <div>
            <span className={styles.tasks_created}>Tarefas criadas</span>
            <span className={styles.amount_of_tasks}>
              {totalTasksRegistered}
            </span>
          </div>
          <div>
            <span className={styles.completed}>Concluídas</span>
            <span className={styles.amount_of_tasks}>
              {totalTasksCompleted} de {totalTasksRegistered}
            </span>
          </div>
        </div>
      </div>

      {/* Tasks */}
      {tasks.length === 0 && (
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

      {tasks.length >= 1 && (
        <div className={styles.container_tasks}>
          {tasks.map((task) => {
            if (!task.completed) {
              return (
                <div className={styles.bg_tasks} key={task.id}>
                  <div className={styles.content_tasks}>
                    <div>
                      <i>
                        <Circle
                          size={20}
                          weight="light"
                          onClick={() => handleMarkTaskasComplete(task.id)}
                        />
                      </i>
                      {task.description}
                    </div>

                    <i className={styles.trash} title="Deletar tarefa">
                      <Trash
                        size={20}
                        onClick={() => handleDeleteComment(task.id)}
                        weight="light"
                      />
                    </i>
                  </div>
                </div>
              );
            }
            return (
              <div className={styles.bg_tasks_completed} key={task.id}>
                <div className={styles.content_tasks_completed}>
                  <div>
                    <i>
                      <CheckCircle
                        size={20}
                        weight="fill"
                        onClick={() => handleMarkTaskasComplete(task.id)}
                      />
                    </i>
                    {task.description}
                  </div>
                  <i className={styles.trash} title="Deletar tarefa">
                    <Trash
                      size={20}
                      onClick={() => handleDeleteComment(task.id)}
                      weight="light"
                    />
                  </i>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
