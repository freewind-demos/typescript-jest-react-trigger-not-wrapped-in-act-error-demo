import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Hello from './hello';

describe('"should be wrapped into act(...)" error', () => {

  it('Promise.resolve directly', async () => {
    const asyncHandleValue = jest.fn((value) => Promise.resolve(value));
    const wrapper = render(<Hello name='typescript' asyncHandleValue={asyncHandleValue}/>)
    const inputNode = wrapper.container.querySelector('input')!
    fireEvent.change(inputNode, { target: { value: 'react' } });

    // Fix: use act to wait anything
    // await act(async (): Promise<void> => undefined)
  })

  // it('setTimeout', async () => {
  //   const asyncHandleValue = jest.fn((value) => new Promise<string>(resolve => setTimeout(() => resolve(`${value}!`), 1000)));
  //   const wrapper = render(<Hello name='typescript' asyncHandleValue={asyncHandleValue}/>)
  //   const inputNode = wrapper.container.querySelector('input')!
  //   fireEvent.change(inputNode, { target: { value: 'react' } });
  //
  //   // Fix: use act to wait anything
  //   await act(async (): Promise<void> => undefined)
  // })

})
