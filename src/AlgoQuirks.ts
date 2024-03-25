// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf

// obj 如果是 class A 的实例，Object.getPrototypeOf(obj) 是 A;
// Object.getPrototypeOf(A) 是一个类 A 的构造函数 f
// Object.getPrototypeOf(f) 是一个最基础的对象构造器 o
// Object.getPrototypeOf(o) 是 null
// 所以 Object.getPrototypeOf(obj) !== o

// obj 如果是 {} 字面量，Object.getPrototypeOf(obj) 是一个最基础的对象构造器 o
// Object.getPrototypeOf(o) 是 null
// 所以 Object.getPrototypeOf(obj) === o
function isPlainObject(obj: unknown) {
    if (typeof obj !== 'object' || obj === null) return false

    let proto = obj
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto)
    }

    return Object.getPrototypeOf(obj) === proto
}


function deepClone<T extends unknown>(o: T) : T{

	const clonedMap = new WeakMap()

	function clone(target: unknown){
		
		if (Object.prototype.toString.call(target) === '[object Array]'){
			const _o = target as unknown[];
			if (clonedMap.get(_o)) return target;
			clonedMap.set(_o, true)
			const arr : unknown[] = []
			for (let i = 0; i < (_o).length; i++){
				arr.push(clone(_o[i]))
			}
			return arr
		}
		
		if (Object.prototype.toString.call(target) === '[object Object]'){
			const _o = target as any;
			if (clonedMap.get(_o)) return target;
			clonedMap.set(_o, true)
			const obj : any = {}
			for (const key in _o){
				if (!_o.hasOwnProperty(key)) continue
				obj[key] = clone(_o[key]);
			}
			return obj
		}

		return target
	}
	
	return clone(o)

}

/**
 * 基础类
 * 泛型表示算法入参的 Rest Parameters
 * 如果入参是一个数组，则 T 要表示成 [number[]]
 * 如果入参是无数个number, 则 T 要表示成 number[]
 */


abstract class AlgoQuirks<T extends unknown[], U extends unknown> {

	private result : Array<{ingredient: T, main: U, reference?: U, result: boolean}> = [] // ReturnType<this["main"]>

	abstract ingredientMaker(time?: number) : T

	abstract main(...args: T) : U
	
	/**
	 * 在没有等效的 ref 方法可以实现算法的情况下，根据 main 的结果手动 check 结果是否正确
	 * @res 其他方法，在 args 参数下返回的结果，
	 * @args 入参数
	 * @return 对应入参情况下，res 的结果是否正确
	 * 
	 * runMainWithComparator 需要实现 comparator 方法
	 */
	abstract comparator(res: U, time:number, ...args: T): boolean

	abstract reference(...args: T): U

    public async run(time: number = 1){
        for (let i = 0; i < time; i++){
            const args = this.ingredientMaker()
            const res = await this.checker.apply(this, args);
            this.result.push({
                ingredient: args,
                main: res[0],
                reference: res[1],
                result: res[2]
            });
        }
        return this.result;
    }
	private async checker(...ingredients: T): Promise<[U, U, boolean]>{
		const a = await this.main(...deepClone(ingredients));
		const b = await this.reference(...deepClone(ingredients));
		return [a, b, ((a !== null && typeof a !== 'undefined') ? a.toString() : null) === ((b !== null && typeof b !== 'undefined') ? b.toString() : null)];
	}

	private format(input: unknown){
		if (input === null || typeof input === 'undefined') return input;
		if (Array.isArray(input)) {
			const arr = []
			for(let i = 0 ; i < input.length; i++){
				const entry = input[i];
				arr.push(entry)
			}
	
			return arr.join(' ; ')
		}

		if(isPlainObject(input)) return input
		
		return input.toString()

	}

	// 分别运行 main 和 ref 方法，对结果进行比较
	public async runTest(time: number = 1, options: {printLog: boolean} = {printLog : true}){
			
		let final = true

		for (let i = 0; i < time; i++){
			const args = this.ingredientMaker(i)
			const res = await this.checker.apply(this, args);
			
			if (options.printLog){
				console.log('res.ingredients')
				console.log(this.format(args))
				console.log('res.result')
				console.log(this.format(res[2]))
				console.log('res.main')
				console.log(this.format(res[0]))
				console.log('res.reference')
				console.log(this.format(res[1]))
				console.log('------')
			}else{
				this.result.push({
					ingredient: args,
					main: res[0],
					reference: res[1],
					result: res[2]
				});
			}
			if (res[2] === false){
				console.log('AC', false);
				return this.result;
			}
		}

		console.log('AC', final)
		return this.result;
	}

	/**
	 * 分别运行 main 和 comparator 方法，对结果进行比较
	 */
	public async runMainWithComparator(time: number = 1, options: {printLog: boolean} = {printLog : true}){
			
		for (let i = 0; i < time; i++){
			const args = this.ingredientMaker(i)
			const res = await this.main.apply(this, deepClone(args))
			const passed = await this.comparator.apply(this, [res, i, ...deepClone(args)]);
			
			if (options.printLog){
				console.log('res.ingredients')
				console.log(this.format(args))
				console.log('res.result')
				console.log(this.format(passed))
				console.log('res.main')
				console.log(this.format(res))
				console.log('------')
			}else{
				this.result.push({
					ingredient: args,
					main: res,
					result: passed
				});
			}
			if (passed === false){
				if (!options.printLog){
					console.log('res.ingredients')
					console.log(this.format(args))
					console.log('res.result')
					console.log(this.format(passed))
					console.log('res.main')
					console.log(this.format(res))
					console.log('------')
				}
				console.log('AC', false);
				return this.result;
			}
		}

		console.log('AC', true)
		return this.result;
	}

	// 单独运行 main 方法
	public async runMain(time: number = 1, options: {printLog: boolean} = {printLog : true}){
			
		for (let i = 0; i < time; i++){
			const args = this.ingredientMaker(i)
			if (options.printLog){
				console.log('res.ingredients')
				console.log(this.format(args))
			}
			const res = await this.main.apply(this, args)
			if (options.printLog){
				console.log('res.main')
				console.log(this.format(res))
			}
		}
	
	}

	// 单独运行 ref 方法
	public async runRef(time: number = 1, options: {printLog: boolean} = {printLog : true}){
			
		for (let i = 0; i < time; i++){
			const args = this.ingredientMaker(i)
			if (options.printLog){
				console.log('res.ingredients')
				console.log(this.format(args))
			}
			const res = await this.reference.apply(this, args)
			if (options.printLog){
				console.log('res.main')
				console.log(this.format(res))
			}
		}
	
	}

}

export = AlgoQuirks
