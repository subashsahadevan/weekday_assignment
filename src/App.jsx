import { useState, useEffect, useRef } from 'react';
import { Container, Grid } from '@mui/material';
import './App.css';
import JobCard from './components/JobCard';
import Filters from './components/Filters';
import { useDispatch, useSelector } from 'react-redux';
import { addJob } from './store/reducers/jobSlice';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(10); // Initial limit
  const [offset, setOffset] = useState(0); // Initial offset
  const containerRef = useRef();

  useEffect(() => {
    fetchData();
  }, [offset]);

  const fetchData = async () => {
    setLoading(true); // Set loading state to true before fetching
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      "limit": limit,
      "offset": offset
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body
    };
    try {
      const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON', requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      if (jsonData.jdList && jsonData.jdList.length > 0) {
        dispatch(addJob(jsonData.jdList));
      } else {
        setHasMore(false); // No more data to fetch
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading state to false after fetching data
    }
  };

  useEffect(() => {
    function handleScroll() {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20 && !loading && hasMore) {
        setOffset(prevOffset => prevOffset + 1);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore]);
  

  // Get jobs from Redux store state
  const jobs = useSelector(state => state.jobs);

  return (
    <Container>
      <Filters />
      <div ref={containerRef} >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 3, md: 3 }}>
          {jobs.jobs.map(job => (
            <Grid key={job.id} item xs={12} md={4}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>
        {loading && <p>Loading...</p>}
        {!hasMore && <p>No more data</p>}
      </div>
    </Container>
  );
}

export default App;
