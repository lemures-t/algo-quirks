/**
 * 根据子节点，创建一棵树
 */
import AlgoQuirks = require("../AlgoQuirks");
interface ISource {
  id: number,
  name: string,
  childrenIds: number[],
  traversed?: boolean
}

interface INode {
  id: number,
  name: string,
  children: INode[],
  visited?: boolean
}


class Quirks extends AlgoQuirks<[ISource[]]> {
  public ingredientMaker() {
    const source = [{
        id:1,
        name:"父1",
        childrenIds:[12,11]
    }, {
        id:2,
        name:"父2",
        childrenIds:[21]
    }, {
        id:3,
        name:"父3",
        childrenIds:[31]
    },{
        id:11,
        name:"孙1",
        childrenIds:[]  
    },{
        id:12,
        name:"孙2",
        childrenIds:[]
    },{
        id:21,
        name:"孙3",
        childrenIds:[]
    },{
      id:0,
      name:"祖1",
      childrenIds:[1, 2, 3]
  },{
        id:31,
        name:"孙4",
        childrenIds:[]
    }];
    return [source] as [ISource[]]
  }

  public main(ingredients: ISource[]) {
    function establishTree(sources: ISource[] = []): INode[] {

      const nodeMap : Map<number, INode> = new Map();
    
      for (const source of sources){
        const node : INode = {
          id: source.id,
          name: source.name,
          children: [],
        }
        nodeMap.set(node.id, node);
      }
    
      function process(_sources: ISource[], asChildren: boolean): INode[] {
    
        const nodes :INode[] = []
        for (const _source of _sources){
          const node = nodeMap.get(_source.id);
          if (node!.visited) {
            nodes.push(node!);
            continue;
          };
          if (_source.childrenIds.length > 0){
            node!.children = process(sources.filter(__source => _source.childrenIds.indexOf(__source.id) > -1), true);
          }
          nodes.push(node!);
          if (asChildren){
            node!.visited = true;
          }
        }
    
        return nodes
      }
    
      process(sources, false)
    
    
      const res : INode[] = []
      for (const node of nodeMap.values()){
        if (!node.visited){
          res.push(node)
        }
        delete node.visited
      }
      return res
    
      
    }
    
    return JSON.stringify(establishTree(ingredients))
  
  }

  public reference(ingredients:  ISource[]) {
    function establishTree(source: ISource[] = []) {
      const grapMap = new Map();
      const quene = [];
      // 构建
      source.forEach(item => {
        const { childrenIds = [], id } = item;
        if (childrenIds.length === 0) {
          quene.push(item);
        } else {
          childrenIds.forEach(cid => {
            grapMap.set(cid, item);
          });
        }
      });
      while (quene.length && grapMap.size != 0) {
        const item = quene.shift();
        const parent = grapMap.get(item.id);
        grapMap.delete(item.id);
        if (parent.children) {
          parent.children.push(item);
        } else {
          parent.children = [item];
          quene.push(parent);
        }
      }
    
      return quene;
    }
    return JSON.stringify(establishTree(ingredients))
  }
}

const quirks = new Quirks();

quirks.runWithRef(1, false)
