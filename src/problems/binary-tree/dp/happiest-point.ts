// P15 00:21:45
import AlgoQuirks = require("../../../AlgoQuirks");


interface IEmpolyee {
  happy: number;
  subordinates: IEmpolyee[]
}

class Employee implements IEmpolyee {
  public happy: number = 0;
  public subordinates: Employee[] = [];

  constructor(happy: number, subordinates?: Employee[]){
    this.happy = happy;
    if (subordinates) this.subordinates = subordinates
  }

  public add (subordinate: Employee){
    this.subordinates.push(subordinate)
  }

  public append(...subordinates: Employee[]){
    for (let i = 0; i < subordinates.length; i++){
      this.add(subordinates[i])
    }
  }
}

type IParam = IEmpolyee
class Quirks extends AlgoQuirks<[IParam]> {
  public ingredientMaker() {

    const A = new Employee(20)
    const B = new Employee(30)
    const C = new Employee(5)

  
    A.append(new Employee(1), new Employee(2), new Employee(3))
    B.append(new Employee(40), new Employee(20), new Employee(10))
    C.append(new Employee(20), new Employee(10), new Employee(5))
    

    const head = new Employee(10, [A, B, C])
    
    return [head] as [IParam]
  }

  public main(ingredient: IParam) : number {

    function process(head: IParam) : {present: number, absent: number}{

      if (!head.subordinates.length){
        return {
          present: head.happy,
          absent: 0
        }
      }

      let present = head.happy;
      let absent = 0

      for (let employee of head.subordinates){
        const data = process(employee);
        present += data.absent
        absent += Math.max(data.present, data.absent);
      }

      return {
        present,
        absent
      }

    }


    const { present, absent } = process(ingredient);

    return Math.max(present, absent);

  }

  public reference(ingredient: IParam): number {
    return 125
  }
}

const quirks = new Quirks();

quirks.runWithRef(1, false);

