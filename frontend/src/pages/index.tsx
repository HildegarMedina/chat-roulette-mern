import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head'
import Container from '../components/Container';
import { UserContexts } from '../contexts/UserContexts';
import Cookies from 'js-cookie';
import Login from '../components/Login';
import { useContext, useEffect } from 'react';
import Chat from '../components/Chat';

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
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;700&display=swap" rel="stylesheet"/> 
          </Head>

          {user.id ? (
              <Chat/>
          ): (
              <Login/>
          )}

      </Container>
  )
  
}

//Get props from server
export const getServerSideProps:GetServerSideProps = async (ctx) => {
    
  var { id, nick, age } = ctx.req.cookies;

  var result = false;

  if (id) {
    //Get user in database
    await axios.get("http://localhost:8081/api/user/"+id)
    .then(res => {
        result = (res.data._id) ? true : false; 
    })
    .catch(err => {
        Cookies.set("id", ""); Cookies.set("nick", ""); Cookies.set("age", "");
        result = false;
    });
  }else {
    id = null; nick = null; age = null
  }


  return {
      props: {
          login: result,
          id: id,
          nick: nick,
          age: age
      }
  }
}