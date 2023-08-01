import AlgoQuirks = require('../AlgoQuirks');


/**
 * 单调栈
 */

function lastLargeNum (arr: number[]) : number[]{
    const res = new Array(arr.length);
    res.fill(-1);
    res.forEach(()=>{

    })

    // 这里单调栈是一个二维数组，内部存储的数组是用于合并arr中有重复数字的情况
    // 如果题目中给到的 arr 没有重复数字，用一位数组构建单调栈即可
    const stack : number[][]= [];

    for (let i = 0; i < arr.length; i++){
        const num = arr[i];
        while(stack.length){
            const targetArr = stack[stack.length -1];
            const targetIndex = targetArr[0];
            const targetNum = arr[targetIndex];
            if (num > targetNum){
                stack.pop();
                for (let j = 0; j < targetArr.length; j++){
                    res[targetArr[j]] = num;
                }
            } else if (num === targetNum){
                targetArr.push(i);
                break;
            } else {                
                break;
            }
        }
        stack.push([i])
    }
    while(stack.length){
        const topArr = stack.pop();
        res[topArr![0]] = -1;
    }
    return res;

}
class Quirks extends AlgoQuirks<[number[]]> {
    
	public ingredientMaker(){
		const len = parseInt((Math.random() * Math.pow(10, 3)).toString(), 10);
		const arr : number[]= new Array(len);
		for (let i = 0 ; i < len; i++){
				arr[i] = parseInt((Math.random() * Math.pow(10, 3)).toString(), 10)
		}
		return [arr] as [number[]]
	}

	public main(ingredient : number[]){
		return lastLargeNum(ingredient)
	}

	public reference(ingredient: number[]){
		const res : number[] = []
		for (let i = 0; i < ingredient.length; i++){
				const target = ingredient[i];
				for (let j = i+1; j < ingredient.length; j++){
						const num = ingredient[j];
						if (num > target){
								res.push(num)
								break;
						}
				}
				if (res.length - 1 !== i){
						res.push(-1);
				}
		}
		return res;
	}

}

const quirks = new Quirks();


quirks.runWithRef()
