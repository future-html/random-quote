import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [transparent, setTransparent] = useState(1);
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [previousQuote, setPreviousQuote] = useState('');
  const [randomColor, setRandomColor] = useState('');


  useEffect(() => {
    getQuote();
  }, []);

  const generateRandomColor = () => {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    setRandomColor(color);
  };
  
  const getQuote = () => {
    let url =
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let dataQuotes = data.quotes;
        let randomNum = Math.floor(Math.random() * dataQuotes.length);
        let randomQuote = dataQuotes[randomNum];

        if (randomQuote.quote === previousQuote) {
          // If the fetched quote is the same as the previous one, fetch again
          getQuote();
        } else {
          setQuote(randomQuote.quote);
          setAuthor(randomQuote.author);
          setPreviousQuote(randomQuote.quote);
          generateRandomColor();
        }
      });
  };

  const handleClick = () => {
    const interval = setInterval(() => {
      setTransparent((prevTransparent) => {
        const newTransparent = prevTransparent - 0.01;
        if (newTransparent < 0) {
          clearInterval(interval);
          // Call getQuote() after the content becomes fully transparent
          getQuote();

          // Slowly increase opacity from 0 to 1 for the new content
          const fadeInInterval = setInterval(() => {
            setTransparent((prevTransparent) => {
              const newTransparent = prevTransparent + 0.01;
              if (newTransparent >= 1) {
                clearInterval(fadeInInterval);
              }
              return newTransparent;
            });
          }, 10);
        }
        return newTransparent;
      });
    }, 10);
  };

  return (
    <div id="quote-box" style = {{backgroundColor:randomColor}}>
      <div id="wrapper_content" style={{ opacity: transparent }}>
        <div id="text" style={{ display: 'flex', color: randomColor }}>
          <i className="fa fa-quote-left"> </i>
          <span id="quote">{quote}</span>
        </div>
        <div id="author" style={{ color: randomColor }}>
          <p>- {author}</p>
        </div>
        <div id="social_media">
          <a
            style={{ backgroundColor: randomColor }}
            className="button"
            id="tweet-quote"
            title="Tweet this quote!"
            target="_top"
            href="https://twitter.com/intent/tweet?hashtags=quotes&amp;related=freecodecamp&amp;text=%22Eighty%20percent%20of%20success%20is%20showing%20up.%22%20Woody%20Allen"
          >
            <i className="fa fa-twitter"></i>
          </a>
          <a
            style={{ backgroundColor: randomColor }}
            className="button"
            id="tumblr-quote"
            title="Post this quote on tumblr!"
            target="_blank"
            href="https://www.tumblr.com/widgets/share/tool?posttype=quote&amp;tags=quotes,freecodecamp&amp;caption=Woody%20Allen&amp;content=Eighty%20percent%20of%20success%20is%20showing%20up.&amp;canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&amp;shareSource=tumblr_share_button"
          >
            <i className="fa fa-tumblr"></i>
          </a>
        </div>
        <div id="buttons">
          <button onClick={handleClick} id="new-quote" style={{ backgroundColor: randomColor }}>
            New Quote
          </button>
        </div>
      </div>
      <footer>code by Witsanuporn Promsirinimit</footer>
      </div>
    
  );
}

export default App;
