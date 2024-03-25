var deleteNode = function(head, node){
  let current = head;
  let last = null;
  while(current) {

    if (current.val === node.val){
      // 删除头节点
      // tricky way
      // 头节点的值等于下一个节点的值
      // 头节点的next指向下一个节点的next
      // 相当于删掉了 next 节点
      if (!last){
        const next = current.next
        current.val = next.val;
        current.next = next.next;
      }else{
        last.next = current.next;
      }
      break;
    }

    last = current;
    current = current.next;
  }
}