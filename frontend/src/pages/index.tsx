import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head'
import Container from '../components/Container';
import { UserContexts } from '../contexts/UserContexts';
import Cookies from 'js-cookie';
import Login from '../components/Login';
import { useContext, useEffect } from 'react';

interface HomeProps {
  login: boolean,
  id: string,
  nick: string,
  age: string
}

export default function Home(props : HomeProps) {

  //Verify login
  const { login, id, nick, age } = props;

  //Get user
  const { user, setUser } = useContext(UserContexts);

  //Update login
  useEffect(() => {  

    //If users is login
    if (login) {
      setUser({
        id: id,
        nick: nick,
        age: age
      });
    }

  }, [])

  return (
      <Container>
        
          <Head>
            <title>Chat Roulette App</title>
          </Head>

          {user.id ? (
              <h1>Logueado</h1>
          ): (
              <Login/>
          )}

      </Container>
  )
  
}

export const getServerSideProps:GetServerSideProps = async (ctx) => {
    
  const { id, nick, age } = ctx.req.cookies;

  var result = false;

  //Get user in database
  await axios.get("http://localhost:8081/api/user/"+id)
  .then(res => {
      result = (res.data._id) ? true : false; 
  })
  .catch(err => {
      Cookies.set("id", ""); Cookies.set("nick", ""); Cookies.set("age", "");
      result = false;
  });


  return {
      props: {
          login: result,
          id: id,
          nick: nick,
          age: age
      }
  }
}