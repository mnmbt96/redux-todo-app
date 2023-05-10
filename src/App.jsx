import "./App.css";
import AddTodo from "./store/components/AddTodo";
import Todo from "./store/components/Todo";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import StatusIndex from "./store/components/StatusIndex";

function App() {
  const todos = useSelector((state) => state.todos);
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
      <AddTodo />
      <div>
        ------ Today, you have{" "}
        <span className="num-task">
          {todaysUncompletedNumber > 0 ? todaysUncompletedNumber : null}
        </span>
        {getUncompletedStatement()}due! ------
      </div>
      <StatusIndex />
      <Todo />
    </div>
  );
}

export default App;
