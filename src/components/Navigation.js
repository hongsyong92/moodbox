import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  nav {
    max-width: 100%;
    background-color: #fff;
    padding: 0 20px;
    border-radius: 40px;
    box-shadow: 0 10px 40px rgba(159, 162, 177, 0.8);
    margin: 20px auto 0 auto;
    position: relative;
    overflow: hidden;
    ul {
      display: flex;
      align-items: center;
      .nav_item {
        color: #83818c;
        padding: 20px;
        text-decoration: none;
        transition: 0.3s;
        -webkit-transition: 0.3s;
        margin: 0 6px;
        z-index: 1;
        font-weight: 500;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 100%;
          height: 5px;
          background-color: #dfe2ea;
          border-radius: 8px 8px 0 0;
          opacity: 0;
          transition: 0.3s;
          -webkit-transition: 0.3s;
        }
        &:not(.active):hover:before {
          opacity: 1;
          bottom: 0;
        }
        &:not(.active):hover {
          color: #333;
        }
        > a {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .nav_item.active {
        color: #262626;
        &::before {
          background-color: #ffc952;
          opacity: 1;
          bottom: 0;
        }
      }
    }
  }
`;

const Navigation = () => {
  const menus = document.querySelectorAll(".nav_item");
  console.log(menus);
  return (
    <Container>
      <nav>
        <ul>
          <li className="nav_item active">
            <Link to="/">메인</Link>
          </li>
          <li className="nav_item">
            <Link to="/profile">프로필</Link>
          </li>
        </ul>
      </nav>
    </Container>
  );
};

export default Navigation;
