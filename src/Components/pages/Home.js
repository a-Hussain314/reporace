import React, { useState, useEffect, useCallback } from 'react';

// utilities
import Requester from "../../utilities/Requester";
import TwoDigitsNumber from "../../utilities/TwoDigitsNumber"

// reuseable components
import ReposList from "../reusableComponents/ReposList";
import Spinner from "../reusableComponents/Spinner";

// style module
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


    // roll back 30 days from today, to build a true rolling 30-day window
    let dateToday = new Date();
    dateToday.setDate(dateToday.getDate() - 30);

    // year of the date 30 days ago
    let year = dateToday.getFullYear();

    // month of the date 30 days ago : getMonth() is zero-indexed (january = 0), so add 1
    let month = dateToday.getMonth() + 1;

    // day of the date 30 days ago
    let day = dateToday.getDate()

    // fetch the next 20 records
    Requester.get(`/search/repositories?q=created:>${year}-${TwoDigitsNumber(month)}-${TwoDigitsNumber(day)}&sort=stars&order=desc&per_page=${reposPerPage}&page=${num}`)
      .then((res) => {
        // - add the new 20 records to the current records list.
        // - update the page number, to be suitable for the request of the next 10 records.
        setSpinnerDisplay(false);
        setReposList((prev) => [...prev, ...res.data.items]);
        setPageNumber(num + 1);

      }).catch(() => {
        window.alert("API Request Failed : Failed To Fetch More repos Data");
        setSpinnerDisplay(false);
      })
  }, [])


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
        <p className={styles.note}>the most starred Github repos that were created in the last 30 days</p>
        <ReposList reposList={reposList} />

        <div id="spinner" className={styles.spinner_box}>
          {spinnerDisplay &&
            <Spinner />
          }
        </div>

      </div>
    </section>
  )
}
export default Home;
