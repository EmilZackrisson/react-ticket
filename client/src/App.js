import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import "./App.css";
import Axios from "axios";

function App() {

  const [senderName, setSenderName] = useState('');
  const [issue, setIssue] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [complete] = useState(0);
  // const complete = 0;
  const [issuesList, setIssuesList] = useState([]);

  const [issueUpdate, setIssueUpdate] = useState('');

  const debug = true;

  //react hook form
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
    setSenderName(data.Namn);
    setSenderEmail(data.Email);
    setIssue(data.Problem);

    if(debug){
      console.log("sender name: ", senderName);
      console.log('issue: ', issue);
    }
    submitIssue();
  }

  const onSubmitUpdate = data => {
    console.log(data);
    setSenderName(data.Namn);
    setSenderEmail(data.Email);
    setIssue(data.Problem);
    submitIssue();
  }

  console.log(errors);


  const submitIssue = () => {
    if(debug){
      console.log("submit issue run")
    }
    Axios.post("http://192.168.1.69:3001/api/insert", {
      senderName: senderName,
      issue: issue,
      complete: complete,
      senderEmail: senderEmail,
    }).then(() => {
      setIssuesList([...issuesList, { senderName: senderName, senderEmail: senderEmail, issue: issue, complete: 0 }]);
      if(debug){
        console.log("submit issue sent")
      }

    }).catch((error) => {
      console.log(error.message);
      if(error.message == "Request failed with status code 406"){
        alert("Error 406. Testa att skicka igen.")
      }
    });
  };

  useEffect(() => {
    console.log("Debug mode: ", debug);
    Axios.get("http://localhost:3001/api/get").then((response) => {
      if(debug){
        console.log(response.data)
      }
      setIssuesList(response.data);
    })
  }, [])

  const updateList = () => {
    console.log("updating list")
    Axios.get("http://localhost:3001/api/get").then((response) => {
      if(debug){
        console.log(response.data)
      }
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
    if(debug){
      console.log(id, completeStatus)
    }
    // console.log(id, completeStatus);
    Axios.patch("http://192.168.1.69:3001/api/patch/complete", {
      complete: completeStatus,
      id: id,
    }).then(() => {
      // setIssuesList([...issuesList, { senderName: senderName, issue: issue, complete: complete }])
      updateList();
      if(debug){
        console.log("update complete ran")
      }
    });
  }

  function updateIssue(id, issue) {
    // console.log(id, completeStatus);
    Axios.patch("http://192.168.1.69:3001/api/patch/issue", {
      issue: issue,
      id: id,
    }).then(() => {
      // setIssuesList([...issuesList, { senderName: senderName, issue: issue, complete: complete }])
      updateList();
    });
  }


  return (
    <div className="App">
      <h1>Emil Zackrisson Ticket System</h1>

      {/* <div className="form">
        <label htmlFor="senderName">Namn</label>
        <input type="text" name="senderName" required onChange={(e) => {
          setSenderName(e.target.value)
        }} />
        <label htmlFor="senderIssue">Problem</label>
        <input type="text" name="senderIssue" required onChange={(e) => {
          setIssue(e.target.value)
        }} />
        <label htmlFor="senderEmail">E-mail</label>
        <input type="email" name="senderEmail" required onChange={(e) => {
          setSenderEmail(e.target.value)
        }} />
        <button onClick={submitIssue}>Skicka</button>
      </div> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Namn" {...register("Namn", { required: true })} />
        <input type="email" placeholder="E-mail" {...register("Email", { required: true })} />
        <input type="text" placeholder="Problem" {...register("Problem", { required: true })} />

        <input type="submit" />
      </form>



      {issuesList.map((val) => {
        // console.log(val);


        return (
          <div className="issueBox">
            <h1>ID: {val.id} | IssueSender: {val.senderName} | Sender Email: {val.senderEmail} | Issue: {val.issue} | Complete: {val.complete}</h1>
            <div className="completeDiv">
              <p>Mark as complete</p>
              <input type="checkbox" name="complete" id="completeCheck" checked={val.complete} onChange={(e) => {
                if (val.complete === 1) {
                  updateComplete(val.id, 0)
                }
                if (val.complete === 0) {
                  updateComplete(val.id, 1)
                }
              }} />
              <div>
                <form>
                  <label htmlFor="updateIssue">Uppdatara problem</label>
                  <input type="text" name="updateIssue" required onChange={(e) => {
                    setIssueUpdate(e.target.value)
                  }} />
                  <button onClick={() => updateIssue(val.id, issueUpdate)}>Uppdatera</button>
                </form>

              </div>

            </div>
          </div>
        )
      })}

    </div>
  );
}

export default App;
