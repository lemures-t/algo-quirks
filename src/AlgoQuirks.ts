/**
 * 基础类
 */

abstract class AlgoQuirks<T extends any[]> {

    private result : Array<{ingredient: T, main: any, reference: any, result: boolean}> = [] // ReturnType<this["main"]>

    abstract ingredientMaker() : T

    abstract main(...args: T) : any

    abstract reference(...args: T): any

    private checker(...ingredients: T): [ReturnType<this["main"]>, ReturnType<this["reference"]>, boolean]{
        const a = this.main(...ingredients);
        const b = this.reference(...ingredients);
        return [a, b, a.toString() === b.toString()];
    }

    public run(time: number = 1){
        for (let i = 0; i < time; i++){
            const args = this.ingredientMaker()
            const res = this.checker.apply(this, args);
            this.result.push({
                ingredient: args,
                main: res[0],
                reference: res[1],
                result: res[2]
            });
        }
        return this.result;
    }

    public print(){
        this.result.forEach((res)=>{
            console.log(res.ingredient, res.result, res.main, res.reference)
        })
    }
}


// class P extends AlgoQuirks<[string, number]> {
//     public ingredientMaker (){
//         return [Math.random().toString(), Math.random()] as [string, number];
//     }

//     public main(a: string, b : number){
//         return [a,b]
//     }

//     public reference(a: string, b : number){
//         return [a+1,b]
//     }
// }

// const d = new P();

// const a = d.run(10);

// d.print();
