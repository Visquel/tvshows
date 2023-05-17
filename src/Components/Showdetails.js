import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';

const ShowDetails = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)
  const { id } = useParams();

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    await axios.get('https://www.episodate.com/api/show-details?q='+id)
      .then(res => {
        setData(res.data.tvShow)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  };

  const genres = data?.genres?.join(", ");

  if (loading) {
    return <>Loading...</>;
  }

  return(
    <>
      <div className="form-wrapper pt-5 mt-5 justify-center">
        <h1>{data.name}</h1>
        <br></br>
        <br></br>
        <p className="title">{data.name} cuenta con mas de {data?.episodes?.length} episodios de la produccion de {data.network} tiene un rating de {data.rating} estrellas</p>
        <Card style={{ width: '100%' }}>
          <Card.Img variant="top" src={data.image_path} />
          <Card.Body>
              <Card.Title>{data.name}</Card.Title>
              <Card.Subtitle className="my-3 text-muted">Generos: {genres}</Card.Subtitle>
              <Card.Subtitle className="my-3 text-muted">Pais: {data.country}</Card.Subtitle>
              <Card.Text>Description: {data.description}</Card.Text>
          </Card.Body>
        </Card>

        <div className="my-5">
          <Carousel style={{ width: "100%" }}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={data?.pictures[0]}
                alt="First Image"
              />
              <Carousel.Caption>
                <h3>{data?.episodes[0].name}</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={data.pictures[1]}
                alt="Second Image"
              />
      
              <Carousel.Caption>
              <h3>{data.episodes[1].name}</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={data.pictures[2]}
                alt="Third Image"
              />
      
              <Carousel.Caption>
              <h3>{data.episodes[2].name}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default ShowDetails;
