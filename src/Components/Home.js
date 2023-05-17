import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from './Datatable';

const Home = () => {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    await axios.get('https://www.episodate.com/api/most-popular')
      .then(res => {
        setData(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  };

  useEffect(() => {
    fetchData()
  }, [])


  return(
    <>
      <div className="form-wrapper pt-5 mt-5">
        <h1>Bienvenido disfruta de una lista de los TV shows mas populares de la historia</h1>
        <br></br>
        <br></br>
        <p className="title">Actualmente existen {data.total} titulos de los Programas de TV mas populares de la historia disponibles en el sistema, puedes visualizar los detalles en la lista debajo</p>
      </div>
      <DataTable />
    </>
  );
}

export default Home;
