import "./App.css";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  faTrashCan,
  faPenToSquare,
  faCircleCheck,
  faPersonDigging,
  faSpinner,
  faList,
  faBell,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import {
  addTodo,
  changeSortStatus,
  deleteTodo,
  editTodo,
  toggleTodo,
} from "./actions/actions";

function App() {
  const todos = useSelector((state) => state.todos);
  const sortStatus = useSelector((state) => state.sortStatus);
  const inputRef = useRef(null);
  const dateRef = useRef(null);
  const editInputRef = useRef(null);
  const editDateRef = useRef(null);
  const editStatusRef = useRef(null);
  const dispatch = useDispatch();
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedTodos = useSelector((state) => state.sortedTodos).sort((a, b) => {
    if (a.due === "TBD") return 1;
    if (b.due === "TBD") return -1;
    return new Date(a.due) - new Date(b.due);
  });

  console.log(sortedTodos);

  const handleAddTodo = () => {
    if (inputRef.current.value.trim() !== "") {
      const newTodo = {
        id: uuidv4(),
        text: inputRef.current.value,
        completed: false,
        status: "New",
        due: dateRef.current.value || "TBD",
      };
      dispatch(addTodo(newTodo, sortStatus));
      inputRef.current.value = "";
      dateRef.current.value = "";
    }
  };

  const handleDelete = (id, sortStatus) => {
    dispatch(deleteTodo(id, sortStatus));
    handleModalClose();
  };

  const handleToggleTodo = (id, status, sortStatus) => {
    dispatch(toggleTodo(id, status, sortStatus));
  };

  const handleEditClick = (id, sortStatus) => {
    setEditingTodoId(id, sortStatus);
  };

  const handleEditTodo = (
    id,
    text,
    completed,
    status = "New",
    due,
    sortStatus
  ) => {
    if (editInputRef.current.value.trim() !== "") {
      dispatch(
        editTodo(
          {
            id,
            text,
            completed,
            status,
            due,
          },
          sortStatus
        )
      );
      setEditingTodoId(null);
    }
  };

  const handleChangeSortStatus = (status) => {
    dispatch(changeSortStatus(status));
  };

  const getDueDate = (dueDateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dueDateString);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return { color: { color: "#DF7704" }, warning: "Today" };
    } else if (diffDays < 0) {
      return { color: { color: "#b63c46" }, warning: "Over Due" };
    } else if (diffDays === 1) {
      return { color: { color: "#DF7704" }, warning: "Tomorrow" };
    } else if (diffDays === 2) {
      return { color: { color: "#DF7704" }, warning: `${diffDays} Days` };
    } else if (diffDays <= 7) {
      return { color: { color: "#0066cc" }, warning: `${diffDays} Days` };
    } else if (diffDays > 7) {
      return { color: { color: " #2E8B57" }, warning: `${diffDays} Days` };
    } else if (diffDays !== Number) {
      return { color: { color: " #2E8B57" }, warning: "" };
    }
  };

  const customStyle = (completed, due) => {
    if (completed) {
      return { color: "#374a61da", backgroundColor: "#374a6151" };
    } else if (!completed && getDueDate(due).warning === "Over Due") {
      return { border: "1px solid #b63c46" };
    } else {
      return null;
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // const SORT_OPTIONS = [
  //   { label: "All", value: "All", icon: faList },
  //   { label: "New", value: "New", icon: faBell },
  //   { label: "In Progress", value: "In Progress", icon: faPersonDigging },
  //   { label: "Completed", value: "Completed", icon: faCircleCheck },
  //   { label: "Pending", value: "Pending", icon: faSpinner },
  // ];

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const todaysUncompletedNumber = todos.filter(
    (todo) => !todo.completed && todo.due === formattedDate
  ).length;

  const getUncompletedStatement = () => {
    if (todaysUncompletedNumber === 0) {
      return " no task ";
    } else if (todaysUncompletedNumber === 1) {
      return " task ";
    } else {
      return " tasks ";
    }
  };

  return (
    <div className="App">
      <h1 className="title">Todo App</h1>
      <div className="input-todo-area">
        <input
          className="input-todo"
          type="text"
          ref={inputRef}
          placeholder="Enter todo..."
        />
        <input className="input-date" type="date" ref={dateRef} />
        <button className="btn-add-todo" onClick={handleAddTodo}>
          Add
        </button>
      </div>
      <div>
        ------ Today, you have{" "}
        <span className="num-task">
          {todaysUncompletedNumber > 0 ? todaysUncompletedNumber : null}
        </span>
        {getUncompletedStatement()}due! ------
      </div>

      <div className="sort-index">
        <div className="dropdown-wrapper">
          <select
            name="status"
            id="dropdown-index"
            value={sortStatus}
            onChange={(event) => handleChangeSortStatus(event.target.value)}
          >
            <option value="All">All</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div className="button-wrapper">
          <button
            className={`index ${sortStatus === "All" ? "active-index" : ""}`}
            onClick={() => handleChangeSortStatus("All")}
          >
            <FontAwesomeIcon className="index-icon" icon={faList} />
            All
          </button>
          <span className="index-border">|</span>
          <button
            className={`index ${sortStatus === "New" ? "active-index" : ""}`}
            onClick={() => handleChangeSortStatus("New")}
          >
            <FontAwesomeIcon className="index-icon" icon={faBell} />
            New
          </button>
          <span className="index-border">|</span>
          <button
            className={`index ${
              sortStatus === "In Progress" ? "active-index" : ""
            }`}
            onClick={() => handleChangeSortStatus("In Progress")}
          >
            <FontAwesomeIcon className="index-icon" icon={faPersonDigging} />
            In Progress
          </button>
          <span className="index-border">|</span>
          <button
            className={`index ${
              sortStatus === "Completed" ? "active-index" : ""
            }`}
            onClick={() => handleChangeSortStatus("Completed")}
          >
            <FontAwesomeIcon className="index-icon" icon={faCircleCheck} />
            Completed
          </button>
          <span className="index-border">|</span>
          <button
            className={`index ${
              sortStatus === "Pending" ? "active-index" : ""
            }`}
            onClick={() => handleChangeSortStatus("Pending")}
          >
            <FontAwesomeIcon className="index-icon" icon={faSpinner} />
            Pending
          </button>
        </div>
      </div>

      {sortedTodos &&
        sortedTodos.map((todo) => {
          if (editingTodoId === todo.id) {
            return (
              <div className="edit-input-area" key={todo.id}>
                <input
                  className="input-edit-todo"
                  type="text"
                  placeholder="Enter todo..."
                  defaultValue={todo.text}
                  ref={editInputRef}
                />
                <select
                  name="status"
                  id="select-status"
                  defaultValue={todo.status}
                  ref={editStatusRef}
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
                <input
                  className="input-edit-date"
                  type="date"
                  defaultValue={todo.due}
                  ref={editDateRef}
                />
                <button
                  className="btn-confirm"
                  onClick={() =>
                    handleEditTodo(
                      todo.id,
                      editInputRef.current.value,
                      todo.completed,
                      editStatusRef.current.value,
                      editDateRef.current.value || "TBD",
                      sortStatus
                    )
                  }
                >
                  Confirm
                </button>
              </div>
            );
          } else {
            return (
              <div
                className="todo-list"
                key={todo.id}
                style={customStyle(todo.completed, todo.due)}
              >
                <div className="checkbox-text">
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() =>
                      handleToggleTodo(todo.id, todo.status, sortStatus)
                    }
                  />
                  <p
                    className={`text ${todo.completed ? "completed-todo" : ""}`}
                  >
                    {todo.text}
                  </p>
                </div>
                <div className="status-due">
                  <p className="status">{todo.status}</p>
                  <div className="due-area">
                    <p
                      className="due-warning"
                      style={getDueDate(todo.due).color}
                    >
                      {todo.completed ? "" : getDueDate(todo.due).warning}
                    </p>
                    <p className="due">{todo.due}</p>
                  </div>
                </div>

                <div className="buttons">
                  <button
                    className="btn-edit"
                    onClick={() => handleEditClick(todo.id)}
                  >
                    <FontAwesomeIcon
                      className="icon"
                      icon={faPenToSquare}
                      style={{ margin: "0", color: "#374a61" }}
                    />
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleModalOpen()}
                  >
                    <FontAwesomeIcon
                      className="icon"
                      icon={faTrashCan}
                      style={{ margin: "0", color: "#374a61" }}
                    />
                  </button>
                </div>

                {isModalOpen && (
                  <Modal
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={isModalOpen}
                    onHide={() => setIsModalOpen(false)}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        <FontAwesomeIcon
                          style={{ color: "#374a61" }}
                          icon={faTriangleExclamation}
                        />
                        Warning
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>Are you sure you want to delete?</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        className="modal-btn btn-yes"
                        onClick={() => handleDelete(todo.id, sortStatus)}
                      >
                        Yes
                      </Button>
                      <Button
                        className="modal-btn btn-no"
                        onClick={() => setIsModalOpen(false)}
                      >
                        No
                      </Button>
                    </Modal.Footer>
                  </Modal>
                )}
              </div>
            );
          }
        })}
    </div>
  );
}

export default App;
