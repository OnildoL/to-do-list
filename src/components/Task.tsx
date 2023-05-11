import { useState, ChangeEvent, FormEvent } from "react";
import { Trash, Circle, CheckCircle, ClipboardText } from "phosphor-react";
import { Description } from "./Description";
import { Panel } from "./Panel";
import styles from "./Task.module.css";

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

export function Task() {
  const [tasks, setTasks] = useState<Task[]>([]);
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

  return (
    <main>
      <Description
        description={description}
        onCreateNewTask={createNewTask}
        onNewDescriptionChange={newDescriptionChange}
      />

      <Panel
        totalTasksRegistered={totalTasksRegistered}
        totalTasksCompleted={totalTasksCompleted}
      />

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
