import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Wrapper, Table, Th, Td, Button, Input, ResponsiveWrapper, H2 } from "./style";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      const data = response.data;
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/user/${userId}`);
      const remainingUsers = users.filter((user) => user.id !== userId);
      setUsers(remainingUsers);
      toast.success("Usuário excluído com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir usuário.");
    }
  };

  const editUser = (user) => {
    setEditingUser({ ...user });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  const saveUser = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/user/${editingUser.id}`,
        editingUser
      );
      setEditingUser(null);
      fetchUsers();
      toast.success("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar usuário.");
    }
  };

  const sortUsersAlphabetically = () => {
    const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
    setUsers(sortedUsers);
  };

  const handleDeleteUser = async (userId) => {
    if (editingUser && editingUser.id === userId) {
      setEditingUser(null);
    }

    await deleteUser(userId);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Wrapper>
      <ResponsiveWrapper>
        <div className="div-busca">
          <Input
            type="text"
            placeholder="Buscar usuários"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {filteredUsers.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <Th>Nome</Th>
                <Th>Idade</Th>
                <Th>Email</Th>
                <Th>Telefone</Th>
                <Th>CEP</Th>
                <Th>
                  <Button onClick={sortUsersAlphabetically}>
                    Por ordem alfabética
                  </Button>
                </Th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) =>
                editingUser && user.id === editingUser.id ? (
                  <tr key={user.id}>
                    <Td>
                      <Input
                        type="text"
                        name="name"
                        value={editingUser.name}
                        onChange={handleInputChange}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="number"
                        name="age"
                        value={editingUser.age}
                        onChange={handleInputChange}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        name="email"
                        value={editingUser.email}
                        onChange={handleInputChange}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        name="phone"
                        value={editingUser.phone}
                        onChange={handleInputChange}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        name="cep"
                        value={editingUser.cep}
                        onChange={handleInputChange}
                      />
                    </Td>
                    <Td>
                      <Button primary onClick={saveUser}>
                        Salvar
                      </Button>
                      <Button onClick={() => setEditingUser(null)}>Cancelar</Button>
                    </Td>
                  </tr>
                ) : (
                  <tr key={user.id}>
                    <Td>
                      <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </Td>
                    <Td>{user.age} anos</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.phone}</Td>
                    <Td>{user.cep}</Td>
                    <Td>
                      <Button primary onClick={() => editUser(user)}>
                        Editar
                      </Button>
                      <Button onClick={() => handleDeleteUser(user.id)}>
                        Excluir
                      </Button>
                    </Td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        ) : (
          <H2>Não há usuários registrados.</H2>
        )}
      </ResponsiveWrapper>
      <ToastContainer position="top-right" autoClose={3000} />
    </Wrapper>
  );
};

export default Users;
