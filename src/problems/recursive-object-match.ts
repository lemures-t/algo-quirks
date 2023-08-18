import AlgoQuirks = require("../AlgoQuirks");

type IParam = [Record<string, unknown>, Record<string, unknown>]

type IReturn = boolean;
class Quirks extends AlgoQuirks<IParam, IReturn> {
  public ingredientMaker(time: number) {

    const source = {
      a: 0,
      c: "",
      d: true,
      e: {
        f: 1,
        e: {
          e: 0,
          f: 2
        }
      },
      f: 3
    }
    const targets = [
      {a: 0},
      {e: 0},
      {a: 0, c: ''},
      {a: 0, e: 0}, // false
      {a:0, e: {f: 1}},
      {e: {f: 2}},
      {e: {e: 0, f: 2}},
      {e: {f: 2, e: 0}},
      {a: {f: 1}}, // false
      {e: {f:1, e: {e: {f: 2}}}}, // false
      {a: 0, e: {e: 0}}, // false
      { d: true, e: {e: {e: 0}, f:1}}, // true
      { e: {e: {e: 0}, f:2}}, // false
      { e: {e: {e: 0, f:2}}}, // true
    ]


    // const source = {
    //   a: {
    //     hello: "world",
    //     isFirst: true,
    //     nextLevel: {
    //       hello: "world",
    //       isFirst: false,
    //     }
    //   },
    //   b: {
    //     domestic: true,
    //     foreign: false,
    //     nextLevel: {
    //       domestic: false,
    //       foreign: true,
    //     }
    //   },
    //   f: false,
    //   g: {
    //     gg: 'gl',
    //     gl: 'gg',
    //     g: {
    //       gg: 'gl',
    //       gl: 'gg',
    //       g: {
    //         gg: 'gl',
    //         gl: 'gg',
    //       }
    //     }
    //   },
    //   h : {
    //     g: {
    //       gg: 'gl',
    //       gl: 'gg',
    //     },
    //     domestic: true,
    //     foreign: false,
    //   },
    //   z: true,
    // };
    // const targets = [
    //   {hello: "world"},
    //   {hello: "world", isFirst: true},
    //   {hello: "world", isFirst: false},
    //   {hello: "world", absent: false}, // false
    //   {b: {domestic: true}},
    //   {b: {domestic: true}, hello: "world"}, // false
    //   {b: {nextLevel: {domestic: false}}, z: true},
    //   {g: {gg: 'gl', gl: 'gg'}, domestic: true},
    //   {g: {gg: 'gl', gl: 'gg'}, domestic: false} // false
    // ]

    return [targets[time], source] as IParam
  }


  public main(target: IParam[0], source: IParam[1]): IReturn {

    function isPlainObject (obj: unknown){
      return Object.prototype.toString.call(obj) === '[object Object]'
    }

    function checkIsChildObject(target: IParam[0], source: IParam[1], isDFS: boolean = false) : boolean{
    
      let currentLevelMatched = false;
      const targetKeys = Object.keys(target);
  
      // target 尝试当前层级 BFS 匹配
      for(let i = 0; i < targetKeys.length; i++){
        
        const targetKey = targetKeys[i];
        const targetValue = target[targetKey];

        // targetValue 为基本类型变量
        if (!isPlainObject(targetValue)){
          // 当前层级中，如果 targetKey 不存在 或者 对应的值和 targetValue 不一致，则认为无法匹配
          currentLevelMatched = source[targetKey] == targetValue
        // targetValue 为对象
        } else {
          // 当前层级中，如果 targetKey 对应的值也是一个对象
          if (isPlainObject(source[targetKey])){
            // targetValue 在 source[targetKey] 中深度搜索
            currentLevelMatched = checkIsChildObject(targetValue as Record<string, unknown>, source[targetKey] as Record<string, unknown>, true)
          }else{
            // 当前层级中，如果 targetKey 对应的值为基本类型变量，则认为无法匹配
            currentLevelMatched = false
          }
        }
        // 当前 targetKey: targetValue 无法匹配，则退出当前层级 BFS 尝试
        if (!currentLevelMatched) break;
      }
      
      // 如果当前层级 BFS 匹配失败
      if (!currentLevelMatched){
        
        // 如果是 DFS 的搜索，当前层级匹配不上就不再进行下一个层级的 BFS
        // 因为 DFS 的入口，是在上一个层级的 BFS 中的。在 BFS 的比较中，如果 targetValue 是对象，应该只比较 taretValue 自己
        // e.g. source {e: {e: {e: 4}}}, target {e: {e: 4}}，DFS 下应该只比较 source {e: {e: 4}} target {e: 4}
        // 如果 isDFS 不 return，则会到下一个层级去 BFS，即 source {e:4} target {e: 4} 会匹配成功
        // case: {a: 0, e: {e: 0}}
        if (isDFS) return false;
        
        const sourceKeys = Object.keys(source);
        for (let i = 0; i < sourceKeys.length;  i++){
          const sourceKey = sourceKeys[i];
          const sourceValue = source[sourceKey];
          // 继续在 target 在下一个层级的对象中 BFS
          if (isPlainObject(sourceValue)){
            // 下一个层级 BFS 成功，则当前层级 BFS 也认为成功
            currentLevelMatched = checkIsChildObject(target, sourceValue as Record<string, unknown>)
            if (currentLevelMatched) break;
          }
        }
      }

      // 返回当前层级 BFS 是否匹配成功
      return currentLevelMatched
  
    }


    return checkIsChildObject(target, source)
  }
  

  public reference(target: IParam[0], source: IParam[1]): IReturn {

    function checkIsChildObject(a: IParam[0], b: IParam[1]): boolean {
      return Object.entries(b).some((
        [bk, bv]: [string ,unknown]) => {
          console.log('bk', bk, bv)
        return Object.entries(a).every((
          [ak, av]: [string, unknown]
        ) => {
          if (a[ak] === b[ak]) return true;
          
          if (typeof a[ak] === 'object') {
            return checkIsChildObject(a[ak] as Record<string, unknown>, b);
          }
          
          return checkIsChildObject(a, b[bk] as Record<string, unknown>)

        })
      })
      
    }

    return checkIsChildObject(target, source)

  }

  public comparator(res: IReturn, time:number, args_0: IParam[0], args_1: IParam[1]): boolean {
    return [
      true, //{a: 0},
      true, //{e: 0},
      true, //{a: 0, c: ''},
      false, //{a: 0, e: 0}, // false
      true, //{a:0, e: {f: 1}},
      true, //{e: {f: 2}},
      true, //{e: {e: 0, f: 2}},
      true, //{e: {f: 2, e: 0}},
      false, //{a: {f: 1}}, // false
      false,//{e: {f:1, e: {e: {f: 2}}}}, // false
      false,//{a: 0, e: {e: 0}}, // false
      true,//{d: true, e: {e: {e: 0}, f:1}}, // true
      false,//{ e: {e: {e: 0}, f:2}}, // false
      true,//{ e: {e: {e: 0, f:2}}}, // true
    ][time] === res

    // return [
    //   true, //   {hello: "world"},
    //   true, //   {hello: "world", isFirst: true},
    //   true, //   {hello: "world", isFirst: false},
    //   false, //   {hello: "world", absent: false}, // false
    //   true, //   {b: {domestic: true}},
    //   false, //   {b: {domestic: true}, hello: "world"}, // false
    //   true, //   {b: {nextLevel: {domestic: false}}, z: true},
    //   true, //   {g: {gg: 'gl', gl: 'gg'}, domestic: true},
    //   false, //   {g: {gg: 'gl', gl: 'gg'}, domestic: false} // false
    // ][time]
  }
}

const quirks = new Quirks();

quirks.runMainWithComparator(14);

