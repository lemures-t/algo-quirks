class LinkedNode {
  public value : string | number
  public next: LinkedNode | null // single linked list 单向链表
  public prev: LinkedNode | null // doubly linked list 双向链表

  public toString(){
   
    if(!this.next && !this.prev) return this.value
    function traverse(cur: LinkedNode | null, direction: "prev" | "next"){
      
      const res: LinkedNode["value"][] = [];
      let end: LinkedNode | null = null
      
      if (!cur || (!cur.next && !cur.prev)) {
        return {
          res,
          end
        }
      }

      const set = new Set<LinkedNode>();
      
      while(cur){
        end = cur;
        res.push(cur.value);
        if (set.has(cur)) break;
        set.add(cur)
        cur = cur[direction];
      }
      return {
        res,
        end
      }
    }

    // 可以打印双向链表，可以传入双链表的头或者尾
    const {res: firstRes, end} = traverse(this, this.next ? 'next' : 'prev')
    
    if (!end) return firstRes.join('->');
      
    const {res: lastRes} = traverse(end, end.next ? 'next' : 'prev')
    return firstRes.join('->') + ' <=> ' + lastRes.join('->')
  
  }

  static getLinkedListFromArr(arr: (number | string)[]){
    let head: LinkedNode | null = null;
    let cur: LinkedNode | null = null;

    for (let i = 0 ; i < arr.length; i++){
      const node = new LinkedNode(arr[i]);
      if (!cur){
        head = node;
        cur = head;
      }else{
        cur.next = node;
        cur = cur.next;
      }
    }
    return head
  }

  constructor(value: string | number){
    this.value = value;
    this.next = null;
    this.prev = null;
  }
  
}

export = LinkedNode