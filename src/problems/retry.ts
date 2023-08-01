// 实现一个函数, fetchWithRetry 会自动重试3次，任意一次成功直接返回



import AlgoQuirks = require("../AlgoQuirks");

let i = 0;
// timer 表示第 timer 次会成功
async function fn(this: unknown, timer: number){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      console.log('timer > i', timer, i)
      if (timer > i){
        reject('error')
      }else{
        resolve('success');
      }
    }, 2000)
  })
  
}

// 普通函数，this 可以指定
// 箭头函数，this 就是函数定义时候上下文中的 this，不能指定
function fetchWithRetry(this: unknown, fn: (...args: any[])=> Promise<unknown>, time: number){
  return (...args: any[]) =>{
    return new Promise((resolve,reject)=>{

      const retry  = (fn: (...args: any[])=> Promise<unknown>, time: number)=>{
        i++
        fn.apply(this, args).then((res)=>{
          resolve(res)
        }).catch((e)=>{
          time--;
          if (time === 0){
            reject(e)
          }else{
            retry(fn, time)
          }
        })
      }
      retry(fn, time)
    })
  }
}

type IParam = number
type IReturn = Promise<unknown>
class Quirks extends AlgoQuirks<[IParam], IReturn> {
  public ingredientMaker(time: number) {
    return [3] as [IParam]
  }

  public main(ingredient: IParam) {
    return fetchWithRetry.call({name: 123}, fn, ingredient)(2).catch(err=> err)
  }

  public reference(ingredient: IParam) {
    return new Promise(()=>{});
  }

  public comparator(res: IReturn): boolean {
      return false
  }
}

const quirks = new Quirks();

quirks.runWithRef(1, true)

