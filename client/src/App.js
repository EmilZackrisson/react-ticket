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

  console.log("docker env: ", process.env.MYSQL_HOST);

  //react hook form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // const process.env.MYSQL_HOST = process.env.MYSQL_HOST;
  // console.log("mysql host: ",process.env.MYSQL_HOST);

  const onSubmit = data => {
    console.log(data);
    setSenderName(data.Namn);
    setSenderEmail(data.Email);
    setIssue(data.Problem);

    if (debug) {
      console.log("sender name: ", senderName);
      console.log('issue: ', issue);
    }
    submitIssue();
  }

  // const onSubmitUpdate = data => {
  //   console.log(data);
  //   setSenderName(data.Namn);
  //   setSenderEmail(data.Email);
  //   setIssue(data.Problem);
  //   submitIssue();
  // }

  console.log(errors);


  const submitIssue = () => {
    if (debug) {
      console.log("submit issue run")
    }
    Axios.post("http://localhost:3001/api/insert", {
      senderName: senderName,
      issue: issue,
      complete: complete,
      senderEmail: senderEmail,
    }).then(() => {
      setIssuesList([...issuesList, { senderName: senderName, senderEmail: senderEmail, issue: issue, complete: 0 }]);
      setTimeout(50);
      updateList();
      if (debug) {
        // window.location.reload(false)
        console.log("submit issue sent")
      }

    }).catch((error) => {
      console.log(error.message);
      if (error.message === "Request failed with status code 406") {
        alert("Error 406. Testa att skicka igen.")
      }
    });
  };

  useEffect(() => {
    console.log("Debug mode: ", debug);
    Axios.get("http://localhost:3001/api/get").then((response) => {
      if (debug) {
        console.log(response.data)
      }
      setIssuesList(response.data);
    })
  }, [])

  const updateList = () => {
    console.log("updating list")
    Axios.get("http://localhost:3001/api/get").then((response) => {
      if (debug) {
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
    if (debug) {
      console.log(id, completeStatus)
    }
    // console.log(id, completeStatus);
    Axios.post("http://localhost:3001/api/patch/complete", {
      complete: completeStatus,
      id: id,
    }).then(() => {
      // setIssuesList([...issuesList, { senderName: senderName, issue: issue, complete: complete }])
      updateList();
      if (debug) {
        console.log("update complete ran")
      }
    });
  }

  function updateIssue(id, issue) {
    // console.log(id, completeStatus);
    Axios.patch("http://localhost:3001/api/patch/issue", {
      issue: issue,
      id: id,
    }).then(() => {
      // setIssuesList([...issuesList, { senderName: senderName, issue: issue, complete: complete }])
      updateList();
    });
  }

  function deleteIssue(id) {
    console.log(id, "delete");
    Axios.post("http://localhost:3001/api/delete/issue", {
      id: id,
    }).then(() => {
      // setIssuesList([...issuesList, { senderName: senderName, issue: issue, complete: complete }])
      updateList();
    });
  }


  return (
    <div className="flex justify-center flex-col items-center w-full">
      <div className="bg-yellow-100 rounded-lg py-5 px-6 mb-3 text-base text-yellow-700 inline-flex items-center w-full" role="alert">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-triangle" className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path fill="currentColor" d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path>
        </svg>
        Denna applikation är fortfarande i alpha, den kanske inte alltid fungerar som den ska.
      </div>
      <header className="w-full">
        <div className="text-center bg-gray-50 text-gray-800 py-20 px-6">
          <h1 className="text-5xl font-bold mt-0 mb-6">Emil Ticket System</h1>
          <h3 className="text-3xl font-bold mb-8">Hemmagjort ticket-system byggt med React, NodeJS och MySQL</h3>
          {/* <a className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light" href="#!" role="button">Get started</a> */}
        </div>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} id="formSubmit" className="block p-6 rounded-lg shadow-lg bg-white w-10/12">
        <div className="form-group mb-6">
          <input type="text" placeholder="Namn" {...register("Namn", { required: true })} className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
          <input type="email" placeholder="E-mail" {...register("Email", { required: true })} className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5" />
          <input type="text" placeholder="Problem" {...register("Problem", { required: true })} className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5" />

        </div>

        <input type="submit" className="w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out " />
      </form>




      {issuesList.map((val) => {
        // console.log(val);

        const mailto = "mailto:" + val.senderEmail;


        return (
          // <div className="issueBox">
          //   <h2>ID: {val.id} | IssueSender: {val.senderName} | Sender Email: {val.senderEmail} | Issue: {val.issue} | Complete: {val.complete}</h2>
          //   <div className="completeDiv">
          //     <label htmlFor="complete" className="label">Markera som klar</label>
          //     <input type="checkbox" className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointe" name="complete" id="completeCheck" checked={val.complete} onChange={(e) => {
          //       if (val.complete === 1) {
          //         updateComplete(val.id, 0)
          //       }
          //       if (val.complete === 0) {
          //         updateComplete(val.id, 1)
          //       }
          //     }} />
          //     <div>
          //       <form>
          //         <label htmlFor="updateIssue" className="label">Uppdatara problem</label>
          //         <input type="text" name="updateIssue" required onChange={(e) => {
          //           setIssueUpdate(e.target.value)
          //         }} />
          //         <button className="btnIssues" onClick={() => updateIssue(val.id, issueUpdate)}>Uppdatera</button>
          //       </form>
          //       <button name="btnDelete" className="btnIssues" onClick={() => deleteIssue(val.id)}>Ta bort</button>

          //     </div>

          //   </div>
          // </div>

          <div className="flex justify-center mt-10 w-full">
            <div className="block p-6 rounded-lg shadow-lg bg-white w-6/12">
            <div className="float-right fixed bg-red-600 w-100 h-2"></div>
              <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">#{val.id} {val.issue}</h5>
              <p className="text-gray-700 text-base mb-2">
                {val.issue}
              </p>
              <p className="text-gray-700 text-base mb-4">
                {val.senderName} - <a href={mailto}>{val.senderEmail}</a>
                </p>

              <div className="flex flex-row items-center">
                <div className="form-check flex items-center">
                  <input checked={val.complete} onChange={(e) => {
                    if (val.complete === 1) {
                      updateComplete(val.id, 0)
                    }
                    if (val.complete === 0) {
                      updateComplete(val.id, 1)
                    }
                  }}
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200  bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" />
                  <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault">
                    Markera som klar
                  </label>
                </div>
                <div className="mb-3  xl:w-96 flex gap-3 ml-5 items-center">
                  <input
                    type="text"
                    className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                    id="exampleText0"
                    placeholder="Uppdatera problem"
                    onChange={(e) => {
                      setIssueUpdate(e.target.value)
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => updateIssue(val.id, issueUpdate)}
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >Uppdatera</button>
                  <button
                    type="button"
                    onClick={() => deleteIssue(val.id)}
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                  >Ta bort</button>
                </div>
              </div>

            </div>
          </div>
        )
      })}

    </div>
  );
}

export default App;
