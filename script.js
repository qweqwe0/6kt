
class TodoList extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });


    this.tasks = [];

    this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: block;
        max-width: 400px;
        margin: 0 auto;
        border: 1px solid #ddd;
        padding: 16px;
      }

      form {
        display: flex;
        gap: 8px;
        margin-bottom: 16px;
      }

      input[type="text"] {
        flex: 1;
        padding: 8px;
        font-size: 14px;
        border: 1px solid #e8e8e8;
        border-radius: 4px;
      }

      button {
        padding: 8px 12px;
        background-color: #ebd5e9;
        color: gray;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      button.delete {
        background-color: #331831;
        color: white;
      }

      ul {
        list-style-type: none;
        padding: 0;
      }

      li {
        display: flex;
        justify-content: space-between;
        padding: 8px;
        border-bottom: 1px solid #ddd;
        align-items: center;
      }

      li.completed {
        text-decoration: line-through;
        color: #331831;
      }

      .task {
        flex: 1;
        cursor: pointer;
      }

      .task.completed {
        text-decoration: line-through;
        color: #331831;
      }
    </style>
    <form id="task-form">
      <input type="text" id="task-input" placeholder="Введите задачу" required>
      <button type="submit">Добавить</button>
    </form>
    <ul id="task-list">
      </ul>
  `;

    this.form = this.shadowRoot.querySelector("#task-form");
    this.input = this.shadowRoot.querySelector("#task-input");
    this.taskList = this.shadowRoot.querySelector("#task-list");

    this.form.addEventListener("submit", (e) => this.addTask(e));
  }

  addTask(event) {
    event.preventDefault();

    const taskText = this.input.value.trim();
    if (taskText === "") return;

    this.tasks.push({ text: taskText, completed: false });
    this.updateList();
    this.input.value = "";
  }

  updateList() {
    const fragment = document.createDocumentFragment();

    this.taskList.innerHTML = "";

    this.tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";

      const taskSpan = document.createElement("span");
      taskSpan.className = "task" + (task.completed ? " completed" : "");
      taskSpan.textContent = task.text;
      taskSpan.addEventListener("click", () => this.toggleTask(index));

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Удалить";
      deleteButton.className = "delete";
      deleteButton.addEventListener("click", () =>
        this.deleteTask(index)
      );

      li.appendChild(taskSpan);
      li.appendChild(deleteButton);

      fragment.appendChild(li);
    });
    this.taskList.appendChild(fragment);
  }

  toggleTask(index) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.updateList();
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.updateList();
  }
}

customElements.define("todo-list", TodoList);
