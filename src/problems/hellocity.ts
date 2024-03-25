// 评测题目5: 写一个HelloCity，可以按照以下方式调用:
/* HelloCity("Shanghai")输出:
Hello，Shanghai！

HelloCity("Shanghai").waiting(8).hello("Beijing")输出
Hello，Shanghai！
//等待8秒..
waiting 8s
// 8s后输出
Hello Beijing~

HelloCity("Shanghai").hello("Beijing").hello("Shenzhen")输出
Hello，Shanghai！
Hello Beijing~
Hello Shenzhen~
以此类推。
*/

import AlgoQuirks = require("../AlgoQuirks");

class Hello {

  private timer : number = 0;

  public waiting(second: number){
    setTimeout(()=>{
      console.log(`waiting ${second}s`);
    }, this.timer * 1000)
    this.timer +=  second;
    return this

  }

  public hello (name: string){
    setTimeout(()=>{
      console.log(`Hello ${name}`);
    }, this.timer * 1000)

    return this;
  }
}

function HelloCity(name:string){
  console.log(`Hello, ${name}`);
  return new Hello();
}



interface ISource {
  id: number,
  name: string,
  childrenIds: number[]
}

interface INode {
  id: number,
  name: string,
  children: INode[]
}


  
  

class Quirks extends AlgoQuirks<string[]> {
  public ingredientMaker() {
    return []
  }

  public main() {
    // HelloCity("Shanghai");
    // HelloCity("Shanghai").waiting(8).hello("Beijing");
    // HelloCity("Shanghai").hello("Beijing").hello("Shenzhen")
    HelloCity("Shanghai").waiting(8).hello("Beijing").waiting(10).hello("Shenzhen").hello("Hangzhou").waiting(5).hello("Chongqing")
  
  }

  public reference() {
    return []
  }
}

const quirks = new Quirks();

quirks.main()

