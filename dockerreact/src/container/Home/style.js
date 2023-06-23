import styled from "styled-components";


export const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;

export const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

export const AddressContainer = styled.div`
  background-color: #f7f7f7;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

export const AddressLabel = styled.p`
  margin-bottom: 5px;
`;

export const AddressValue = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`;