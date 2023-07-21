import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllData } from './util/index';

const URL = 'http://localhost:8000/api/v1/';

function App() {

const [message, setMessage] = useState(''); 

  useEffect(() => {

    (async () => {
      const myData = await getAllData(URL)
      setMessage(myData.data);
    })();
      
    return () => {
      console.log('unmounting');
    }

  }, []);

  return (
    <>
      <h1>{message}</h1>
      <Link to="/home">HOME</Link>
    </>
  );
}

export default App;
