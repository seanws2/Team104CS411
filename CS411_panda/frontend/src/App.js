import './App.css';
import Axios from 'axios';
import React, { useState, useEffect } from "react";
import axios from 'axios';



function App() {
  const [Name, setName] = useState('');
  const [Rank, setRank] = useState('');
  const [newRank, setNewRank] = useState('');
  const [TeamList, setTeamList] = useState([]);
  const [advQuery, setAdvQuery] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [rankList, setRankList] = useState([]);

  const URL = `http://localhost:3003`;

  const advQueryFunc = () => {
    axios.get(URL + `/api/advQuery`).then((response) => {
      setAdvQuery(response.data);
    })   
  };

  const searchReviewRank = () => {
    Axios.post(URL + `/api/rank`, {
      Rank: Rank
    }).then((response) => {
      setRankList(response.data)
    });

  };

  const searchReviewName = () => {
    Axios.post(URL + `/api/search`, {
      Name: Name
    }).then((response) => {
      setSearchList(response.data)
    });

  };

  const submitReview = () => {
    Axios.post(URL + `/api/insert`, {
      Name: Name,
      Rank: Rank,
    }).then(() => {
      alert('success alert')
    });

    setTeamList([
      ...TeamList,
      {
        Name: Name,
        Rank: Rank
      },
    ]);
  };

  const deleteReview = (Name) => {
    Axios.delete(URL + `/api/delete/${Name}`).then(() => {
      alert('success alert')
    });
  };

  const updateReview = (Name) => {
    Axios.put(URL + `/api/update`, {
      Name: Name,
      Rank: newRank
    }).then(() => {
      alert('success alert')
    });
    setNewRank("")
  };


  return (
    <div className="form">
      <h1>CRUD Applications</h1>
      <div className="form">
        <label>Insert Team</label>
        <input type="text" name="Name" onChange={(e) => {setName(e.target.value)}}/>
        <label>Insert Rank</label>
        <input type="text" name="Rank" onChange={(e) => {setRank(e.target.value)}}/>
        <button onClick={submitReview}>Submit</button>
      </div>
      <div>
      <label>Search By Name</label>
      <input type="text" id="searchInputName" onChange={(e) => {
                setName(e.target.value)
              } }></input>
      <button onClick={searchReviewName}> Search</button>
      </div>
      {searchList.map(item => {
        return (
          <div className="card1">
            <p>Team Name: {item.name}, Team Rank: {item.rank}</p>
          </div>
        );
      })
      }
      <div>
      <label>Search By Rank</label>
      <input type="text" id="searchInputRank" onChange={(e) => {
                setRank(e.target.value)
              } }></input>
      <button onClick={searchReviewRank}> Search</button>
      </div>
      {rankList.map(item => {
        return (
          <div className="card1">
            <p>Team Name: {item.name}, Team Rank: {item.rank}</p>
          </div>
        );
      })
      }
      {TeamList.map(team => {
        return (

          <div className="card">
            <p>Team Name: {team.Name}, Team Rank: {team.Rank}</p>
            <button onClick={() => {deleteReview(team.Name)}}>Delete</button>
            <input type="text" id="updateInput" onChange={(e) => {
                setNewRank(e.target.value)
              } }/>
            <button onClick={() => {
                updateReview(team.Name)
              }}> Update</button>
          </div>
        );
      })}

      {advQuery.map(query => {
        return(
          <div>
            <p>Name: {query.name}, Average Placement: {query.AvgPlacement}</p>

          </div>
        );
      })

      }

      <div>
        <button onClick={advQueryFunc}> Advanced Query </button>
      </div>
      
    </div>
  );
};

export default App;
