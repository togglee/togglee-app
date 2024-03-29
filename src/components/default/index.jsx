import * as React from "react"
import { useEffect } from "react"
import "./index.scss"
import { Provider, Heading, Subhead } from 'rebass'
import {
  Hero, CallToAction, ScrollDownIndicator
} from 'react-landing-page'

const TOGGLE_TYPES = ["release", "context"]
const OPERATIONS_TYPES = ["eq", "ne", "gt", "ge", "lt", "le"]

const DefaultPage = ({ finishedLoading }) => {
  useEffect(finishedLoading ,[finishedLoading]);
  return (<Provider>
    <Hero
      backgroundImage="switch.jpg"
    >
        <Heading>Toggle</Heading>
        <Subhead>simple feature toggles</Subhead>
        <CallToAction href="/getting-started" mt={3}>Get Started</CallToAction>
        <ScrollDownIndicator/>
    </Hero>
    </Provider>)
}

export const Default = (props) => <DefaultPage {...props} />;
