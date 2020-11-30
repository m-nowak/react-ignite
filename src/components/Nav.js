import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import logo from "../img/logo.svg";
import { fadeIn } from "../animations";
import { fetchSearch } from "../actions/gamesAction";
import { useDispatch } from "react-redux";

const Nav = () => {
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState("");
  const inputHandler = (e) => {
    e.preventDefault();
    setTextInput(e.target.value);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(fetchSearch(textInput));
    setTextInput("");
  };

  const clearSearched = () => {
    dispatch({ type: "CLEAR_SEARCHED" });
  };

  return (
    <StyledNav variants={fadeIn} initial="hidden" animate="show">
      <Logo onClick={clearSearched}>
        <img src={logo} alt="logo" />
        <h1>Ignite</h1>
      </Logo>
      <form className="search">
        <input value={textInput} onChange={inputHandler} type="text" />
        <button onClick={submitSearch} type="submit">
          Search
        </button>
      </form>
    </StyledNav>
  );
};

const StyledNav = styled(motion.nav)`
  padding: 3rem 5rem 0rem 5rem;
  text-align: center;
  .search {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 3rem auto 0rem auto;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    height: 45px;
    input {
      height: 45px;
      min-width: 75%;
      font-size: 1.5rem;
      padding: 0.5rem;
      border: none;
      background-color: #ffffff;
      border: 1px solid white;
      outline: none;
      :focus {
        border: 1px solid darkgrey;
        outline: none;
      }
    }
    button {
      height: 45px;
      min-width: 25%;
      font-size: 1.5rem;
      border: none;
      padding: rem 1rem;
      cursor: pointer;
      background: #ff7676;
      color: white;
      outline: none;
      opacity: 1;
      transition: 0.8s;
      :hover {
        opacity: 0.8;
      }
    }
  }
  @media (max-width: 1100px) {
    padding: 3rem 1rem 0rem 1rem;
    .search {
      width: 80%;
    }
  }
  @media (max-width: 720px) {
    padding: 3rem 1rem 0rem 1rem;
    .search {
      width: 98%;
    }
  }
  @media (max-width: 480px) {
    .search {
      button {
        font-size: 1.3rem;
      }
    }
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  img {
    height: 2rem;
    width: 2rem;
  }
`;

export default Nav;
