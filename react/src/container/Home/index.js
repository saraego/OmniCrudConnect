import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Heading,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  AddressContainer,
  AddressLabel,
  AddressValue,
} from "./style";



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
      const response = await axios.post("http://localhost:8000/api/user", {
        name,
        age: idade,
        cep,
        email,
        phone,
        dataAniversario,
        state: cepData.uf,
        city: cepData.localidade,
        address: `${cepData.logradouro}, ${cepData.bairro}`,
      });

      console.log(response.data); // Exemplo: exibir a resposta da API no console
    
      toast.success(response.data.message);
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error);
    }
    
  };

  const handleCepChange = async (e) => {
    const newCep = e.target.value;
    setCep(newCep);

    if (newCep.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${newCep}/json/`
        );
        const data = response.data;
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
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
           /* disabled={cepData && cepData.uf !== "AM"} */
          />
        </FormGroup>
        {cepData && (
          <AddressContainer>
            <AddressLabel>Endereço:</AddressLabel>
            <AddressValue>{cepData.logradouro}</AddressValue>
            <AddressValue>{cepData.bairro}</AddressValue>
            <AddressValue>
              {cepData.localidade} - {cepData.uf}
            </AddressValue>
          </AddressContainer>
        )}
        <FormGroup>
          <Label>E-mail:</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Telefone:</Label>
          <Input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
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

