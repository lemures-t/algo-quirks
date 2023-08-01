import AlgoQuirks = require("../AlgoQuirks");

class SuperTask{

  private asyncQueue : Array<{
    fn: ()=> Promise<unknown>,
    resolve: (v: unknown)=> void,
    reject: ()=> void,
  }>= []

  private max: number = 2;
  private running: number = 0;

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

class Quirks extends AlgoQuirks<string[]> {
  public ingredientMaker() {
    return []
  }

  public main() {

    function timeout (time: number){

      return new Promise((resolve)=>{
        setTimeout(()=>{
          resolve(0);
        }, time)  
      })
    
    }

    const superTask = new SuperTask();
    function addTask (time: number, name: unknown) {
      superTask.add(() => timeout(time)).then(() => {
          console.log(`任务${name}完成`);
      });
    }
    addTask(1000 * 10, 1); //10秒后输出:任务1完成
    addTask(1000 * 5, 2); //5秒后输出:任务2完成
    addTask(1000 * 3, 3); //8秒后输出:任务3完成
    addTask(1000 * 4, 4); //12秒后输出:任务4完成
    addTask(1000 * 5, 5); //15秒后输出:任务5完成

  }

  public reference() {
    return []
  }
}

const quirks = new Quirks();

quirks.main()
