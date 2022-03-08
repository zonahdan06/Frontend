import "./SignUp.css";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser, loginDupUser } from "../../_actions/user_action";

const SignUp = props => {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onIdHandler = event => {
    setId(event.currentTarget.value);
  };
  const onPwHandler = event => {
    setPassword(event.currentTarget.value);
  };
  const onEmailHandler = event => {
    setEmail(event.currentTarget.value);
  };
  const onConfirmPwHandler = event => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = event => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let body = {
      id: Id,
      password: Password,
      email: Email
    };
    dispatch(registerUser(body)).then(response => {
      if (response.payload.success) {
        navigate("/login");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    });
  };

  const onDuplicateHandler = event => {
    event.preventDefault();

    let body = {
      id: Id
    };
    ///api/users/loginDup
    dispatch(loginDupUser(body)).then(response => {
      if (response.payload.loginSuccess) {
        alert("이미 존재하는 아이디입니다.");
      } else {
        alert("사용 가능한 아이디입니다.");
      }
    });
  };

  const navigate = useNavigate();

  return (
    <div className="SignUp">
      <div className="LoginForm">
        <form onSubmit={onSubmitHandler}>
          <div className="idDiv">
            <input
              type="id"
              value={Id}
              onChange={onIdHandler}
              className="id"
              name="id"
              size="20"
              placeholder="아이디"
            ></input>
          </div>
          <div className="pwDiv">
            <input
              type="password"
              value={Password}
              onChange={onPwHandler}
              className="pw"
              name="pw"
              size="20"
              placeholder="비밀번호"
            ></input>
          </div>
          <div className="pwDiv">
            <input
              type="password"
              value={ConfirmPassword}
              onChange={onConfirmPwHandler}
              className="pw"
              name="pw2"
              size="20"
              placeholder="비밀번호 확인"
            ></input>
          </div>
          <div className="emailDiv">
            <input
              type="email"
              value={Email}
              onChange={onEmailHandler}
              className="email"
              name="email"
              size="20"
              placeholder="이메일"
            ></input>
          </div>
          <div>
            <button type="submit" className="bt_login">
              가입하기
            </button>
          </div>
        </form>
      </div>
      <div>
        <button className="bt_dup" onClick={onDuplicateHandler}>
          중복확인
        </button>
      </div>
    </div>
  );
};
export default SignUp;
