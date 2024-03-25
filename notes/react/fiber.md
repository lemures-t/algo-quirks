## fiber

react.CreateElement -> fiberNode Tree

fiberNode return, child, sibling
firstEffect， lastEffect, nextEffect

构造过程是一个深度优先遍历，performUnitOfWork 包含了 beginWork completeWork 
beginWork，根据节点类型构造节点
  有子节点，深度遍历子节点
  没有子节点的时候，completeWork, 收集当前节点的 effect，如果有增删改，则挂载到父节点上
completeWork 结束之后，看看是否有兄弟节点，有的话继续 performUnitOfWork，没有的话，返回父节点


### 双缓冲 
* current Tree VS workInProgress ; 根结点都是 HostRootFiber 
* TreeFiberRoot.current 在 workInProgress 树构造完成之后，指向 workInProgress Tree

### 优先级 - Lane 赛道模式，位运算
* update 优先级
* rendering 优先级

### 栈帧
用来存储和恢复每一次Fiber树构建的上下文


### 更新时，对比构造
* setState，状态 hook dispatch，render
* 触发调度任务
* markUpdateLaneFromFiberToRoot，从更新的节点开始，向上找出受到本次update影响的所有节点,
* 从上到下开始构造
  * reconcileChildren diff 算法，计算出 effect，核心是对可迭代序列，进行两次遍历
  > https://7km.top/algorithm/diff/

### 渲染 CommitRoot
具体从渲染前, 渲染, 渲染后三个方面分解了commitRootImpl函数. 

其中最核心的渲染逻辑又分为了 3 个函数, 这 3 个函数共同处理了有副作用fiber节点, 并通过渲染器react-dom把最新的 DOM 对象渲染到界面上.
#### 核心
处理 HostRootFiber 的副作用
处理 HostComponent 需要更新的 DOM 节点？
#### 过程
* commitBeforeMutationEffects
dom 变更之前, 处理副作用队列中带有Snapshot,Passive标记的fiber节点
对于ClassComponent类型节点, 调用了instance.getSnapshotBeforeUpdate生命周期函数
对于HostRoot类型节点, 调用clearContainer清空了容器节点(即div#root这个 dom 节点).
* commitMutationEffects
dom 变更, 界面得到更新. 处理副作用队列中带有Placement, Update, Deletion, Hydrating标记的fiber节点.
最终调用 react-dom 中的 dom 操作
* commitLayoutEffects
dom 变更后, 处理副作用队列中带有Update | Callback标记的fiber节点.
对于ClassComponent节点, 调用生命周期函数componentDidMount或componentDidUpdate, 调用update.callback回调函数.
对于HostComponent节点, 如有Update标记, 需要设置一些原生状态(如: focus等)
