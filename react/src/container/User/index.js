import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Wrapper, Heading, Card, UserImage, InputFile, CustomButton, Input, Textarea } from "./style";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const inputFileRef = useRef(null);
  const [address, setAddress] = useState(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/${userId}`);
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

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleEmailSubjectChange = (event) => {
    setEmailSubject(event.target.value);
  };

  const handleEmailContentChange = (event) => {
    setEmailContent(event.target.value);
  };

  const handleEmailClick = () => {
    const email = user.email;
    const subject = emailSubject;
    const body = emailContent;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const whatsappLink = `https://api.whatsapp.com/send?phone=${"5592"+user.phone}`;

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
        <p>Idade: {user.age} anos</p>
        <p>Email: {user.email}</p>
        <p>Telefone: {user.phone}</p>
        <p><a href={whatsappLink} target="_blank" rel="noreferrer">Enviar mensagem pelo WhatsApp</a></p>
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

      <Card>
        <Heading>Enviar E-mail</Heading>
        <Input
          type="text"
          placeholder="Assunto"
          value={emailSubject}
          onChange={handleEmailSubjectChange}
        />
        <Textarea
          placeholder="Mensagem"
          value={emailContent}
          onChange={handleEmailContentChange}
        />
        <CustomButton onClick={handleEmailClick}>Enviar E-mail</CustomButton>
      </Card>
    </Wrapper>
  );
};

export default UserDetails;
