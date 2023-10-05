
import { useEffect, useState } from 'react';
import './App.css';
function Auth() {

  const [login, setLogin] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('access_token')) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [])


  function Aut() {

    console.log("aaaaaaaaaaaaaaahhhhhh")

    // Votre clé API Betaseries
    const clientId = 'bdd22aad23fc';

    // L'URI où vous souhaitez rediriger l'utilisateur après l'autorisation
    const redirectUri = 'http://localhost:3000/authorization';

    // URL d'autorisation Betaseries
    const authorizationUrl = `https://www.betaseries.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;

    // Rediriger l'utilisateur vers l'URL d'autorisation
    window.location.href = authorizationUrl;

  }

  function disconnect() {
    localStorage.removeItem('token');
    localStorage.removeItem('access_token');
    window.location.href = 'http://localhost:3000/';
    setLogin(false);
  }

  return (
    <div className="auth-container">
      {login ? (
        <button onClick={() => disconnect()} className="disconnect-button">
          DISCONNECT
        </button>
      ) : (
        <button onClick={() => Aut()} className="auth-button">
          AUTH
        </button>
      )}
    </div>
  );
}

export default Auth;
