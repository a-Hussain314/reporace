import React from 'react';
import RepoCard from "./RepoCard";

function ReposList({ reposList }) {
    return (
        <div>
        {
          reposList.map((repo, index) => {
            return (
              <RepoCard key={index} repo={repo}/>
              )
          })
        }
      </div>
    );
}

export default ReposList;
