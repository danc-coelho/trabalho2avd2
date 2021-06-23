import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useState, useEffect, FormEvent } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { Container, Form } from './styles';

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

interface clienteParametro {
     id: string;
}

const Home: React.FC = () => {
     const { params } = useRouteMatch<clienteParametro>();
     const [cliente, setCliente] = useState('');
     const [telefone, setTelefone] = useState('');
     const [email, setEmail] = useState('');

     useEffect(() => {
          axios({
               method: 'get',
               url: `http://localhost:3333/clients/${params.id}`,
          })
               .then((response: AxiosResponse<ICliente>) => {
                    setCliente(response.data.cliente);
                    setTelefone(response.data.telefone);
                    setEmail(response.data.email);
               })
               .catch((error: AxiosError) => {
                    console.log(error);
               });
     }, []);

     function submitForm(evento: FormEvent<HTMLFormElement>): void {
          evento.preventDefault();
          const obj: INovoCliente = {
               cliente,
               telefone,
               email,
          };

          axios({
               method: 'put',
               url: `http://localhost:3333/clients/${params.id}`,
               data: obj,
          })
               .then((response: AxiosResponse<ICliente>) => {
                    console.log(response.data);
                    window.location.href = '/';
               })
               .catch((error: AxiosError) => {
                    console.log(error);
               });
     }

     return (
          <Container>
               <h1>Menu Edição</h1>

               
               <Form onSubmit={submitForm}>
                    <label>Cliente:</label>
                    <input
                         placeholder="Digite seu cliente"
                         value={cliente}
                         onChange={(e: any) => {
                              setCliente(e.target.value);
                         }}
                    />


                    <label>Telefone:</label>
                    <input
                         placeholder="Digite seu telefone"
                         value={telefone}
                         onChange={(e: any) => {
                              setTelefone(e.target.value);
                         }}
                    />

                    <label>E-mail:</label>
                    <input
                         placeholder="Digite seu email"
                         value={email}
                         onChange={(e: any) => {
                              setEmail(e.target.value);
                         }}
                    />

                    <button type="submit">Editar</button>   
               </Form>
              
          </Container>
     );
};

export default Home;
