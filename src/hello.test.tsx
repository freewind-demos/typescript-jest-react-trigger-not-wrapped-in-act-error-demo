import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Hello from './hello';


describe('"should be wrapped into act(...)" error', () => {

  it('why no?', () => {
    const wrapper = render(<Hello name='typescript'/>)
    const inputNode = wrapper.container.querySelector('input')!
    fireEvent.change(inputNode, { target: { value: 'react' } });
  });

  it('why no? 2', () => {
    async function defaultAsyncHandleValue(v: string): Promise<string> {
      return new Promise(resolve => setTimeout(() => resolve(`${v}!`), 1000));
    }

    const wrapper = render(<Hello name='typescript' asyncHandleValue={defaultAsyncHandleValue}/>)
    const inputNode = wrapper.container.querySelector('input')!
    fireEvent.change(inputNode, { target: { value: 'react' } });
  })

  it('why has?', () => {
    // Strange: Only the `jest.fn` will trigger the "not wrapped in act" error
    const asyncHandleValue = jest.fn((value) => Promise.resolve(value.toUpperCase()))
    const wrapper = render(<Hello name='typescript' asyncHandleValue={asyncHandleValue}/>)
    const inputNode = wrapper.container.querySelector('input')!
    fireEvent.change(inputNode, { target: { value: 'react' } });
  })

})
