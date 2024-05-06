import { useState, useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import './App.css';
import JobCard from './components/JobCard';
import Filters from './components/Filters';
import { useDispatch, useSelector } from 'react-redux';
import { addJob } from './store/reducers/jobSlice';
import Navbar from './components/Navbar';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(10); // Initial limit
  const [offset, setOffset] = useState(0); // Initial offset
  const containerRef = useRef();
  const [filters, setFilters] = useState({});

  // Function to handle filter changes received from the child component
  const onFilterChange = (newFilters) => {
    setFilters({ newFilters });
  };
  useEffect(() => {
    fetchData();
  }, [offset, filters]);

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

  const filteredJobs = jobs.jobs.filter(job => {
    const { search, role, exp, remote=[], salary=[] } = filters.newFilters;
    // Convert filter values to numbers using parseInt
    const expValues = exp.map(value => parseInt(value));
    const salaryValues = parseInt(salary)
    // Check if the search query is empty or if the company name includes the search query
    const searchMatch = search.trim() === '' || job.companyName.toLowerCase().includes(search.toLowerCase());

    // Check if the role filter is empty or if the job's filter matches any of the selected filter
    const roleMatch = role.length === 0 || role.includes(job.jobRole);
    const expMatch = exp.length === 0 || expValues.includes(parseInt(job.minExp));
    const hybridMatch = remote.includes('remote') && !remote.some(value => value !== 'remote') ? job.location === 'remote' : !remote.includes('remote') && remote.some(value => value !== 'remote') ? job.location !== 'remote' : true;




    const payMatch = salary.length === 0 || (parseInt(job.minJdSalary) >= 0 && parseInt(job.minJdSalary) <= salary);

    // Return true if both conditions are met
    return searchMatch && roleMatch && expMatch && hybridMatch && payMatch;
  });


  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={1} className='sideBar_left'>
        <img src="https://jobs.weekday.works/_next/static/media/logo-small.08826abd.png" alt="" width={44} />
      </Grid>
      <Grid item xs={12} md={10} gap={0} >
        <Navbar />
        <Filters onFilterChange={onFilterChange} />
        <div ref={containerRef} style={{ padding: '1rem' }} >
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 3, md: 3 }}>
            {filteredJobs.map(job => (
              <Grid key={job.id} item xs={12} md={4}>
                <JobCard job={job} />
              </Grid>
            ))}
          </Grid>
          {loading && <p>Loading...</p>}
          {!hasMore && <p>No more data</p>}
        </div>
      </Grid>
      <Grid item xs={12} md={1} className='sidebar_right'>
      </Grid>
    </Grid>
  );
}

export default App;
