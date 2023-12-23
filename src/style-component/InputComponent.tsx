import React, { InputHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  // children: ReactNode;
  type: string;
  inputname: string;
}

export const InputContainerConmponent = styled.div`
  width: 100%;
  position: relative;
  padding-top: 0.65rem;
`;

export const InputLabel = styled.label`
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0 0.25rem;
  position: absolute;
  background-color: #fff;
  top: 0;
  left: 0.5rem;
  color: #cecece;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e0e0e0;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  &::placeholder {
    color: #d9d9d9;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e0e0e0;
`;
export const TextArea = styled.textarea`
  width: 100%;
  height: 60px;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e0e0e0;
`

const InputComponent: React.FC<InputComponentProps> = ({
  // children,
  inputname,
  type,
  ...rest
}) => {

  return (
    <InputContainerConmponent>
      <InputLabel>{inputname}</InputLabel>
      <Input type={type || "text"} {...rest} />
    </InputContainerConmponent>
  );
};

export default InputComponent;
