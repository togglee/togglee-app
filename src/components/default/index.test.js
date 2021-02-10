import * as React from 'react'
import { Default } from './index'
import { mount } from 'enzyme'

describe('default page', () => {
    it('Has correct messages and called finish loading', async () => {
      const finishedLoadingMock = jest.fn();
      const wrapper = mount(<Default finishedLoading={finishedLoadingMock}/>)
      expect(wrapper.text()).toBe("Welcome to Togglee Generator")
      expect(finishedLoadingMock).toHaveBeenCalled()
    })
})

