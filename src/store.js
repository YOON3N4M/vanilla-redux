import { legacy_createStore as createStore } from "redux";
import { createAction } from "@reduxjs/toolkit";
//액션 타입( redux-toolkit 적용전)
/*const ADD = "ADD";
const DELETE = "DELETE";
*/
//액션 크리에이터 (redux-toolkit 적용전)
/* const addTodo = (text) => {
  return {
    type: ADD,
    text,
  };
};

const deleteTodo = (id) => {
  return {
    type: DELETE,
    id: parseInt(id),
  };
};
*/

//액션 크리에이터, 액션 타입(redux-toolkit 적용후)

const addTodo = createAction("ADD");
const deleteTodo = createAction("DELETE");

//리듀서
const reducer = (state = [], action) => {
  switch (action.type) {
    case addTodo.type:
      return [{ text: action.payload, id: Date.now() }, ...state];
    case deleteTodo.type:
      return state.filter((toDo) => toDo.id !== action.payload);
    default:
      return state;
  }
};

const store = createStore(reducer);

export const actionCreators = {
  addTodo,
  deleteTodo,
};

export default store;
