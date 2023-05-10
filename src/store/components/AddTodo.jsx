import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTodo } from "../../actions/actions";

const AddTodo = () => {
  const inputRef = useRef(null);
  const dateRef = useRef(null);
  const sortStatus = useSelector((state) => state.sortStatus);
  const dispatch = useDispatch();

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

  return (
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
  );
};

export default AddTodo;
