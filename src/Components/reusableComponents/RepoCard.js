import React from 'react';

// utilities
import daysAgoCalculater from "../../utilities/daysAgoCalculater";

// style module
import styles from "./RepoCard.module.scss";


function RepoCard({ repo }) {
    let daysAgo = daysAgoCalculater(repo.created_at);
    return (
        <div className={styles.repo_card}>

            <div className={styles.card_left}>
                <div className={styles.img_container}>
                    <a href={repo.owner.html_url} target="_blank" rel="noopener noreferrer" >
                        <img src={repo.owner.avatar_url} loading="lazy" alt={repo.owner.login} title={repo.owner.login} />
                    </a>
                </div>
            </div>

            <div className={styles.card_right}>
                <h3>
                    <a href={repo.html_url} className="normalized_link" target="_blank" rel="noopener noreferrer">{repo.name}</a>
                </h3>
                <p className={styles.description}>{repo.description || "No Description Available"}</p>
                <b className={styles.info}>Stars : {repo.stargazers_count} &nbsp; Issues: {repo.open_issues_count}</b>
                <b className={styles.time}>Submitted {daysAgo.days} {daysAgo.postix} Ago</b>
            </div>

        </div>
    );
}

export default RepoCard;
