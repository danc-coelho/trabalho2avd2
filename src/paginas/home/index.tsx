import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import { Container, Form, Tabela, Titulo, Botao } from './styles';

interface ICliente {
     id: string;
     cliente: string;
     telefone: string;
     email: string;
}

interface INovoCliente {
     cliente: string;
     telefone: string;
     email: string;
}

const Home: React.FC = () => {
     const [cliente, setCliente] = useState('');
     const [telefone, setTelefone] = useState('');
     const [email, setEmail] = useState('');
     const [clientes, setClientes] = useState<ICliente[]>([]);

     useEffect(() => {
          axios({
               method: 'get',
               url: 'http://localhost:3333/clients',
          })
               .then((response: AxiosResponse<ICliente[]>) => {
                    setClientes(response.data);
               })
               .catch((error: AxiosError) => {
                    console.log(error);
               });
     }, []);

     function enviarFormulario(evento: FormEvent<HTMLFormElement>): void {
          evento.preventDefault();
          const objeto: INovoCliente = {
               cliente,
               telefone,
               email,
          };

          axios({
               method: 'post',
               url: 'http://localhost:3333/clients',
               data: objeto,
          })
               .then((response: AxiosResponse<ICliente>) => {
                    const novoCliente: ICliente = {
                         id: response.data.id,
                         cliente: response.data.cliente,
                         telefone: response.data.telefone,
                         email: response.data.email,
                    };
                    setClientes([...clientes, novoCliente]);
               })
               .catch((error: AxiosError) => {
                    console.log(error);
               });
     }

     function deletarCliente(clienteID: string): void {
          axios({
               method: 'delete',
               url: `http://localhost:3333/clients/${clienteID}`,
          })
               .then((response: AxiosResponse<ICliente>) => {
                    const novosClientes = clientes.filter(cl => {
                         return cl.id !== clienteID;
                    });
                    setClientes(novosClientes);
               })
               .catch((error: AxiosError) => {
                    console.log(error);
               });
     }



     return (
          <Container>
               <h2>Trabalho POO II - Daniel Carvalho Coelho</h2>
               <Tabela>
                    <thead>
                         <tr>
                              <td>Nome</td>
                              <td>Telefone</td>
                              <td>E-mail</td>
                         </tr>
                    </thead>

                    <tbody>
                         {clientes.map(item => {
                              return (
                                   <tr key={item.id}>
                                        <td>{item.cliente}</td>
                                        <td>{item.telefone}</td>
                                        <td>{item.email}</td>
                                        <td>
                                             <button type="button">
                                                  <Link to={`/editar/${item.id}`}>Editar</Link>
                                             </button>
                                             <button type="button" onClick={() => { deletarCliente(item.id); }}>
                                                  Excluir
                                             </button>
                                        </td>
                                   </tr>
                              );
                         })}
                    </tbody>
               </Tabela>

               <Form onSubmit={enviarFormulario}>
                    <Titulo>Nome:</Titulo>
                    <input
                         placeholder="Digite aqui..."
                         value={cliente}
                         onChange={(e: any) => {
                              setCliente(e.target.value);
                         }}
                    />

                    <Titulo>Telefone:</Titulo>
                    <input
                         placeholder="Digite aqui..."
                         value={telefone}
                         onChange={(e: any) => {
                              setTelefone(e.target.value);
                         }}
                    />

                    <Titulo>E-mail:</Titulo>
                    <input
                         placeholder="Digite aqui..."
                         value={email}
                         onChange={(e: any) => {
                              setEmail(e.target.value);
                         }}
                    />

                    <Botao type="submit">Finalizar Cadastro</Botao>
               </Form>
          </Container>
     );
};

export default Home;
