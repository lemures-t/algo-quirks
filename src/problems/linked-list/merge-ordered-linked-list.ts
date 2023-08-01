/**
 * 两个有序链表的合并
 * 给定两个有序链表的头节点head1和head2，
 * 返回合并之后的大链表，要求依然有序
 * 例子     1 -> 3 -> 3 -> 5 -> 7   2 -> 2 -> 3 -> 3-> 7
 * 返回     1 -> 2 -> 2 -> 3 -> 3 -> 3 -> 3 -> 5 -> 7
 **/

import LinkedNode = require("../../collection/linked-list/base");
import AlgoQuirks = require("../../AlgoQuirks");

type INode = LinkedNode | null;
type IParam = [INode, INode]

type IReturn = INode;
class Quirks extends AlgoQuirks<IParam, IReturn> {
  public ingredientMaker(time: number) {

    function getValueNotSmallThan(n: number, ceiling: number){
      let res = 0
      while(res < n){
        res = Math.floor(Math.random()* ceiling)
      }
      return res;
    }
    function generateOrderNode(){
      
      let head : INode = null;
      let cur : INode = null;
      
      let size = Math.floor(Math.random() * 10);

      while (size > 0){
        if (!head) {
          head = new LinkedNode(Math.floor(Math.random()* 200));
          cur = head;
         }else{
          cur!.next = new LinkedNode(getValueNotSmallThan(cur!.value as number,200));
          cur = cur!.next
        }
        size--;
      }

      return head
    }

    // LinkedNode.getLinkedListFromArr([135,178,180,182,194]), LinkedNode.getLinkedListFromArr([100, 168,184,186])
    return [generateOrderNode(), generateOrderNode()] as IParam
  }

  public main(head1: INode, head2: INode): INode {
    if (!head1) return head2;
    if (!head2) return head1;

    function getSmallerHead(h1: LinkedNode, h2: LinkedNode){
      return h1.value < h2.value ? h1 : h2
    }

    let head : INode = getSmallerHead(head1, head2);
    let cur : INode = head;
    let cur1: LinkedNode | null = head.next;
    let cur2: LinkedNode | null = head === head1 ? head2 : head1;    

    while (cur1 && cur2 && cur){
      cur.next = getSmallerHead(cur1, cur2);
      if(cur.next === cur1){
        cur1 = cur1.next
      }else{
        cur2 = cur2.next
      }
      cur = cur.next;
    }
    
    if (cur) cur.next = cur1 || cur2

    return head;
  }
  

  public reference(...ingredient: IParam) : INode {
    return new LinkedNode(0)
  }

  public comparator(res: INode, args_0: INode, args_1: INode): boolean {

    function linkedListToArr(head: INode){
      const arr: number[] = []
      while (head){
        arr.push(head.value as number);
        head = head.next
      }
      return arr;
    }

    const target = linkedListToArr(res)
    const source = [...linkedListToArr(args_0), ...linkedListToArr(args_1)].sort((a, b) => a - b);
    for (let i = 0; i < source.length; i++){
      const v = source[i];
      if (v !== target[i]) return false;
    }
    
    return true;
  }
}

const quirks = new Quirks();

quirks.runWithComparator(2000);

