>  https://7km.top/main/state-effects/

## 状态与副作用
通过暴露api的方式，修改 Fiber 的状态与副作用

### class 组件

* 状态相关: fiber树构造阶段.
构造函数: constructor实例化时执行, 可以设置初始 state, 只执行一次.
生命周期: getDerivedStateFromProps在fiber树构造阶段(renderRootSync[Concurrent])执行, 可以修改 state(链接).
生命周期: shouldComponentUpdate在, fiber树构造阶段(renderRootSync[Concurrent])执行, 返回值决定是否执行 render(链接).

* 副作用相关: fiber树渲染阶段.
生命周期: getSnapshotBeforeUpdate在fiber树渲染阶段(commitRoot->commitBeforeMutationEffects->commitBeforeMutationEffectOnFiber)执行(链接).
生命周期: componentDidMount在fiber树渲染阶段(commitRoot->commitLayoutEffects->commitLayoutEffectOnFiber)执行(链接).
生命周期: componentDidUpdate在fiber树渲染阶段(commitRoot->commitLayoutEffects->commitLayoutEffectOnFiber)执行(链接).

### function 组件

* 状态相关: fiber树构造阶段.
useState在fiber树构造阶段(renderRootSync[Concurrent])执行, 可以修改Hook.memoizedState.

* 副作用相关: fiber树渲染阶段.
useEffect在fiber树渲染阶段(commitRoot->commitBeforeMutationEffects->commitBeforeMutationEffectOnFiber)执行(注意是异步执行, 链接).
useLayoutEffect在fiber树渲染阶段(commitRoot->commitLayoutEffects->commitLayoutEffectOnFiber->commitHookEffectListMount)执行(同步执行, 链接).


## hook

* 引入Hook的动机? - 为什么
在组件之间复用状态逻辑很难;
复杂组件变得难以理解，HOC 和 renderProps 嵌套地狱;
难以理解的 class，但class有完整生命周期
> https://juejin.cn/post/6965383640868093960

* Hook 是什么? 什么时候会用 Hook? - 是什么
Hook 是一个特殊的函数, 它可以让你“钩入” React 的特性. 如, useState 是允许你在 React 函数组件中添加 state 的 Hook.
如果你在编写函数组件并意识到需要向其添加一些 state, 以前的做法是必须将其转化为 class. 现在你可以在现有的函数组件中使用 Hook.

* Hook 会因为在渲染时创建函数而变慢吗?
不会. 在现代浏览器中,闭包和类的原始性能只有在极端场景下才会有明显的差别. 除此之外,可以认为 Hook 的设计在某些方面更加高效:
Hook 避免了 class 需要的额外开支,像是创建类实例和在构造函数中绑定事件处理器的成本.
符合语言习惯的代码在使用 Hook 时不需要很深的组件树嵌套. 这个现象在使用高阶组件、render props、和 context 的代码库中非常普遍. 组件树小了, React 的工作量也随之减少.
所以Hook是React团队在大量实践后的产物, 更优雅的代替class, 且性能更高. 故从开发使用者的角度来讲, 应该拥抱Hook所带来的便利.

* 状态hook、副作用hook、组合hook - 分类

* 结构
fiber.memorizedState -> hook - next -> hook
更新时 WIP 树 在构造时，触发 hook 构造，WIP 的 hook 指针与 current 的 hook 指针，移动，clone
**不能在 if 中用 clone**
WIP 的 hook 少，current hook 多，指针移动，clone时，WIP后面的一个 hook 会克隆成 current 前面的 hook 造成错乱

* 处理过程
function类型的fiber节点, 它的处理函数是updateFunctionComponent, 其中再通过renderWithHooks调用function.
在function中, 通过Hook Api(如: useState, useEffect)创建Hook对象.
  状态Hook实现了状态持久化(等同于class组件维护fiber.memoizedState).
  副作用Hook则实现了维护fiber.flags,并提供副作用回调(类似于class组件的生命周期回调)
多个Hook对象构成一个链表结构, 并挂载到fiber.memoizedState之上.
fiber树更新阶段, 把current.memoizedState链表上的所有Hook按照顺序克隆到workInProgress.memoizedState上, 实现数据的持久化.



## state hook
状态Hook实现了状态持久化(等同于class组件维护fiber.memoizedState).
本质和 useReducer 一样，返回 hook.memorizedState, 和 dispatch
每次 update 存 queue.pending 链表中，按优先级合并到 baseQueue 里面，做计算

## effect hook
副作用Hook则实现了维护fiber.flags,并提供副作用回调(类似于class组件的生命周期回调)
pushEffect 写到 hook.memorizedState 中，挂载到 fiber.updateQueue.lastEffect 下 形成环形链表

### 初次渲染
* commitBeforeMutationEffects
dom 变更之前, 处理副作用队列中带有Passive标记 (useEffect) 的fiber节点, flushPassiveEffects，触发一个调度（异步执行）
* commitMutationEffects
dom 变更, 界面得到更新.
commitHookEffectListUnmount，处理 useLayoutEffect 的 hook，如果有 hook.destory 方法，调用 hook.destory 
* commitLayoutEffects
commitHookEffectListMount，处理 useLayoutEffect 的 hook，如果有 hook.destory = hook.create()
添加 useEffect 回调到 pendingPassiveHookEffectsUnmount 和 pendingPassiveHookEffectsMount 中

flushPassiveEffects 异步执行，先 destroy 再 create

### 更新
对 deps 进行 diff，不一致的打 HookHasEffect 标
都会先执行 destroy
打了 HookHasEffect 标的会再执行 hook.destory = hook.create()