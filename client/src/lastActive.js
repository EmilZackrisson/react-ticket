import settings from "./settings.json"; // Set server url here
import Axios from "axios";

function lastActive(){
    const userStorage = localStorage.getItem("user");
    if (userStorage) {
      const loggedInUser = JSON.parse(userStorage);
      // setUser(foundUser);
      console.log("local storage: ", loggedInUser);



      Axios.post(settings.SERVER_URL + "/api/userActive", {
        email: loggedInUser.email,
      })
        .then(() => {
          console.log("user active updated");
          window.location.reload(false);
        })
        .catch((error) => {
          console.log("det gick inte att skicka");
          console.log(error.message);
          if (error.message === "Request failed with status code 406") {
            alert("Error 406. Testa att skicka igen.");
          }
        });
    }
}

export default lastActive;