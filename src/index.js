import { legacy_createStore as createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

//액션을 단순한 문자열이 아닌 아래와 같이 변수에 할당 해주면 오류를 잡아내기에 훨씬 용이하다. (안전성)
const ADD = "ADD";
const MINUS = "MINUS";

//리듀서에는 if문 보다 switch문을 쓰는 것이 조금 더 간결하고 깔끔한 코딩이 가능하다.
const countModifier = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

const countStore = createStore(countModifier);
number.innerText = countStore.getState();
const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);

add.addEventListener("click", () => countStore.dispatch({ type: ADD }));
minus.addEventListener("click", () => countStore.dispatch({ type: MINUS }));
