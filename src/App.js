import React, { useState, useEffect } from 'react';
import Quote from './components/Quote';
import Spinner from './components/Spinner';

const initialQuote = {
  text: '',
  author: '',
};

function App() {
  const [quote, setQuote] = useState(initialQuote);
  const [loading, setLoading] = useState(false);

  const getRandomQuote = async () => {
    setLoading(true);
    const url = `https://www.breakingbadapi.com/api/quote/random`;
    const res = await fetch(url);
    const [quote] = await res.json();
    const { quote: text, author } = quote;
    setQuote({ text, author });
    setLoading(false);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <div className='app'>
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/7/77/Breaking_Bad_logo.svg'
        alt='logo'
      />
      <button onClick={getRandomQuote}>Get quote</button>
      {loading ? <Spinner /> : <Quote quote={quote} />}
    </div>
  );
}

export default App;
