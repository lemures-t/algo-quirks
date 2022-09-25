/**
 * 单调栈
 */




// function lastLargeNum (arr: number[]) : number[]{
//     const res = new Array(arr.length);
//     res.fill(-1);

//     const stack : number[][]= [];

//     for (let i = 0; i < arr.length; i++){

//         const num = arr[i];
//         if (stack.length === 0){
//             stack.push([i]);
//         }else {
//             const targetArr = stack[stack.length - 1];
//             const targetIndex = targetArr[0];
//             const targetNum = arr[targetIndex];
//             if (num > targetNum){
//                 stack.pop();
//                 for (let j = 0; j < targetArr.length; j++){
//                     res[j] = num;
//                 }
//             }
//             const topArr = stack[stack.length -1];
//             if (topArr){
//                 const topIndex = targetArr[0];
//                 const topNum = arr[topIndex];
//                 if (num > topNum){
//                     i--;
//                     continue;
//                 }else if (num === topNum){
//                     topArr.push(i)
//                 }else {
//                     stack.push([i])
//                 }
//             }else{
//                 stack.push([i])
//             }
//         }
//     }

//     while(stack.length){
//         const topArr = stack.pop();
//         const lastArr = stack[stack.length -1];
//         if (lastArr){
//             res[lastArr[0]] = arr[topArr![0]];
//         }
//     }

//     return res;

// }
// debugger;
// const r = lastLargeNum([1,5,8,2,4,9,6])
// console.log(r);


// [5,8,9,9,9,-1,-1]



const p : string = '123';
const d = p + '32';
console.log('p', d);

