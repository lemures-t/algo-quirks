// 判断是否是回文链表
// https://leetcode.cn/problems/palindrome-linked-list/

import AlgoQuirks = require("../../AlgoQuirks");
import LinkedNode = require("../../collection/linked-list/base");

type IParam = [LinkedNode]

type IReturn = boolean;
class Quirks extends AlgoQuirks<IParam, IReturn> {
  public ingredientMaker(time: number) {
    const h = new LinkedNode(1);
    h.next = new LinkedNode(2);
    h.next.next = new LinkedNode(2);
    h.next.next = new LinkedNode(1);
    return [h] as IParam
  }

  public main(head: LinkedNode): IReturn {

    if (!head || !head.next) return true;
    function reverse(h: LinkedNode | null){
      if (!h) return h;
      let pre: LinkedNode | null = null, cur: LinkedNode | null = h
      while (cur){
        const next : LinkedNode | null = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
      }
      return pre
    }

    
    let s: LinkedNode | null = head, f: LinkedNode | null = head;

    while(s.next && f.next?.next){
      s = s.next;
      f = f.next.next;
    }

    f = reverse(s);
    s = head;
    let end = f;

    let res = true
    while(s && f){
      if (s.value !== f.value) {
        res = false;
        break;
      };
      s = s.next;
      f = f.next;
    }

    // 再把破坏的链表调回来
    reverse(end);

    return res
  }
  

  public reference(...ingredient: IParam): IReturn {
    return false
  }

  public comparator(res: IReturn, time: number, args_0: IParam[0]): boolean {
    return false
  }
}

const quirks = new Quirks();

quirks.runMain(1);

