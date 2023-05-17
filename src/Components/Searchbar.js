import React, {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import axios from 'axios';


const Searchbar = () => {

  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    fetchData(searchInput);
  };

  const fetchData = async (searchInput) => {
    await axios.get('https://www.episodate.com/api/search?q='+searchInput)
      .then(res => {
        setData(res.data.tv_shows)
      })
      .catch((error) => {
        console.log(error)
      })
  };

  useEffect(() => {
    fetchData("")
  }, [])

  if (searchInput.length > 0) {
      data.filter((show) => {
      return show.name.match(searchInput);
    });
  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Buscar</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Busca tu TV show favorito" 
          onChange={handleChange}
          value={searchInput}
          />
      </Form.Group>
    </Form>
  )

}
export default Searchbar;