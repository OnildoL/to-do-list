import { Trash, Circle, CheckCircle } from "phosphor-react";
import styles from "./Task.module.css";

interface TaskProps {
  task: {
    id: number;
    description: string;
    completed: boolean;
  };
  onDeleteComment: (taskToDelete: number) => void;
  onMarkTaskasComplete: (taskToMarkasComplete: number) => void;
}

export function Task({
  task,
  onDeleteComment,
  onMarkTaskasComplete,
}: TaskProps) {
  const isTaskCompleted = !task.completed;
  const setCircleStyleType = isTaskCompleted
    ? ["bg_tasks", "content_tasks"]
    : ["bg_tasks_completed", "content_tasks_completed"];

  function handleDeleteComment(taskToDelete: number) {
    onDeleteComment(taskToDelete);
  }

  function handleMarkTaskasComplete(taskToMarkasComplete: number) {
    onMarkTaskasComplete(taskToMarkasComplete);
  }

  return (
    <div className={styles.container_tasks}>
      <div className={styles[setCircleStyleType[0]]} key={task.id}>
        <div className={styles[setCircleStyleType[1]]}>
          <div>
            <i>
              {isTaskCompleted && (
                <Circle
                  size={20}
                  weight="light"
                  onClick={() => handleMarkTaskasComplete(task.id)}
                />
              )}
              {!isTaskCompleted && (
                <CheckCircle
                  size={20}
                  weight="fill"
                  onClick={() => handleMarkTaskasComplete(task.id)}
                />
              )}
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
    </div>
  );
}
