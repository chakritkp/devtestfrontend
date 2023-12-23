import React, { InputHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

interface ButtonComponentProps extends InputHTMLAttributes<HTMLInputElement> {
    children: ReactNode;
    type?: "success" | "primary";
  }

  const Button = styled.button<ButtonComponentProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 10px;
  padding: 0.5rem;
  color: #FFF;
  background-color: ${({ type }) => (type === "success" ? "rgb(0, 171, 86)" : type === "primary" ? "rgb(40, 104, 206)" : "rgb(0, 171, 86)")};
  border: none;
  font-size: 0.75rem;
  font-weight: 700;
  box-shadow: 0 5px 15px ${({ type }) => (type === "success" ? "rgba(0, 171, 86, 0.5)" : type === "primary" ? "rgb(40, 104, 206, 0.5)" : "rgb(0, 171, 86, 0.5)")};
  cursor: pointer;
`;

const ButtonComponent: React.FC<ButtonComponentProps> = ({
    children,
    type,
    ...rest
  }) => {
    return <Button type={type} {...rest}>{children}</Button>
  };
  
  export default ButtonComponent;
