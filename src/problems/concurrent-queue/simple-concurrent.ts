// const promiseList = [
// 	new Promise((resolve) => {
// 		setTimeout(resolve, 1000)
// 	}),
// 	new Promise((resolve) => {
// 		setTimeout(resolve, 1000)
// 	}),
// 	new Promise((resolve) => {
// 		setTimeout(resolve, 1000)
// 	})
// ]

// fn(promiseList);


import AlgoQuirks = require("../../AlgoQuirks");

class Quirks extends AlgoQuirks<[Array<Promise<unknown>>]> {
  public ingredientMaker() {
    const promiseList = [
    	new Promise((resolve) => {
    		setTimeout(()=> resolve(2000), 2000)
    	}),
    	new Promise((resolve) => {
    		setTimeout(()=> resolve(6000), 6000)
    	}),
    	new Promise((resolve) => {
    		setTimeout(()=> resolve(1000), 1000)
    	})
    ]
    return [promiseList] as [Array<Promise<unknown>>]
  }

  public main(ingredient: Array<Promise<unknown>>) {
   
    function fn(promises: Array<Promise<unknown>>) : Promise<Array<unknown>>{

      const res = new Array(promises.length).fill(-1)
      
      return new Promise((resolve)=>{
        for (let i = 0 ; i < promises.length; i++){
          const promise = promises[i];
          promise.then((timer)=>{
            res[i] = timer
            if (res.every(r => r !== -1)){
              resolve(res)
            }
          })
        }
      })
      

    }


    return new Promise((resolve)=>{
      fn(ingredient).then((res)=>{
        resolve(res)
      })
    })
  
  }

  public reference(ingredient: Array<Promise<unknown>>) {
    return null
  }
}

const quirks = new Quirks();

quirks.runWithRef(1, true).then(()=>{
  
});


