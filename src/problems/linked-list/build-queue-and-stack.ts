// 用单链表实现栈和队列，用双链表实现双向队列
import LinkedNode = require("../../collection/linked-list/base");
import AlgoQuirks = require("../../AlgoQuirks");


interface queue<T> {
  size: number;
  isEmpty: () => boolean;
  push: (v: T) => void;
  shift: () => T | null;
  peek: () => T | null;

}

interface stack<T> {
  size: number;
  isEmpty: () => boolean;
  push: (v: T) => void;
  pop: () => T | null;
  peek: () => T | null;

}

interface deque<T>{
  size: number;
  isEmpty: () => boolean;
  push: (v: T) => void;
  pop: () => T | null;
  unShift: (v: T) => void;
  shift: () => T | null;
  peekHead: () => T | null;
  peekTail: () => T | null;
}

// 单链表实现
class Queue<T extends string | number> implements queue<T> {

  private amount : number = 0;
  private head: LinkedNode | null = null;
  private tail: LinkedNode | null = null;

  get size() {
    return this.amount;
  }

  public isEmpty (){
    return this.amount === 0;
  }

  public push (v: T) {

    const node = new LinkedNode(v);

    if (!this.head && !this.tail){
      this.head = node;
      this.tail = node;
    }else{
      this.tail!.next = node;
      this.tail = node;
    }
    this.amount++;
  };


  public shift (){
    if (!this.head) return null;
    
    const target = this.head
    this.head = target.next;

    // 最后一个元素出队
    if (!this.head) this.tail = null;

    this.amount--;

    return target.value as T;
  }

  public peek (){
    if (!this.head) return null;
    return this.head.value as T
  }

  public peekRaw (){
    if (!this.head) return null;
    return this.head
  }

  
}
// 单链表实现
class Stack<T extends string | number> implements stack<T> {

  private amount : number = 0;
  private head: LinkedNode | null = null;
 
  get size() {
    return this.amount;
  }

  public isEmpty (){
    return this.amount === 0;
  }

  public push (v: T) {

    const node = new LinkedNode(v);

    if (this.head) node.next = this.head;
    this.head = node
    
    this.amount++;
  };


  public pop (){
    if (!this.head) return null;
    
    const target = this.head
    this.head = target.next;

    this.amount--;

    return target.value as T;
  }

  public peek (){
    if (!this.head) return null;
    return this.head.value as T
  }

  public peekRaw (){
    if (!this.head) return null;
    return this.head
  }

  
}

class Deque<T extends string | number> implements deque<T>{
  private amount : number = 0;
  private head: LinkedNode | null = null;
  private tail: LinkedNode | null = null;

  get size() {
    return this.amount;
  }

  public isEmpty (){
    return this.amount === 0;
  }

  public push(v: T) {

    const node = new LinkedNode(v);

    if (this.tail){
      this.tail.next = node
      node.prev = this.tail
      this.tail = node;
    }
    if (!this.head && !this.tail){
      this.head = node;
      this.tail = node;
    }

    this.amount++
  }

  public unShift (v: T) {

    const node = new LinkedNode(v);

    if(this.head){
      node.next = this.head
      this.head.prev = node;
      this.head = node;
    }

    if (!this.head && !this.tail){
      this.head = node;
      this.tail = node;
    }
    this.amount++
  }

  public pop () {
    
    if (!this.tail) return null;

    const target = this.tail;

    this.tail = this.tail.prev;
    if (this.tail) {
      this.tail.next = null
    }else{
      this.head = null
    }

    this.amount--;

    return target.value as T;
  }

  public shift(){
    if (!this.head) return null;
    
    const target = this.head;
    
    this.head = this.head.next;
    if (this.head) {
      this.head.prev = null;
    }else{
      this.tail = null
    }
    
    this.amount--;

    return target.value as T;

  }

  public peekHead(){
    if (!this.head) return null;
    return this.head.value as T;
  }
  public peekRawHead(){
    if (!this.head) return null;
    return this.head
  }

  public peekTail(){
    if (!this.tail) return null;
    return this.tail.value as T;
  }

  public peekRawTail(){
    if (!this.tail) return null;
    return this.tail
  }


}

type IParam = [LinkedNode | null]

type IReturn = void;
class Quirks extends AlgoQuirks<IParam, IReturn> {
  public ingredientMaker(time: number) {
    return [new LinkedNode(0)] as IParam
  }

  public main(head: LinkedNode | null) {
    
    const deque = new Deque();
    deque.push(1)
    deque.push(2)
    deque.push(3)
    deque.push(4)
    deque.unShift(0)
    deque.unShift(-1)
    deque.unShift(-2)
    console.log(deque.peekRawHead()?.toString())
    deque.pop()
    console.log(deque.peekRawHead()?.toString())
    deque.shift()
    console.log(deque.peekRawHead()?.toString())
    deque.pop()
    deque.pop()
    deque.pop()
    console.log(deque.peekRawTail()?.toString())
    deque.push(10)
    console.log(deque.peekRawTail()?.toString())
    deque.shift()
    console.log(deque.peekRawTail()?.toString())
    deque.unShift(20)
    console.log(deque.peekRawHead()?.toString())
    deque.pop()
    console.log(deque.peekRawTail()?.toString())
    console.log(deque.size)
    deque.shift()
    deque.shift()
    deque.shift()
    deque.shift()
    deque.shift()
    console.log(deque.peekRawTail()?.toString())

    console.log('------')

    const queue = new Queue();
    queue.push(1)
    queue.push(2)
    queue.push(3)
    queue.push(4)
    queue.push(5)
    console.log(queue.peekRaw()?.toString())
    console.log(queue.shift());
    console.log(queue.peekRaw()?.toString())
    queue.push(0)
    console.log(queue.peekRaw()?.toString())
    console.log(queue.size);
    queue.shift()
    queue.shift()
    queue.shift()
    queue.shift()
    queue.shift()
    console.log(queue.peekRaw()?.toString())

    console.log('------')

    const stack = new Stack();
    stack.push(1)
    stack.push(2)
    stack.push(3)
    stack.push(4)
    stack.push(5)
    console.log(stack.peekRaw()?.toString())
    console.log( stack.pop());
    console.log(stack.peekRaw()?.toString())
    stack.push(0)
    console.log(stack.peekRaw()?.toString())
    console.log(stack.size)
    stack.pop()
    stack.pop()
    stack.pop()
    stack.pop()
    stack.pop()
    console.log(stack.peekRaw()?.toString())
  
  }
  

  public reference(head: LinkedNode | null) {
      
  }

  public comparator(res: IReturn, head: LinkedNode | null): boolean {
    return false
  }
}

const quirks = new Quirks();

quirks.runWithRef(1);

