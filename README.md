TypeScript Jest React Trigger "not wrapped in act(...)" Error Demo
==================================================================

为了在测试中触发以下error:

```
 Warning: An update to Hello inside a test was not wrapped in act(...).
    
    When testing, code that causes React state updates should be wrapped into act(...):
    
    act(() => {
      /* fire events that update state */
    });
    /* assert on the output */
```

需要满足以下条件：

1. 在Hello组件中使用`setState`
2. 其值要在DOM中有显示
3. 组件里应该有一个异步操作，在测试结束后unmount之后更新state
4. 奇怪的是这里：这个async操作需要是一个jest.fn生成的mock才能触发

```
npm install
npm run test
```
