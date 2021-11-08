import Pizzly from "pizzly-js"

const PIZZLY_HOSTNAME = "togglee-pizzly.herokuapp.com";
const PIZZLY_PUBLISHABLE_KEY = "0356cb22-f7f8-4622-89dc-a0b84340e9ef";
const PIZZLY_SETUP_ID_GITHUB_DEMO_APP = "953f55cb-209a-4d05-ac14-9b0d115b63ba";

// Initialize Pizzly
const pizzly = new Pizzly({
  host: PIZZLY_HOSTNAME,
  publishableKey: PIZZLY_PUBLISHABLE_KEY
});

export const github = pizzly.integration("github", {
  setupId: PIZZLY_SETUP_ID_GITHUB_DEMO_APP
});