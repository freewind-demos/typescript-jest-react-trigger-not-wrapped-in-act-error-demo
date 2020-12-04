import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Hello from './hello';

describe('"should be wrapped into act(...)" error', () => {

  it('why no? internal async function', () => {
    const wrapper = render(<Hello name='typescript'/>)
    const inputNode = wrapper.container.querySelector('input')!
    fireEvent.change(inputNode, { target: { value: 'react' } });
  });

  it('why no? manual made async function', () => {
    async function defaultAsyncHandleValue(v: string): Promise<string> {
      return new Promise(resolve => setTimeout(() => resolve(`${v}!`), 1000));
    }

    const wrapper = render(<Hello name='typescript' asyncHandleValue={defaultAsyncHandleValue}/>)
    const inputNode = wrapper.container.querySelector('input')!
    fireEvent.change(inputNode, { target: { value: 'react' } });
  })

  it('why no? setTimeout', async () => {
    const asyncHandleValue = jest.fn((value) => new Promise<string>(resolve => setTimeout(() => resolve(`${value}!`), 1000)));
    const wrapper = render(<Hello name='typescript' asyncHandleValue={asyncHandleValue}/>)
    const inputNode = wrapper.container.querySelector('input')!
    fireEvent.change(inputNode, { target: { value: 'react' } });
  })

})
