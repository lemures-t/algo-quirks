import LinkedNode = require("../../collection/linked-list/base");
import AlgoQuirks = require("../../AlgoQuirks");

class Quirks extends AlgoQuirks<[LinkedNode]> {
  public ingredientMaker() {
    const joint = new LinkedNode(99);
    const node = new LinkedNode(0)
    node.next = joint
    node.next.next = new LinkedNode(2)
    node.next.next.next = new LinkedNode(3);
    node.next.next.next.next = joint
    
    return [node] as [LinkedNode]
  }

  public main(ingredient: LinkedNode): LinkedNode | null {
  
    let fast: LinkedNode | null = ingredient.next?.next || null;
    let slow: LinkedNode | null = ingredient;

    while(fast && slow && fast !== slow){
      
      slow = slow.next;
      fast = fast.next?.next || null;

      if (slow === fast) return fast

    }

    return null;
  }

  public reference(ingredient: LinkedNode): LinkedNode | null {

    let cur: LinkedNode | null = ingredient;
    const set = new Set<LinkedNode>();
    while(cur){
      if (set.has(cur)) return cur;
      set.add(cur)
      cur = cur.next
    }
    return null

  }
}

const quirks = new Quirks();

quirks.runWithRef(1, false);


