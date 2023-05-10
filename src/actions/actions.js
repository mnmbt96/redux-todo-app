export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const SORT_BY_STATUS = "SORT_BY_STATUS";
export const CHANGE_SORT_STATUS = "CHANGE_SORT_STATUS";

export function addTodo(data, sortStatus) {
  return { type: ADD_TODO, payload: data, sortStatus };
}

export function deleteTodo(id, sortStatus) {
  return { type: DELETE_TODO, payload: { id }, sortStatus };
}

export function toggleTodo(id, status, sortStatus) {
  return { type: TOGGLE_TODO, payload: { id, status }, sortStatus };
}

export function editTodo(data, sortStatus) {
  return { type: EDIT_TODO, payload: data, sortStatus };
}

export function changeSortStatus(status) {
  return { type: "CHANGE_SORT_STATUS", payload: status };
}
