/**
 * P29 01:12:00
 * 
 * 在一个字符串中找到没有重复字符子串中最长的长度。
 * 例如：
 * abcabcbb没有重复字符的最长子串是abc,长度为3
 * bbbbb,答案是b,长度为1
 * pwwkew,答案是wke,长度是3
 * 要求：答案必须是子串，“pwke”是一个子字符序列但不是一个子字符串。
 * 
 * 子串问题 一般思路是 以 i 位置结尾的子串符合什么什么条件
 */

import AlgoQuirks = require("../../AlgoQuirks");

type IParam = string
class Quirks extends AlgoQuirks<[IParam]> {
  public ingredientMaker(time: number) {
    const strs = [
      'abcabcbb',
      'bbbbb',
      'pwwkew',
      'd',
      'cadadadceadc'
    ]
    for (let j = 0 ; j < (time - 4); j++){
      let str = '';
      for (let i = 0; i < Math.floor(Math.random() * 26); i++){
        str+= String.fromCharCode(Math.floor(Math.random() * 25) + 'a'.charCodeAt(0))
      }
      strs.push(str)
    };


    
  
    return [strs[time]] as [IParam]
  }

  public main(ingredient: IParam) {

    // 讨论
    // i 位置结尾的字符，最长的子串是，
    // 往前推 推到和i位置字符重复的位置 1)
    // i-1 位置往前推推到的极限位置 2)
    // 1) 和 2) 取最大，就是 i 位置结尾的最长子串能推到的位置

    let maxLen = 0;

    // 每个 ascii 字符在字符串中最后出现的位置
    const letterLastIndexList = new Array(256).fill(-1);

    // 2)
    let preCharEdgeIndex = -1;

    for (let i = 0 ; i < ingredient.length; i++){
      
      const code = ingredient.charCodeAt(i);
      
      // 1) 
      const curCharEdgeIndex = letterLastIndexList[code];

      // 1) 和 2) 
      const final = Math.max(preCharEdgeIndex, curCharEdgeIndex);

      // 重置 2）进入下一个迭代
      preCharEdgeIndex = final;
      
      // 计算最大长度
      maxLen = Math.max(maxLen, i - final)
      
      // 将当前字符出现的位置存入 list 中
      letterLastIndexList[code] = i;

      // pre = Math.max(pre, letterLastIndexList[code]);
      // cur = i - pre
      // len = Math.max(len, cur)
      // letterLastIndexList[code] = i;
    }

    return maxLen;

  }

  // 双指针
  private twoPointer(str: IParam){
    if (str.length < 2)  return str.length;

    let left = 0;
    let right = 0;
    let maxLen = 1;

    // 每个 ascii 字符在字符串中最后出现的位置
    const letterLastIndexList: number[] = new Array(256).fill(-1);

    while(right < str.length){
      
      const code = str.charCodeAt(right);
      const index = letterLastIndexList[code];
      letterLastIndexList[code] = right;
      
      // cadadadceadc -> index >= left 防止 index 回退
      if (index !== -1 && index >= left) left = index + 1;

      maxLen = Math.max(maxLen, right - left +1);
      right++
    }

    return maxLen


  }

  // 队列，逻辑比较简单，只是有额外的空间开销
  private withQueue(str: IParam) {

    if (!str.length) return 0

    const queue : string[] = [];
    const used :  boolean[] = new Array(256).fill(false);
    let max  = 1;
    
    for (let i = 0; i < str.length; i++){
      const char = str[i];
      const code = str.charCodeAt(i);

      // 如果当前字符被使用过
      if (used[code]) {
        // 用当前队列长度计算最大值
        max = Math.max(max, queue.length);
        // 出队
        while(queue.length > 0){
          
          const _char = queue.shift()!;
          const _code = _char.charCodeAt(0);
          used[_code] = false;

          // 出队元素与当前元素一致时，停止继续出队
          if (code === _code) break;

        }
      }
      // 当前元素没被使用过，则入队
      queue.push(char);
      used[code] = true;
      
    }

    return max
  }

  public reference(ingredient: IParam) {

    // return this.withQueue(ingredient)

    return this.twoPointer(ingredient)

  }
}

const quirks = new Quirks();

quirks.runWithRef(500, false);


// 异步
// quirks.runWithRef(1, true).then(()=>{
//   
// });


