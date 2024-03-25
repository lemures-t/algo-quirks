## 调度
> https://7km.top/main/scheduler/
> react 用 messageChannel 做调度器
>   * https://juejin.cn/post/6953804914715803678
>   * https://juejin.cn/post/7039646834477760548#heading-3 // requestIdleCallback fps 只有20，fps需要>=60, requestAnimationFrame 在渲染前执行，不稳定，可能 n 次 loop 才执行一次
>   * https://juejin.cn/post/6844903975112671239
>   * https://github.com/funfish/blog/issues/30 // 一帧的生命周期
> 宏任务与微任务
>   * https://juejin.cn/post/6844904095199789069
>   * https://juejin.cn/post/7202211586676064315
>   * https://zhuanlan.zhihu.com/p/449183802
        * promise.then fullfill 之后立即加入微任务队列（不执行）
        * pending 状态不会加入微任务队列


#### 代码
```javascript
taskQueue = [];

// 创建一个任务
unstable_scheduleCallback ->
  new task
    timeout map by priorityLevel
    expirationTime = startTime + timeout; // 任务创建的时间戳 + 任务任务优先级得到的耗时毫秒数
  // 加入任务队列
  push task into taskQueue // 如果还在当前的调度里面，会在 workloop 里被消费
  // 执行调度
  requestHostCallBack(flushWork) ->
    // 记录一下 flushWork
    scheduledHostCallback = flushWork
    // 调度是否在执行中
    isMessageLooRnning false ->
      isMessageLooRnning = true
      // 通过 messageChannel 发送消息
      port.postMessage()

// 监听消息，执行任务
port.onmessage = performWorkUntilDeadline() ->
  scheduledHostCallback exist ->
    hasMoreWork = scheduledHostCallback()
    hasMoreWork true -> 
      // 如果有更多的任务，继续执行
      call port.postMessage()
    else
      // 如果没有了，则退出当前调度 
      isMessageLoopRunning = false
      scheduledHostCallback = null
  else
    // 退出当前调度
    scheduledHostCallback = null // 暴露了 cancelHostCallback() -> scheduledHostCallback = null，如果外部调用，则调度会被停止

flushWork ->
  // 循环消费队列
  workLoop (hasTimieRemaining) ->
    currentTask = peek from taskQueue
    while currentTask exist do loop ->
      
      // 终止当前的 while 循环，js 执行结束，交还控制权给浏览器（渲染，做回流和重绘）, 代码会在 34 行这里去再触发一个postMessage
      // 因为是 postMessage 对应的 onmessage 是宏任务，会在浏览器的 next eventLoop (执行完所有微任务与回流和重绘之后的下一个 loop) 中执行，
      // 这样就串联起了夸宏任务的调度器，在当前宏任务里面的 onmessage 里面触发下一个宏任务

      // isTimeout =  expirationTime > currentTime
      isTimeout && (shouldYieldToHost() || hasTimeRemaining) ->
        break;
      // 任务有回调
      currentTask.callback exist ->
        callback is a function ->
          // excute currentTask
          continuationCallback = callback(currentTask.expirationTime <= currentTime)
          continuationCallback is a function ->
            currentTask.callback = continuationCallback // 直接到 59 行，继续 loop
        pop currentTask from taskQueue
      // 任务无回调，就是被中断了
      else 
        pop currentTask from taskQueue
      currentTask = peek from taskQueue

    return currentTask isnot null ---> hasMoreWork
```

#### 过程
任务队列
基于 messageChannel 的调度
workloop 消费任务队列

创建任务，加入任务队列，
  如果没有调度，则发起调度 ->
    调度会调用 workloop 消费任务队列，
      如果没消费完，超时或者有 scheduling.isInputPending 了，workloop 停止，发起另一个调度
      如果消费完了，终止当前的调度
  如果有调度，则不处理，继续在上一个调度中，用 workloop 消费任务队列


核心思想，任务队列的消费进度，由不同的调度来切割，调度间的切割，要看上一个任务处理完之后，是否超时或者有 scheduling.isInputPending ，

#### 为什么用 messageChannel
* 多次 setTimeout 会有 4ms 延迟
* requestIdleCallback 1秒最多调用 20 次，fps 只有 20，如果没有空闲时间了，不一定每一帧都执行
* requestAnimationFrame 在渲染（layout和render）前执行，仍然可能会阻塞渲染，且不一定每帧都执行
* scheduling.isInputPending 主动去询问浏览器，是否有需要需要渲染的任务
