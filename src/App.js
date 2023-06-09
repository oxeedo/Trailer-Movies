
import './App.css';
import React, { useEffect, useState } from 'react';
import MovieBox from './MovieBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';


const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=ac0f97591cfb6d7272c24889e3b53834";
const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=ac0f97591cfb6d7272c24889e3b53834&query";
function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  useEffect(() => {
    return () => {
      fetch(API_URL).then((res) => res.json()).then(data => {
        console.log(data)
        setMovies(data.results)
      })
    };
  }, [])
  const searchMovie = async (e) => {
    e.preventDefault();
    console.log("searching");
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=ac0f97591cfb6d7272c24889e3b53834&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results)
    } catch (e) {
      console.log(e)
    }
  }
  const changeHandler = (e) => {
    setQuery(e.target.value)
  }
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/home">MovieDB APP</Navbar.Brand>
          <Navbar.Brand href="/home">Trending</Navbar.Brand>
          <Navbar.Toggle aria-controls="narbarScroll">  </Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-3"
              style={{ maxHeight: "100px" }}
              navbarScroll></Nav>
            <Form className='d-flex' onSubmit={searchMovie}>
              <FormControl
                type='search'
                placeholder='Movie Search'
                className='me-2'
                aria-label='search'
                name="query" value={query} onChange={changeHandler}>

              </FormControl>
              <Button variant="secondary" type="submit">Search</Button>
            </Form>

          </Navbar.Collapse>

        </Container>
      </Navbar>
      <div>
        {movies.length > 0 ? (<div className='container'>
          <div className='grid'>
            {movies.map((movieReq) => <MovieBox key={movieReq.id} {...movieReq} />)}
          </div></div>) : (<h2>No more Movies Found</h2>)}

      </div>

    </>
  );

}


export default App;
