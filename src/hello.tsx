import React, { useState } from 'react'

type Props = {
  name: string
  asyncHandleValue?: (value: string) => Promise<string>
}

async function defaultAsyncHandleValue(v: string): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`${v}!`)
    }, 1000);
  })
}

export default function Hello({ name, asyncHandleValue = defaultAsyncHandleValue }: Props) {

  // should have a internal state
  const [someState, setSomeState] = useState(name);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget?.value;

    // should have an async operation
    // 'asyncHandleValue' should be mocked from jest.fn
    const fixedValue = await asyncHandleValue(value);
    // the state should be updated after unmount
    setSomeState(fixedValue);
  }

  return <div>
    {/* {someState} should be used in DOM*/}
    <div>Hello, {someState}</div>
    <input type='text' value={name} onChange={handleChange}/>
  </div>
};

