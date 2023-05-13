const initialState = JSON.parse(localStorage.getItem("todoState"));

function rootReducer(state = initialState, action) {
  let sortArr = [];
  let newTodos = [];
  console.log("state", state);

  switch (action.type) {
    case "ADD_TODO":
      // 画面がAllを表示しているとき、新規todoを含めすべてのtodoを表示する
      //     => todosにaction.payloadを足したもの
      if (action.sortStatus === "All") {
        sortArr = [...state.todos, action.payload];
        // 画面がNewを表示しているとき、todoが追加される時のデフォルトのステータスはNewだから新規todoも画面に表示する
        //     => filterでtodosの中からNewのものを抽出し、action.payloadを足す。
      } else if (action.sortStatus === "New") {
        sortArr = [
          ...state.todos.filter((todo) => todo.status === "New"),
          action.payload,
        ];
        // 上記以外の画面の時、新規todoは表示させず、todosの中だけ
        //     => filterでtodosの中から現在の画面上のstatusと一致するものだけを抽出
      } else {
        sortArr = [
          ...state.todos.filter((todo) => todo.status === action.sortStatus),
        ];
      }
      // addTodoを呼び出した後のstoreの値
      const addTodoState = {
        todos: [...state.todos, action.payload],
        sortedTodos: sortArr,
        sortStatus: action.sortStatus,
      };

      localStorage.setItem("todoState", JSON.stringify(addTodoState));
      return addTodoState;

    case "DELETE_TODO":
      newTodos = state.todos.filter((todo) => todo.id !== action.payload.id);

      const deleteTodoState = {
        todos: newTodos,
        sortedTodos:
          action.sortStatus === "All"
            ? [...newTodos]
            : newTodos.filter((todo) => todo.status === action.sortStatus),
        sortStatus: action.sortStatus,
      };

      localStorage.setItem("todoState", JSON.stringify(deleteTodoState));
      return deleteTodoState;

    case "TOGGLE_TODO":
      newTodos = state.todos.map((todo) => {
        return todo.id == action.payload.id
          ? {
              ...todo,
              completed: !todo.completed,
              status:
                action.payload.status === "Completed" ? "New" : "Completed",
            }
          : todo;
      });

      const toggleTodoState = {
        todos: newTodos,
        sortedTodos:
          action.sortStatus === "All"
            ? [...newTodos]
            : newTodos.filter((todo) => todo.status === action.payload.status),
        sortStatus: action.sortStatus,
      };

      localStorage.setItem("todoState", JSON.stringify(toggleTodoState));
      return toggleTodoState;

    case "EDIT_TODO":
      newTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            text: action.payload.text,
            completed: action.payload.status === "Completed" ? true : false,
            status: action.payload.status,
            due: action.payload.due,
          };
        }
        return todo;
      });

      const editTodoState = {
        todos: newTodos,
        sortedTodos:
          action.sortStatus === "All"
            ? [...newTodos]
            : newTodos.filter((todo) => todo.status === action.sortStatus),
        sortStatus: action.sortStatus,
      };
      localStorage.setItem("todoState", JSON.stringify(editTodoState));
      return editTodoState;

    case "CHANGE_SORT_STATUS":
      const changeSortStatusState = {
        todos: [...state.todos],
        sortedTodos:
          action.payload === "All"
            ? [...state.todos]
            : state.todos.filter((todo) => todo.status === action.payload),
        sortStatus: action.payload,
      };

      localStorage.setItem("todoState", JSON.stringify(changeSortStatusState));
      return changeSortStatusState;

    default:
      return state;
  }
}

export default rootReducer;
