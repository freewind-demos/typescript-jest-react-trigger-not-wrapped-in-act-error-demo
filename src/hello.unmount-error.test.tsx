import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Hello from './hello';

describe('"should be wrapped into act(...)" error', () => {

  it('unmount', () => {
    // No "should be wrapped into act(...)" error but will cause following:
    //   Warning: Can't perform a React state update on an unmounted component.
    //   This is a no-op, but it indicates a memory leak in your application.
    //   To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

    // Update: it's strange the above error is not appeared anymore if I move this test case in a separate file

    const asyncHandleValue = jest.fn((value) => new Promise<string>(resolve => setTimeout(() => resolve(`${value}!`), 1000)))
    const wrapper = render(<Hello name='typescript' asyncHandleValue={asyncHandleValue}/>)
    const inputNode = wrapper.container.querySelector('input')!
    fireEvent.change(inputNode, { target: { value: 'react' } });
  })

})
