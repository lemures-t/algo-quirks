import LinkedNode = require("../../collection/linked-list/base");
import AlgoQuirks = require("../../AlgoQuirks");

type IParam = [LinkedNode | null];
type IReturn = LinkedNode | null;

class Quirks extends AlgoQuirks<IParam, IReturn> {
  public ingredientMaker(time: number) {

    let size = Math.floor(Math.random() * 200)
    
    if (size === 0) return [null] as IParam;
    
    let head : LinkedNode = new LinkedNode(Math.floor(Math.random()* 200));
    let prev : LinkedNode | null = head;
    
    while (size > 0){
      const cur = new LinkedNode(Math.floor(Math.random()* 200));
      prev.next = cur;
      // 双向链表
      cur.prev = prev;
      prev = cur;
      size--;
    }
    
    return [head] as IParam
  }

  public main(ingredient: LinkedNode) {
    let prev = null as (LinkedNode | null);
    let cur = ingredient as (LinkedNode | null);

    while(cur){
      const next = cur.next;
      cur.next = prev;
      // 双向链表反转
      cur.prev = next;
      
      prev = cur;
      cur = next;
    }  
    return prev
  }

  public reference(ingredient: LinkedNode) {
    return null
  }

  public comparator(res: IReturn, input: LinkedNode | null): boolean {
    
    const arr : LinkedNode[] = [];
    
    // 将逆序的节点按正序存到数组中
    while(res !== null){
      arr.unshift(res);
      res = res.next;
    }
    
    // 正向遍历数组，和链表相应的元素比较，链表指针按 next 方向移动
    for(let i = 0; i < arr.length; i++){
      if (input?.value !==  arr[i].value) return false;
      if (input.next) input = input.next;
    }

    // 此时 input 指针已经指向了链表最后的节点；
    // 逆向遍历数组，和链表相应的元素比较，链表指针按 prev 方向移动
    for (let j = arr.length - 1; j > -1; j--){
      if (input?.value !== arr[j].value) return false;
      if (input.prev) input = input.prev;
    }


    return true
  }
}

const quirks = new Quirks();

quirks.runWithComparator(1000);


