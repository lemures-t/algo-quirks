import AlgoQuirks = require("../../AlgoQuirks");
import LinkedNode = require("../../collection/linked-list/base");

/**
 * 两个链表相加问题
 * 
 * 给定两个链表的头节点head1和head2，
 * 认为从左到右是某个数字从低位到高位，返回相加之后的链表
 * 
 * 例子     4 -> 3 -> 6 + 
 *         2 -> 5 -> 3
 * 返回     6 -> 8 -> 9
 * 解释     634 + 352 = 986
 * 
 */

type NodeType = LinkedNode | null
type IParam = [NodeType, LinkedNode]

type IReturn = NodeType;
class Quirks extends AlgoQuirks<IParam, IReturn> {
  public ingredientMaker(time: number) {

    function generateHead(){
      let size = Math.random() > 0.5 ? 3 : 2
      if (size === 0) return null;
    
      const head =  new LinkedNode(Math.floor(Math.random()* 10));
      let cur = head;
      while (size > 1){
        cur.next = new LinkedNode(Math.floor(Math.random()* 10));
        cur = cur.next
        size--;
      }

      return head
    }

    return [generateHead(), generateHead()] as IParam
  }

  public main(head1: NodeType, head2: NodeType): NodeType{

    if (!head1) return head2;
    if (!head2) return head1;

    let head : NodeType = null
    let cur: NodeType = head;
    let carry = 0;
    while(head1 || head2){
      const v1 = (head1?.value || 0) as number
      const v2 = (head2?.value || 0) as number

      const res = v1 + v2 + carry;

      carry = Math.floor(res / 10)
      const v = res % 10;
      const node = new LinkedNode(v);
      if (!head) {
        head = node;
      }else{
        cur!.next = node
      }
      cur = node

      if (head1) head1 = head1.next
      if (head2) head2 = head2.next

    }
    
    if (carry === 1 && cur) cur.next = new LinkedNode(1)

    return head
      
  }
  

  public reference(head1: NodeType, head2: NodeType): NodeType{
    return new LinkedNode(0);
  }

  public comparator(res: NodeType, args_0: LinkedNode, args_1: NodeType): boolean {
      return true
  }
}

const quirks = new Quirks();

quirks.runMain(1);

