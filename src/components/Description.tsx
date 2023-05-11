import { ChangeEvent, InvalidEvent, FormEvent } from "react";
import { PlusCircle } from "phosphor-react";
import styles from "./Description.module.css";

interface DescriptionProps {
  description: string;
  onCreateNewTask: (event: FormEvent) => void;
  onNewDescriptionChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Description({
  description,
  onCreateNewTask,
  onNewDescriptionChange,
}: DescriptionProps) {
  function handleCreateNewTask(event: FormEvent) {
    onCreateNewTask(event);
  }

  function handleNewDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
    onNewDescriptionChange(event);
  }

  function handleNewDescriptionInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  const isNewDescriptionEmpty = description === "";

  return (
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
  );
}
