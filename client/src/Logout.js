import React, { useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

function Logout() {


    useEffect(() => {
        localStorage.clear();
      }, [])




    return (
        <>
            <h1>Du är nu utloggad!</h1>
        </>
    );
}

export default Logout;