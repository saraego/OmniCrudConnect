import styled from "styled-components";

export const Container = styled.div`
  height: 72px;
  background-color: #fff;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

export const Ul = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 50px;
`;

export const Li = styled.a`
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;
  border: 1px solid white;
  color: black;
  font-weight: bold;
  &:hover{
    border-bottom:.5px solid black ;
  }
`

export const Pagelin = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.isActive ? "#9758A6" : "#555"};
  font-weight: ${props => props.isActive ? "700" : "400"};
  font-size: 16px;
  line-height: 19px;
`;

export const ContainerRight = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;

  .divisao {
    height: 40px;
    border-right: solid #ccc 0.5px;
  }

  .containerText2 {
    p {
      font-weight: 300;
      font-size: 14px;
      color: #555;
    }
  }
`;
