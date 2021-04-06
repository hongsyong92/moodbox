import { authService } from "fbase";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  position: relative;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .auth_input {
      display: block;
      width: 80%;
      height: 50px;
      background-color: #fff;
      margin-bottom: 20px;
      border-radius: 14px;
      padding-left: 15px;
    }
    .submit_btn {
      width: 80%;
      height: 50px;
      display: block;
      background-color: #30a9de;
      text-align: center;
      border-radius: 24px;
      color: #fff;
      font-weight: 500;
      margin-top: 30px;
      cursor: pointer;
    }
  }
  .toggle_login_btn {
    display: block;
    text-align: center;
    margin: 30px 0 0 0;
    color: #fff;
    cursor: pointer;
  }
`;

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create Account
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // Log in
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Container>
        <form onSubmit={onSubmit}>
          <input
            className="auth_input email_input"
            name="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={onChange}
          />
          <input
            className="auth_input password_input"
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={onChange}
          />
          <input
            className="submit_btn"
            type="submit"
            value={newAccount ? "가입하기" : "로그인하기"}
          />
          {error}
        </form>
        <span onClick={toggleAccount} className="toggle_login_btn">
          {newAccount ? "이미 계정이 있어요" : "새로 회원 가입할래요"}
        </span>
      </Container>
    </>
  );
};
export default AuthForm;
