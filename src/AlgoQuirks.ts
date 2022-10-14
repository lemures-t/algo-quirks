/**
 * 基础类
 * 泛型表示算法入参的 Rest Parameters
 * 如果入参是一个数组，则 T 要表示成 [number[]]
 * 如果入参是无数个number, 则 T 要表示成 number[]
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
            console.log('res.ingredients')
            console.log(res.ingredient.toString())
            console.log('res.result')
            console.log(res.result)
            console.log('res.main')
            console.log(res.main)
            console.log('res.reference')
            console.log(res.reference)
            console.log('------')
        })
    }
}

export = AlgoQuirks
