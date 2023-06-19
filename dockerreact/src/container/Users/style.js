import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
`;

export const Th = styled.th`
  background-color: #f2f2f2;
  border: 1px solid #dddddd;
  padding: 8px;
`;

export const Td = styled.td`
  border: 1px solid #dddddd;
  padding: 8px;
`;

export const Button = styled.button`
  margin-right: 5px;
  background-color: ${(props) => (props.primary ? "#007bff" : "#dc3545")};
  color: #ffffff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const Input = styled.input`
  padding: 5px;
  border: 1px solid #dddddd;
  border-radius: 3px;
`;

export const ResponsiveWrapper = styled.div`
  .div-busca{
    margin: 20px 0;
    display: flex;
    align-content: center;
    justify-content: center;
  }
  overflow-x: auto;
  @media (max-width: 664px) {
    width: 100%;
  }
`;

export const H2 = styled.h2`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  
`

// import {UsersContainer,UsersTable,TableHeading,TableRow,TableData,DeleteButton} from "./style"