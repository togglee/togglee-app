import * as React from "react"
import { useEffect } from "react"
import "./index.scss"
import { Provider, Heading, Subhead } from 'rebass'
import {
  Hero, CallToAction
} from 'react-landing-page'
import { useNavigate } from "@reach/router"
import { github } from "../../helpers/github"


const DefaultPage = ({ finishedLoading }) => {
  const navigate = useNavigate()
  useEffect(finishedLoading ,[finishedLoading]);
  const connect = () => {
    github
      .connect()
      .then(({ authId }) => {
        navigate("editor", {state: {authId}})
      })
      .catch(console.error);
  };
  return (<Provider>
    <Hero>
        <Heading>Togglee</Heading>
        <Subhead>Online Editor For Gist Based Toggles</Subhead>
        <CallToAction onClick={() => connect()} mt={3}>Login With Github</CallToAction>
    </Hero>
    </Provider>)
}

export const Default = (props) => <DefaultPage {...props} />;
