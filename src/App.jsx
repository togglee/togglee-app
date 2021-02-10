import React from "react";
import { Router, navigate } from "@reach/router";
import {Navbar, Modal} from "react-bootstrap";
import { Default } from "./components/default/index.jsx"
import { useState } from 'react'
import { Grid } from 'svg-loaders-react'
import './App.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from "@fortawesome/free-regular-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"

library.add(fab, far, fas)

const Loading = ({ Component, ...rest }) =>{
  const [isLoading,setIsLoading] = useState(true);
  return (<>
    <Component {...rest} finishedLoading={(err) => {
      setIsLoading(false)
      if(err)
        navigate(`/error/${err}`)
    }} />
    <Modal
        show={isLoading}
        keyboard={false}
        backdrop="static"
        size="sm"
        centered
      >
        <Modal.Body>
          <Grid />
        </Modal.Body>
      </Modal>
    </>)
}

const PublicRoute = ({ ...rest }) => (
  <Loading {...rest} />
);

const App = () => {
  return (<div id="main">
    <Navbar>
      <Navbar.Brand href="/">
        <img
          alt=""
          src="./logo.webp"
          width="110"
          height="42"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
    </Navbar>
   <Router>
     <PublicRoute default path="default" Component={Default} />
   </Router>
 </div>)
 };

export default App;
