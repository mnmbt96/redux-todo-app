// const exampleState = {
//   todos: [
//     {
//       id: "001",
//       text: "HTML",
//       completed: true,
//       status: "Completed",
//       due: "2022-10-31",
//     },
//     {
//       id: "002",
//       text: "JavaScript",
//       completed: false,
//       status: "Pending",
//       due: "2023-1-31",
//     },
//     {
//       id: "003",
//       text: "React",
//       completed: false,
//       status: "In Progress",
//       due: "2023-5-12",
//     },
//     {
//       id: "004",
//       text: "Redux",
//       completed: false,
//       status: "In Progress",
//       due: "2023-5-12",
//     },
//     {
//       id: "005",
//       text: "Node.js",
//       completed: false,
//       status: "New",
//       due: "2023-6-30",
//     },
//   ],
//   sortedTodos: [
//     {
//       id: "001",
//       text: "HTML",
//       completed: true,
//       status: "Completed",
//       due: "2022-10-31",
//     },
//     {
//       id: "002",
//       text: "JavaScript",
//       completed: false,
//       status: "Pending",
//       due: "2023-1-31",
//     },
//     {
//       id: "003",
//       text: "React",
//       completed: false,
//       status: "In Progress",
//       due: "2023-5-12",
//     },
//     {
//       id: "004",
//       text: "Redux",
//       completed: false,
//       status: "In Progress",
//       due: "2023-5-12",
//     },
//     {
//       id: "005",
//       text: "Node.js",
//       completed: false,
//       status: "New",
//       due: "2023-6-30",
//     },
//   ],
//   sortStatus: "All",
// };

const initialState = {
  todos: [], // 全てのtodoを格納する
  sortedTodos: [], // sortして表示するtodoのみを格納
  sortStatus: "All", // 画面上の現在のstatus
};

function rootReducer(state = initialState, action) {
  let sortArr = [];
  let newTodos = [];

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
      return {
        todos: [...state.todos, action.payload],
        sortedTodos: sortArr,
        sortStatus: action.sortStatus,
      };
    case "DELETE_TODO":
      console.log("id: " + action.payload.id);

      newTodos = state.todos.filter((todo) => todo.id !== action.payload.id);

      return {
        todos: newTodos,
        sortedTodos:
          action.sortStatus === "All"
            ? [...newTodos]
            : newTodos.filter((todo) => todo.status === action.sortStatus),
        sortStatus: action.sortStatus,
      };

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

      return {
        todos: newTodos,
        sortedTodos:
          action.sortStatus === "All"
            ? [...newTodos]
            : newTodos.filter((todo) => todo.status === action.payload.status),
        sortStatus: action.sortStatus,
      };

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

      return {
        todos: newTodos,
        sortedTodos:
          action.sortStatus === "All"
            ? [...newTodos]
            : newTodos.filter((todo) => todo.status === action.sortStatus),
        sortStatus: action.sortStatus,
      };

    case "CHANGE_SORT_STATUS":
      return {
        todos: [...state.todos],
        sortedTodos:
          action.payload === "All"
            ? [...state.todos]
            : state.todos.filter((todo) => todo.status === action.payload),
        sortStatus: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
