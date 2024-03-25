import AlgoQuirks = require("../../AlgoQuirks");

function Task(i: number, timer: number) {
  // const time = Math.ceil(Math.random() * 1000)
  return () => new Promise(r => {
    setTimeout(() => {
      console.log(`running task(${i}) in ${timer}`)
      r(timer)
    }, timer)
  })
}

class Quirks extends AlgoQuirks<Array<()=>Promise<unknown>>[]> {
  public ingredientMaker() {

    // [
    //   570, 581, 739, 835,
    //   801, 780, 900, 309,
    //   48, 245
    // ]
    const ingredients = new Array(10).fill(0).map((timer, index)=> Task(index, Math.ceil(Math.random() * 1000)))
    return [ingredients]
  }

  public async main(ingredients: Array<()=>Promise<unknown>>) {

    class SuperTask{

      private asyncQueue : Array<{
        fn: ()=> Promise<unknown>,
        resolve: (v: unknown)=> void,
        reject: ()=> void,
      }>= []
    
      private max: number = 2;
      private running: number = 0;
    
      constructor(max: number){
        this.max = max
      }
    
      private runWithRef () {
        
        while(this.running < this.max && this.asyncQueue.length > 0){
    
          this.running++;
    
          const {fn, resolve, reject} = this.asyncQueue.shift()!;
    
          fn().then(resolve, reject).then(()=>{
            this.running--;
            this.runWithRef();
          })
        }
    
      }
    
      public add (fn: ()=> Promise<unknown>): Promise<unknown>{
        return new Promise((resolve, reject)=>{
          
          this.asyncQueue.push({
            fn,
            resolve,
            reject
          })
    
          this.runWithRef()
    
        })
    
      }
    
    }

    // 最大并发执行数为 n，按顺序返回 Task 的执行结果
    function schedule(n: number) {

      const superTask = new SuperTask(n);

      return function (tasks : Array<() => Promise<unknown>>) : Promise<unknown> {
        const res : Array<unknown> = [];
        return new Promise((resolve, reject)=>{
          for (let i = 0 ; i < tasks.length; i++){
            const task = tasks[i];
            superTask.add(task).then((timer)=>{
              res[i] = timer
              if (res.length === tasks.length){
                resolve(res)
              }
            })
          }
        })
        
        
      }
    }

    // output [1,2,3,4,5,6,7,8,9]
    return await schedule(4)(ingredients)
    

  }

  public async reference(ingredients: Array<()=>Promise<unknown>>) {
    
    class EmitTask {

      private idx: number;
      private task: () => Promise<unknown>;
      private emit: (idx: number, data: unknown) => void;

      constructor(idx: number, task: () => Promise<unknown>, emit: (idx: number, data: unknown) => void) {
        this.idx = idx;
        this.task = task; // fn
        this.emit = emit; // emit: (idx, res)=> {} // 返回结果
      }
      runWithRef() {
        this.task().then((res)=> {
            this.emit(this.idx, res);
        });
      }
    }
    
    class Pool {

      private maxN : number;
      private result: Array<unknown>;
      private allTask: Array<()=> Promise<unknown>>;
      private taskLen: number;
      private runTaskLen: number;
      private eLen: number; // 剩余数量
      private finishLen: number;

      public resolve: (value: unknown)=> void;

      constructor(maxN: number, allTasks: Array<()=> Promise<unknown>>) {
        this.maxN = maxN;
        // this.runPoolArr = [];
        this.result = [];
        this.allTask = allTasks;
        this.taskLen = allTasks.length;
        this.runTaskLen = 0;
        this.eLen = this.taskLen; 
        this.finishLen = 0;
    
        // init
        this.init();
    
        this.resolve = ()=> {}
      }
    
      init() {
        let minNum = Math.min(this.maxN, this.taskLen);
        for(let i = 0; i < minNum; i += 1) {
          this.addTask();
        }
      }
    
      emit(idx: number, res: unknown) {
        // console.log(idx, res, '__okk__');
        this.result[idx] = res;
        this.finishLen += 1;
        this.runTaskLen -= 1;
        if(this.finishLen >= this.taskLen) { // 完成
          // todo
          // return this.runWithRef();
          this.resolve(this.result);
        }else {
          this.addTask();
        }
      }
      
      addTask() {
        let self = this;
        if(this.runTaskLen < this.maxN && this.eLen) {
          let nowIdx = this.taskLen - this.eLen;
          let oriTask = this.allTask[nowIdx];
          let wrapTask = new EmitTask(nowIdx, oriTask, this.emit.bind(self));
          wrapTask.runWithRef();
          // this.runPoolArr.push();
          this.eLen -= 1;
          this.runTaskLen += 1;
        }
        
      }
    
      runWithRef() {
         return new Promise((resolve)=> {
           // resolve(this.result);
           this.resolve = resolve;
         })
      }
      
    }
    
    // 最大并发执行数为 n，按顺序返回 Task 的执行结果
    function schedule(n: number) {
      return function (tasks: Array<() => Promise<unknown>>) {
        let pool = new Pool(n, tasks);
        return pool.runWithRef();
      }
    }
    
    const s = schedule(4);
    
    // output [1,2,3,4,5,6,7,8,9]
    return await s(ingredients)
  }
}

const quirks = new Quirks();

quirks.runWithRef(5, true)



 
