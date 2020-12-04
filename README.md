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

更新发现：
1. 如果在测试里使用`Promise.resolve`定义async function，可能因为它没有把异步操作推迟到下一个tick，而导致该错误提醒，内部原理不明
2. 如果使用`Promise.resolve`加上`setTimeout(() => {}, 0)`，不再触发该提醒，但是会另一个错误提醒，大意是在unmount之后不应该更新state
   更新：很奇怪当我把这个测试单独放在一个测试文件后，不再提醒unmount错误。之前可能是同文件中其它用例互相干扰
3. 为了解决这两个错误，可以通过添加一个 `await act(async () => undefine)` 增加一些等待，具体参看下面的url

https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning#an-alternative-waiting-for-the-mocked-promise

与其不同的是，只需要await任意一个变量（比如undefined），即可。

```
npm install
npm run test
```
