import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

const AddressContainer = styled.div`
  background-color: #f7f7f7;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

const AddressLabel = styled.p`
  margin-bottom: 5px;
`;

const AddressValue = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`;

function App() {
  const [name, setName] = useState("");
  const [idade, setIdade] = useState("");
  const [cep, setCep] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dataAniversario, setDataAniversario] = useState("");
  const [cepData, setCepData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar idade
    if (idade < 18) {
      toast.error("É necessário ter 18 anos ou mais para se cadastrar.");
      return;
    }

    // Verificar CEP
    if (!cepData || cepData.uf !== "AM") {
      toast.error(
        "O CEP informado não pertence ao estado do Amazonas. Cadastro não permitido."
      );
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/usuario", {
        name,
        idade,
        cep,
        email,
        phone,
        dataAniversario,
      });
      console.log(response.data); // Exemplo: exibir a resposta da API no console
      // Faça o que for necessário com a resposta da API
      toast.success("Cadastro realizado com sucesso!");
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao cadastrar. Por favor, tente novamente.");
    }
  };

  const handleCepChange = async (e) => {
    const newCep = e.target.value;
    setCep(newCep);

    if (newCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${newCep}/json/`);
        const data = await response.json();
        setCepData(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      setCepData(null);
    }
  };

  const resetForm = () => {
    setName("");
    setIdade("");
    setCep("");
    setEmail("");
    setPhone("");
    setDataAniversario("");
    setCepData(null);
  };

  return (
    <Container>
      <Heading>Cadastrar Usuário</Heading>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nome:</Label>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label>Idade:</Label>
          <Input
            type="number"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            required
            min={0}
          />
        </FormGroup>
        <FormGroup>
          <Label>CEP:</Label>
          <Input
            type="text"
            value={cep}
            onChange={handleCepChange}
            required
            disabled={cepData && cepData.uf !== "AM"}
          />
        </FormGroup>
        {cepData && (
          <AddressContainer>
            <AddressLabel>Endereço:</AddressLabel>
            <AddressValue>{cepData.logradouro}</AddressValue>
            <AddressValue>{cepData.bairro}</AddressValue>
            <AddressValue>{cepData.localidade} - {cepData.uf}</AddressValue>
          </AddressContainer>
        )}
        <FormGroup>
          <Label>E-mail:</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label>Telefone:</Label>
          <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label>Data de Aniversário:</Label>
          <Input
            type="date"
            value={dataAniversario}
            onChange={(e) => setDataAniversario(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit">Cadastrar</Button>
      </Form>
      <ToastContainer />
    </Container>
  );
}

export default App;
