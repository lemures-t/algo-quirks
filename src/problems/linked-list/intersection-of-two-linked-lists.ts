// 相交链表 找出无环链表的第一个相交节点
// link: https://leetcode.cn/problems/intersection-of-two-linked-lists
// ref: 034


import AlgoQuirks = require("../../AlgoQuirks");
import LinkedNode = require("../../collection/linked-list/base");

type IParam = [LinkedNode, LinkedNode]

type IReturn = LinkedNode | null;
class Quirks extends AlgoQuirks<IParam, IReturn> {
  public ingredientMaker(time: number) {
    return [new LinkedNode(1), new LinkedNode(2)] as IParam
  }

  public main(head1: LinkedNode | null, head2: LinkedNode | null): IReturn {
      
    if (!head1 || !head2) return null;

    // 先确定是否相交，如果相交顺便找到长的链表;
    // 相交的链表结尾一定是同一个节点
    let diff = 0;
    let h1 = head1, h2 = head2;
    while(h1.next){
      h1 = h1.next;
      diff++;
    }
    while(h2.next){
      h2 = h2.next;
      diff--;
    }
    if (h1 !== h2) return null;
    
    // 如果相交，让长的链表，先迭代 Math.absolute(step) 步;
    // 然后两个链表一起迭代，直道发现第一个相同的节点;

    // h1 长
    if (diff > 0){
      h1 = head1;
      h2 = head2;
    }else{
    // h2 长
      h1 = head2;
      h2 = head1;
    }
    
    diff = Math.abs(diff);

    while(diff-- > 0){
      h1 = h1.next!;
    }

    while(h1 !== h2){
      h1 = h1.next!;
      h2 = h2.next!;
    }

    return h1
    
  }
  

  public reference(head1: LinkedNode | null, head2: LinkedNode | null): IReturn {
    if (!head1 || !head2) return null;
    let h1: LinkedNode | null = head1, h2: LinkedNode | null = head2;
    
    /**
     * 如果 head1 和 head2 相交
     * head1 到公共节点的距离为 a
     * head2 到公共节点的距离为 b
     * 公共节点到末尾的距离为 c
     * 则下述算法
     * h1 共走过了 a+c+b 的距离
     * h2 共走过了 b+c+a 的距离
     * 两者相等，且相遇在相交位置
     * 
     * 如果 head1 和 head2 不相交
     * head1 到结尾的距离为 m
     * head2 到结尾的距离为 n
     * 则下述算法
     * h1 共走过了 m+n 的距离
     * h2 共走狗了 n+m 的距离
     * 两者相等，且相遇在 null 的位置
     **/ 

    while(h1 !== h2){
      h1 = h1 ? h1.next : head2;
      h2 = h2 ? h2.next : head1;
    }
    return h1;
  }

  public comparator(res: IReturn, time: number, args_0: LinkedNode, args_1: LinkedNode): boolean {
    return false
  }
}

const quirks = new Quirks();

quirks.runTest(1);

