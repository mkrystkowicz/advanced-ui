import React from "react";
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 200px;
  flex-direction: column;
`;

const StyledButton = styled.button`
  width: 200px;
  height: 50px;
  border: 3px solid black;
  background-color: transparent;
  margin: 50px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
`;

const ButtonA = styled(StyledButton)`
  position: relative;
  overflow: hidden;
  color: black;
  transition: color 0.2s 0.1s ease-in-out;

  &::before {
    content: "";
    width: 300px;
    height: 300px;
    border-radius: 300px;
    position: absolute;
    background-color: black;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.4s cubic-bezier(0.56, 0.09, 0.17, 0.75);
    z-index: -1;
  }

  &:hover {
    color: white;
  }

  &:hover::before {
    transform: translate(-50%, -50%) scale(1);
  }
`;

const ButtonB = styled(StyledButton)`
  position: relative;
  overflow: hidden;
  color: black;
  transition: color 0.2s 0.1s ease-in-out;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: black;
    top: 0;
    left: 0;
    transform: scaleX(0);
    transform-origin: 0 50%;
    transition: transform 0.4s cubic-bezier(0.56, 0.09, 0.17, 0.75);
    z-index: -1;
  }

  &:hover {
    color: white;
  }

  &:hover::before {
    transform: scale(1);
  }
`;

const ButtonC = styled(StyledButton)`
  position: relative;
  overflow: hidden;
  border: none;
  box-shadow: inset 0 0 0 3px black;

  span {
    position: relative;
    z-index: 2;
  }

  &::before {
    content: "";
    width: 300px;
    height: 300px;
    position: absolute;
    background-color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1) rotate(45deg);
    transition: transform 0.6s cubic-bezier(0.49, -0.2, 0.57, 1.23);
  }

  &:hover::before {
    transform: translate(-50%, -50%) scale(0) rotate(45deg);
  }
`;

const ButtonD = styled(StyledButton)`
  position: relative;
  overflow: hidden;

  span {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    transition: transform 0.4s ease-in-out;
  }

  span:nth-child(1) {
    transform: translateY(
      ${({ isLoading, isSuccess }) => {
        if (isLoading) return "-100%";
        if (isSuccess) return "-100%";
        return "0%";
      }}
    );
  }

  span:nth-child(2) {
    color: white;
    transform: translateY(
      ${({ isLoading, isSuccess }) => {
        if (isLoading) return "0%";
        if (isSuccess) return "-100%";
        return "100%";
      }}
    );

    &::before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: black;
      top: 0;
      left: 0;
      transform: scaleX(${({ isLoading }) => (isLoading ? "1" : "0")});
      transform-origin: 0 50%;
      transition: transform 2.5s 0.5s cubic-bezier(0.56, 0.09, 0.17, 0.75);
      z-index: -1;
    }
  }

  span:nth-child(3) {
    transform: translateY(
      ${({ isLoading, isSuccess }) => {
        if (isLoading) return "100%";
        if (isSuccess) return "0%";
        return "200%";
      }}
    );
  }
`;

const moveUpStart = keyframes`
  to {
    transform: translateY(-105%);
  }
`;

const moveUpEnd = keyframes`
  from {
    transform: translateY(100%);
  } to {
    transform: translateY(0);
  }
`;

const ButtonE = styled(StyledButton)`
  position: relative;
  overflow: hidden;
  border: none;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: white;
  }

  &:hover span {
    animation: ${moveUpStart} 0.2s forwards, ${moveUpEnd} 0.2s forwards 0.2s;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-color: black;
    z-index: -1;
    clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
    transition: clip-path 0.2s ease-in-out;
  }

  &:hover::before {
    transition-duration: 0.4s;
    clip-path: polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%);
  }
`;

const ButtonF = styled(StyledButton)`
  position: relative;
  overflow: hidden;
  background-color: white;

  span {
    mix-blend-mode: difference;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: white;
  }

  &:hover span {
    animation: ${moveUpStart} 0.2s forwards, ${moveUpEnd} 0.2s forwards 0.2s;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 101%;
    height: 100%;
    content: "";
    background-color: black;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    transition: clip-path 0.2s ease-in-out;
  }

  &:hover::before {
    transition-duration: 0.4s;
    clip-path: polygon(0 0, 100% 0%, 0 0, 0% 100%);
  }
`;

const FancyButtons = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsSuccess(true);
      setIsLoading(false);
    }, 3000);
  };

  return (
    <Wrapper>
      <ButtonA>Click me</ButtonA>
      <ButtonB>Click me</ButtonB>
      <ButtonC>
        <span>Submit</span>
      </ButtonC>
      <ButtonD
        isSuccess={isSuccess}
        isLoading={isLoading}
        onClick={handleSubmit}
      >
        <span>Submit</span>
        <span>Loading...</span>
        <span>Success!</span>
      </ButtonD>
      <ButtonE>
        <span>Next</span>
      </ButtonE>
      <ButtonF>
        <span>Next</span>
      </ButtonF>
    </Wrapper>
  );
};

export default FancyButtons;

