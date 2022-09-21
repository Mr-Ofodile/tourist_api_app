import React,{useState, useEffect} from 'react';

const Loading = ()=>{
  return(
    <div className='loading'>
      <h1>loading....</h1>
    </div>
  )
}

const Tour = ({id,image,info,price,name,removeTours})=>{

const [readMore,setReadMore]= useState(false);

  return(
    <div>
      <article className='single-tour'>
        <img src={image} alt={name}/>
        <footer> 
        <div className='tour-info'>
              <h4>{name}</h4>
              <h4 className='tour-price'>${price}</h4>
        </div>
        <p>{readMore? info :`${info.substring(0,200)}...`}
        <button onClick={()=>setReadMore(!readMore)}>
          {readMore ? 'show less': 'read more'}
        </button>
        </p>
        <button className='delete-btn' onClick={()=>{removeTours(id)}}>not interested</button>
        </footer>
      </article>
    </div>
  )
}

const Tours = ({tours,removeTours})=>{
  return(
         <section>
            <div className='title'>
              <h2>our tours</h2>
              <div className='underline'></div>
            </div>
            <div>
              {tours.map((tour)=>{
                return <Tour key={tour.id} {...tour} removeTours={removeTours}></Tour>
              })}
            </div>
         </section>

        )

}


const url = 'https://course-api.com/react-tours-project';

function App()
{
  const [loading,setLoading] = useState(true);
  const [tours,setTours] = useState([]);
  const removeTours = (id)=>{
    const newTours = tours.filter((tour)=>tour.id !== id)
    setTours(newTours)
  }
  const fetchTours = async ()=>{
    setLoading(true);
    try{
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false)
      setTours(tours)
    
    }catch(error)
    {
      setLoading(false);
      console.log(error);


    }
  };



  useEffect(()=>{
    fetchTours()
  },[]);
  if(loading)
  {
    return <main>
            <Loading/>
          </main>
  }
  if(tours.length === 0)
  {
    return(
            <main>
                <div className='title'>
                      <h2>
                        no tours left
                      </h2>
                      <button className='btn' onClick={fetchTours}>refresh</button>
                </div>
            </main>
          )
  }
  return(
    <main>
      <Tours tours={tours} removeTours={removeTours}/>
    </main>
  )
}

export default App





























{/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/}