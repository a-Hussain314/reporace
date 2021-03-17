import React, { useState, useEffect, useCallback } from 'react';
import Requester from "../../utilities/Requester";
import TwoDigitsNumber from "../../utilities/TwoDigitsNumber"
import Spinner from "../reusableComponents/Spinner";
import RepoCard from "../reusableComponents/RepoCard"
import styles from "./Home.module.scss";


function Home() {
  const [reposList, setReposList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [previousPageNumber, setPreviousPageNumber] = useState(0);
  const [spinnerDisplay, setSpinnerDisplay] = useState(false);
  const reposPerPage = 20;


  const reposFetcher = useCallback((num) => {
    // updates last fetched page number. 
    // set the spinner to be visible.
    setPreviousPageNumber(num);
    setSpinnerDisplay(true);


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
          setSpinnerDisplay(false);
          setReposList([...reposList, ...res.data.items]);
          setPageNumber(num + 1);

      }).catch(() => {
        window.alert("API Request Failed : Failed To Fetch More repos Data");
        setSpinnerDisplay(false);
      })
  }, [reposList])


  const scrollHandler = useCallback(() => {
    // the condition checks if the page verticaly scrolled to the end of the page, and
    // also checks if no previous request has been made with the same "page number",
    // to prevent repeated requests for the same 20 records. 
    if (window.innerHeight > document.getElementById("spinner").getBoundingClientRect().bottom && pageNumber > previousPageNumber) {
      reposFetcher(pageNumber)
    }

  }, [pageNumber, previousPageNumber, reposFetcher])


  useEffect(() => {
    // to fetch the first 20 repo, at the first page load only & with no repeated requests
    if (pageNumber === 1 && pageNumber > previousPageNumber) {
      reposFetcher(pageNumber)
    }

    //   attach the scrolling logic to the window 
    window.addEventListener("scroll", scrollHandler);

    //   deattach the scrolling logic form the window 
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    }
  }, [pageNumber, previousPageNumber, reposList, scrollHandler, reposFetcher])


  return (
    <section className={styles.home}>
      <div className="container">
        <div>
          {
            reposList.map((repo, index) => {
              return (
                <RepoCard repo={repo}/>
                )
            })
          }
        </div>
        <div id="spinner" className={styles.spinner_box}>
          {spinnerDisplay && <Spinner />}
        </div>
        
      </div>
    </section>
  )
}
export default Home;
