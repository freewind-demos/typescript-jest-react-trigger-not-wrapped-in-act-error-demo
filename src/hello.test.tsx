import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
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

  it('why no? 3', () => {
    // No "should be wrapped into act(...)" error but will cause following:
    //   Warning: Can't perform a React state update on an unmounted component.
    //   This is a no-op, but it indicates a memory leak in your application.
    //   To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    const asyncHandleValue = jest.fn((value) => new Promise<string>(resolve => setTimeout(() => resolve(`${value}!`), 0)))
    const wrapper = render(<Hello name='typescript' asyncHandleValue={asyncHandleValue}/>)
    const inputNode = wrapper.container.querySelector('input')!
    fireEvent.change(inputNode, { target: { value: 'react' } });
  })

  it('why has?', () => {
    // The reason cause the error:
    // the Promise is resolved immediately, without push to the next tick ?
    const asyncHandleValue = jest.fn((value) => Promise.resolve(`${value}!`))
    const wrapper = render(<Hello name='typescript' asyncHandleValue={asyncHandleValue}/>)
    const inputNode = wrapper.container.querySelector('input')!
    fireEvent.change(inputNode, { target: { value: 'react' } });
  })

  it('how to fix this error', async () => {
    const asyncHandleValue = jest.fn((value) => Promise.resolve(`${value}!`))
    const wrapper = render(<Hello name='typescript' asyncHandleValue={asyncHandleValue}/>)
    const inputNode = wrapper.container.querySelector('input')!
    fireEvent.change(inputNode, { target: { value: 'react' } });

    // Fix: use act to wait anything
    await act(async () => undefined)
  })

})
