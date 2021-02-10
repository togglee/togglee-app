import React from 'react';

import { Default } from './index';

export default {
  title: 'Default/default',
  component: Default,
};

const Template = (args) => <Default {...args} />;

export const defaultView = Template.bind({});
defaultView.args = {
  finishedLoading: ()=> console.log("finish loading"),
};
