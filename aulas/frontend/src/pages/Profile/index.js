import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg'

export default function Profile(){
  const [incidents, setIncidents] = useState([]);

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  const history = useHistory();
  
  //Recebe 2 parametros o 1 é uma função o que vai ser executado
  // e a segunda é um array de dependecias, quando as infos que estiverem dentro do array alterarem a função vai ser executada de novo,  se estiver em branco vai ser executado uma única vez.
  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then( response => {
      setIncidents(response.data);
    })
  }, [ongId]);

  async function handleDeleteIncident(id){
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });

      setIncidents(incidents.filter(incidents => incidents.id !== id));

    } catch(err) {
      alert('Erro ao deletar caso, por favor tente novamente.');
    }
  };

  function handleLogOut(){
    localStorage.clear();
    history.push('/');
  }

  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogOut} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format( incident.value)}</p>

            {/* Aqui tomar cuidado. Tem que passar uma function ()=> pq se só chamar a função handleDeleteIncident passando os parametros no final do map ele iria executar e deletar todos os incidentes.*/}

            <button onClick={()=> handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color="a8a8b3" />
            </button>
          </li>
        ))}

      </ul>
    </div>
  );
}