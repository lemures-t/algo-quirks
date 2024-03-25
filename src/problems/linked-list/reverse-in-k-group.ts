/**
 * K个节点的组内逆序调整问题：
 * 给定一个单链表的头节点head，和一个正数k
 * 实现k个节点的小组内部逆序，如果最后一组不够k个就不调整
 * 例子: 
 * 调整前：1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8，k = 3
 * 调整后：3 -> 2 -> 1 -> 6 -> 5 -> 4 -> 7 -> 8
 */

import AlgoQuirks = require("../../AlgoQuirks");
import LinkedNode = require("../../collection/linked-list/base");
type IParam = [LinkedNode | null, number];
type IReturn = LinkedNode | null;

class Quirks extends AlgoQuirks<IParam, IReturn> {
  public ingredientMaker(time: number) {

    if (time === 0){
      return [null, 10] as IParam
    }
    if (time === 1){
      return [new LinkedNode(Math.floor(Math.random()* 200)), 0] as IParam
    }

    let size = 5 //Math.floor(Math.random() * 20);
    const k = 2 //Math.floor(Math.random() * 30);
    
    if (size === 0) return [null, k] as IParam;
    
    const head =  new LinkedNode(Math.floor(Math.random()* 200));
    let cur = head;
    while (size > 1){
      cur.next = new LinkedNode(Math.floor(Math.random()* 200));
      cur = cur.next
      size--;
    }

    
    return [head, k] as IParam
  }

  public main(head: LinkedNode | null, k: number): IReturn {

    if (!head || k <= 0) return null;

    // 翻转 source 节点开始往后 limit 个节点
    // 返回翻转后的 新头结点 新尾节点 和 limit+1 个节点
    function reverseLinkedList(source: LinkedNode | null, limit: number) : {newHead: IReturn, newTail: IReturn, nextHead: IReturn} {

      if (!source) {
        return {
          newHead: null,
          newTail: null,
          nextHead: null
        };
      }

      let prev = null as (LinkedNode | null);
      let cur = source as (LinkedNode | null);
      let count = 0;

      while(count < limit && cur){
        const next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
        count++
      }
      // 如果最后一组不够k个就再调整回来
      if (!cur && count < limit){
        return reverseLinkedList(prev, count)
      }
      return {
        newHead: prev,
        newTail: source,
        nextHead: cur
      }
    }

    function recursive(source: IReturn, lastTail: IReturn, firtNewHead: IReturn) : IReturn{
      // 当上一个迭代返回的 nextHead 为空时，递归结束，返回第一次迭代的 newHead
      if (!source) return firtNewHead

      const {newTail, newHead, nextHead} = reverseLinkedList(source, k)
      // 上一个迭代尾节点的指针，指向这一个迭代新的头结点
      if (lastTail) lastTail.next = newHead
      // 只有第一次迭代 firstNewHead 为空，将第一次迭代的 newHead 在后续迭代中传递
      return recursive(nextHead, newTail, firtNewHead ?? newHead)


    }

    return recursive(head, null, null)

  }

  public reference(head: LinkedNode | null, k: number): IReturn {

    function findNodeInN(node: LinkedNode | null, n: number){
      // if (!node) return null;
      // let cur = node;
      // for (let i = 1; i < n; i++){
      //   const next = cur.next;
      //   if (!next) return null;
      //   cur = next;
      // }
      // return cur;
      
      // 这个写法要简单很多 2 行解决了
      while(--n!==0 && node!== null){
        node = node.next
      }
      return node
    }

    function reverseLinkedList(start: LinkedNode, end: LinkedNode | null){
  
      end = end?.next || null;
      let prev : LinkedNode | null = null;
      let cur: LinkedNode | null = start;

      while(cur && cur !== end){
        const next : LinkedNode | null = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
      }
      // 新的结尾指向 end.next
      start.next = end

    }

    if (!head || k <= 0) return null;

    let newHead: LinkedNode | null = null;
    let lastEnd: LinkedNode | null = null;
    let cur: LinkedNode | null = head;

    while(cur){
      
      const end = findNodeInN(cur, k)
      // 如果第一轮遍历，end 就为空了，则返回 head;
      // 如果是后面轮的遍历，则返回 newHead(第一轮的 end)
      if (!end) return newHead ?? head;
      // end.next 在 reverseLinkedList 后会变化
      const next = end.next
      reverseLinkedList(cur, end);
      // 第一轮遍历后，newHead 指向 end;
      if (newHead === null) newHead = end;
      // 第二轮遍历会有 lastEnd, lastEnd表示上一轮的结束节点，lastEnd 指向，这一轮的开始节点
      if (lastEnd) lastEnd.next = end;
      // 迭代 lastEnd
      lastEnd = cur
      // 迭代 cur
      cur = next;

    }

    return newHead;




  }
  

  public comparator(res: IReturn, time: number, input: LinkedNode | null,  k: number): boolean {
    
    if(!input || k <=0 ) return res === null
    
    // 原链表转数组（1）
    const arr : LinkedNode[] = [];
    let cur : LinkedNode | null = input;
    while(cur){
      arr.push(cur);
      cur = cur.next
    }

    let resCur = res;

    const group = Math.floor(arr.length / k);

    // 按K个节点的组内逆序调整的逻辑，遍历数组（1）
    for (let i = 0; i < group; i++){
      for (let j = k - 1; j >= 0; j--){
        const index =  i * k + j
        const target = arr[index];
        if (target.value !== resCur?.value) return false;
        resCur = resCur.next
      }
    }

    // 按顺序遍历剩下的
    for(let i = group * k; i < arr.length; i++){
      const target = arr[i];
      if (target.value !== resCur?.value) return false;
      resCur = resCur.next
    }

    return true



  }
}

const quirks = new Quirks();

quirks.runRef(200);
