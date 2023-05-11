import styles from "./Panel.module.css";

interface PanelProps {
  totalTasksRegistered: number;
  totalTasksCompleted: number;
}

export function Panel({
  totalTasksRegistered,
  totalTasksCompleted,
}: PanelProps) {
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div>
          <span className={styles.tasks_created}>Tarefas criadas</span>
          <span className={styles.amount_of_tasks}>{totalTasksRegistered}</span>
        </div>
        <div>
          <span className={styles.completed}>Concluídas</span>
          <span className={styles.amount_of_tasks}>
            {totalTasksCompleted} de {totalTasksRegistered}
          </span>
        </div>
      </div>
    </div>
  );
}
