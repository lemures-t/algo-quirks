import AlgoQuirks = require("../AlgoQuirks");

export interface IAddressNested {
  label: string;
  value: number | string;
  children?: IAddressNested[];
  
}

function filterAddressNestedJson(addressNestedJson: IAddressNested[], codes: IAddressNested["value"][], filterLevel: 'province' | 'city' | 'district') {

  const returnNodeLevel = ['province', 'city', 'district'].indexOf(filterLevel);

  const dp = new Map<IAddressNested["value"], IAddressNested>();

  const collect = (head: IAddressNested, res:IAddressNested)=>{
    dp.set(head.value, res);
    if (head.children){
      for (let i = 0; i < head.children.length; i++){
        const next = head.children[i]
        collect(next, res);
      }
    }
  }

  const traverse = (head: IAddressNested, targetCode: IAddressNested["value"], level: number) : IAddressNested[] | null =>{
    if (dp.has(head.value)) {
      console.log('aaaa', head.value)
      return [dp.get(head.value)!]
    }
    if (head.value === targetCode) return [head];
    let res: IAddressNested[] = []
    if (head.children){
      for (let i = 0; i < head.children.length; i++){
        const child = head.children[i];
        const matched = traverse(child, targetCode, level + 1)
        if (matched){
          if (level === returnNodeLevel){
            collect(head, head)
            res.push(head)
          }else{
            res = res.concat(matched)
          }
        } 
      }
    }
    return res.length ? res : null
  }
  
  const nested  = new Set<IAddressNested>();

    for (let i = 0; i < addressNestedJson.length; i++){
      const target = addressNestedJson[i]
      for (let j = 0; j < codes.length; j++){
        const code = codes[j];
        const head = traverse(target, code, 0)
        if (head) head.forEach(node=> nested.add(node))
      }
    }

    return Array.from(nested)
  
}



type IParam = [IAddressNested[], string[]]

type IReturn = string[];
class Quirks extends AlgoQuirks<IParam, IReturn> {
  public ingredientMaker(time: number) {
    const data = [{
      label: '1',
      value: '1',
      children: [{
        label: '11',
        value: '11',
        children: [{
            label: '111',
            value: '111',
          },{
            label: '112',
            value: '112',
          },{
            label: '113',
            value: '113',
          }]
      },{
        label: '12',
        value: '12',
        children: [{
          label: '121',
          value: '121',
        },{
          label: '122',
          value: '122',
        },{
          label: '123',
          value: '123',
        }]
      },{
        label: '13',
        value: '13',
        children: [{
          label: '131',
          value: '131',
        },{
          label: '132',
          value: '132',
        },{
          label: '133',
          value: '133',
        }]
      }]
    },{
      label: '2',
      value: '2',
      children: [{
        label: '21',
        value: '21',
        children: [{
            label: '211',
            value: '211',
          },{
            label: '212',
            value: '212',
          },{
            label: '213',
            value: '213',
          }]
      },{
        label: '22',
        value: '22',
        children: [{
          label: '221',
          value: '221',
        },{
          label: '222',
          value: '222',
        },{
          label: '223',
          value: '223',
        }]
      },{
        label: '23',
        value: '23',
        children: [{
          label: '231',
          value: '231',
        },{
          label: '232',
          value: '232',
        },{
          label: '233',
          value: '233',
        }]
      }]
    },{
      label: '3',
      value: '3',
      children: [{
        label: '31',
        value: '31',
        children: [{
            label: '311',
            value: '311',
          },{
            label: '312',
            value: '312',
          },{
            label: '313',
            value: '313',
          }]
      },{
        label: '32',
        value: '32',
        children: [{
          label: '321',
          value: '321',
        },{
          label: '322',
          value: '322',
        },{
          label: '323',
          value: '323',
        }]
      },{
        label: '33',
        value: '33',
        children: [{
          label: '331',
          value: '331',
        },{
          label: '332',
          value: '332',
        },{
          label: '333',
          value: '333',
        }]
      }]
    }
  ]
    return [data, ['111','112','113','121','122','211','222','331']] as IParam
  }

  public main(args_0: IAddressNested[], args_1: string[]): string[] {
    return filterAddressNestedJson(args_0, args_1, 'city').map(v=> v.value as string)
  }
  

  public reference(...ingredient: IParam): string[] {
    const args_0 = ingredient[0]
    const args_1 = ingredient[1]
    return []
  }

  public comparator(res: IReturn, args_0: IAddressNested[], args_1: string[]): boolean {
      return false
  }
}

const quirks = new Quirks();

quirks.runMain(1);

