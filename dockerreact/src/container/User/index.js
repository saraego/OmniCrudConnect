/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Wrapper, Heading, Card, UserImage, InputFile, CustomButton } from "./style";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const inputFileRef = useRef(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/usuario/${userId}`);
      const userData = response.data;
      setUser(userData);
      fetchAddress(userData.cep);
    } catch (error) {
      console.error(error);
      // Trate o erro aqui, exibindo uma mensagem de erro adequada para o usuário
    }
  };

  const fetchAddress = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const addressData = response.data;
      setAddress(addressData);
    } catch (error) {
      console.error(error);
      // Trate o erro aqui, exibindo uma mensagem de erro adequada para o usuário
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChooseImage = () => {
    inputFileRef.current.click();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Card>
        <UserImage src={image || user.photo} alt="Selecione uma foto" />
        <CustomButton onClick={handleChooseImage}>Escolher Foto</CustomButton>
        <InputFile ref={inputFileRef} type="file" onChange={handleImageChange} />
      </Card>

      <Card>
        <Heading>Detalhes do Usuário</Heading>
        <p>Nome: {user.name}</p>
        <p>Idade: {user.idade} anos</p>
        <p>Email: {user.email}</p>
        <p>Telefone: {user.phone}</p>
        <p>CEP: {user.cep}</p>
      </Card>
      {address && (
        <Card>
          <Heading>Endereço</Heading>
          <p>Rua: {address.logradouro}</p>
          <p>Bairro: {address.bairro}</p>
          <p>Cidade: {address.localidade}</p>
          <p>Estado: {address.uf}</p>
        </Card>
      )}
    </Wrapper>
  );
};

export default UserDetails;
