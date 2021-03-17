import React, { useState, useEffect, useCallback } from 'react';
import Requester from "../../utilities/Requester";
import styles from "./Home.module.scss";
import TwoDigitsNumber from "../../utilities/TwoDigitsNumber"

function Home() {
  const [reposList, setReposList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [previousPageNumber, setPreviousPageNumber] = useState(0);
  const reposPerPage = 20;


  const reposFetcher = useCallback((num) => {
    // updates last fetched page number. 
    // set the spinner to be visible.
    setPreviousPageNumber(num);

    let dateToday = new Date();

    // current year
    let year = dateToday.getFullYear();

    // current month : zero based index (strats from 0), january = 0
    // to fetch the last month repos, we use it without any modification 
    let month = dateToday.getMonth();

    // current day
    let day = dateToday.getDate()

    // fetch the next 20 records
    Requester.get(`/search/repositories?q=created:>${year}-${TwoDigitsNumber(month)}-${TwoDigitsNumber(day)}&sort=stars&order=desc&per_page=${reposPerPage}&page=${num}`)
      .then((res) => {

        // - add the new 20 records to the current records list.
        // - update the page number, to be suitable for the request of the next 10 records.
        window.setTimeout(() => {
          setReposList([...reposList, ...res.data.items]);
          setPageNumber(num + 1);
        }, 500)

      }).catch(() => {
        window.alert("API Request Failed : Failed To Fetch More repos Data");
      })
  }, [reposList])



  useEffect(() => {
    // to fetch the first 20 repo, at the first page load only & with no repeated requests
    if (pageNumber === 1 && pageNumber > previousPageNumber) {
      reposFetcher(pageNumber)
    }

  }, [pageNumber, previousPageNumber, reposList, reposFetcher])


  return (
    <section className={styles.home}>
      <div className="container">
        <div>
          {
            reposList.map((repo, index) => {
              return (
                <p key={index}>{repo.name}</p>
                )
            })
          }
        </div>

        
      </div>
    </section>
  )
}
export default Home;
