import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreators } from "../store";

function Details({ toDos, onBtnClick }) {
  const deatailsId = useParams().id;
  const toDo = toDos.find((toDo) => toDo.id === parseInt(deatailsId));
  const navigate = useNavigate();

  const handleDel = () => {
    onBtnClick(deatailsId); //이부분과 (31행)
    navigate("/");
  };

  return (
    <>
      <h1>{toDo?.text}</h1>
      <h5>Created at: {toDo?.id}</h5>
      <button onClick={handleDel}>Del</button>
    </>
  );
}

function mapStateToProps(state) {
  return { toDos: state };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onBtnClick: (id) => {
      //이 부분 주목
      console.log(id);
      dispatch(actionCreators.deleteTodo(id));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Details);
