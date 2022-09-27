/**
 * 单调栈
 */

function lastLargeNum (arr: number[]) : number[]{
    const res = new Array(arr.length);
    res.fill(-1);

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
    debugger
    while(stack.length){
        const topArr = stack.pop();
        res[topArr![0]] = -1;
    }
    return res;

}
const r = lastLargeNum([1,5,8,2,4,4,9,6])
console.log(r);

