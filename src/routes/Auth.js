import React from "react";
import styled from "styled-components";
import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

const Container = styled.div`
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  padding-top: 50px;
  .social_btn_box {
    width: 80%;
    margin: 30px auto 0 auto;
    display: flex;
    flex-direction: column;
    .social_btn {
      all: unset;
      height: 50px;
      text-align: center;
      border-radius: 24px;
      cursor: pointer;
    }
    .google_btn {
      background-color: #fff;
      margin-bottom: 15px;
    }
    .github_btn {
      background-color: #fff;
    }
  }
`;
const AppTitle = styled.h1`
  font-size: 40px;
  color: #fff;
  text-align: center;
  font-weight: 900;
  margin-bottom: 15px;
  transition: all 0.4s;
  animation: neon2 1.5s ease-in-out infinite alternate;
  @keyframes neon2 {
    from {
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #228dff,
        0 0 70px #228dff, 0 0 80px #228dff, 0 0 100px #228dff, 0 0 150px #228dff;
    }
    to {
      text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #228dff,
        0 0 35px #228dff, 0 0 40px #228dff, 0 0 50px #228dff, 0 0 75px #228dff;
    }
  }
`;
const AppEmoji = styled.span`
  display: block;
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
  font-size: 50px;
`;

const Auth = () => {
  const onSocialClick = async (event) => {
    const { name } = event.target;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <Container>
      <AppTitle>MoodBox</AppTitle>
      <AppEmoji>🤔</AppEmoji>
      <AuthForm />
      <div className="social_btn_box">
        <button
          className="social_btn google_btn"
          name="google"
          onClick={onSocialClick}
        >
          <FontAwesomeIcon icon={faGoogle} /> Google
        </button>
        <button
          className="social_btn github_btn"
          name="github"
          onClick={onSocialClick}
        >
          <FontAwesomeIcon icon={faGithub} /> GitHub
        </button>
      </div>
    </Container>
  );
};
export default Auth;
