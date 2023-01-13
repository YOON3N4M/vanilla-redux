import { legacy_createStore as createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODOS = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = (text) => {
  return {
    type: ADD_TODOS,
    text,
  };
};

const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODOS:
      const NewToDoObj = { text: action.text, id: Date.now() };
      //return state.push(action.text); 라고 작성하면 상태 자체를 수정하는 행위이므로 redux의 특성에 반하게 된다.
      //반드시 아래처럼 새로운 상태를 리턴 해야함.
      return [NewToDoObj, ...state];
    case DELETE_TODO:
      const cleaned = state.filter((toDo) => toDo.id !== action.id);
      return cleaned;
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));
const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteTodo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteTodo(id));
};
const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = ""; // (복습) 이 부분이 없으면 전체 toDos가 리페인팅 되는 이유가 뭔지
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteTodo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
