import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {

  const [senderName, setSenderName] = useState('');
  const [issue, setIssue] = useState('');
  const [complete] = useState(0);
  // const complete = 0;
  const [issuesList, setIssuesList] = useState([]);

  const submitIssue = () => {
    Axios.post("http://192.168.1.69:3001/api/insert", {
      senderName: senderName,
      issue: issue,
      complete: complete,
    }).then(() => {
      setIssuesList([...issuesList, { senderName: senderName, issue: issue, complete: 0 }])
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log(response.data);
      setIssuesList(response.data);
    })
  }, [])

  const updateList = () => {
    console.log("updating list")
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log(response.data);
      setIssuesList(response.data);
    })
  }

  // const updateComplete = () => {
  //   Axios.post("http://192.168.1.69:3001/api/insert", {
  //     complete: complete,
  //   }).then(() => {
  //     setIssuesList([...issuesList, { senderName: senderName, issue: issue, complete: complete }])
  //   });
  // }

  function updateComplete(id, completeStatus) {
    console.log(id, completeStatus);
    Axios.patch("http://192.168.1.69:3001/api/patch/complete", {
      complete: completeStatus,
      id: id,
    }).then(() => {
      // setIssuesList([...issuesList, { senderName: senderName, issue: issue, complete: complete }])
      updateList();
    });
  }

  return (
    <div className="App">
      <h1>Emil Zackrisson Ticket System</h1>

      <div className="form">
        <label htmlFor="senderName">Namn</label>
        <input type="text" name="senderName" onChange={(e) => {
          setSenderName(e.target.value)
        }} />
        <label htmlFor="senderIssue">Problem</label>
        <input type="text" name="senderIssue" onChange={(e) => {
          setIssue(e.target.value)
        }} />


        <button onClick={submitIssue}>Skicka</button>

        {issuesList.map((val) => {
          console.log(val);
          return (
            <div className="issueBox">
              <h1>ID: {val.id} | IssueSender: {val.senderName} | Issue: {val.issue} | Complete: {val.complete}</h1>
              <div className="completeDiv">
                <p>Mark as complete</p>
                <input type="checkbox" name="complete" id="completeCheck" checked={val.complete} onChange={(e) => {
                    if(val.complete === 1){
                      updateComplete(val.id, 0)
                    }
                    if(val.complete === 0){
                      updateComplete(val.id, 1)
                    }
                  
              }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
