
// const generateIP = (s: string) : string[] =>{




// }



import AlgoQuirks = require("../AlgoQuirks");

class Quirks extends AlgoQuirks<[string]> {
  public ingredientMaker() {
    return ['111111111'] as [string]
  }

  public main(ingredients: string) {

    const all:string[] = []

    const getIPV4Part = (leftStr: string, prevParts: string[]) : false | string[]=>{
      
      if (prevParts.length === 4 && leftStr.length > 0) return false;

      if (prevParts.length < 4 && leftStr.length === 0) return false;

      if (prevParts.length === 4 && leftStr.length === 0) return prevParts

      let tryPart = '';
      for (let i = 0 ; i < leftStr.length; i++){
        tryPart += leftStr[i];
        if ( Number(tryPart) > 255 ||(tryPart.length === 2 && tryPart[0] === '0')){
          return false
        } else {
          prevParts.push(tryPart);
          const result = getIPV4Part(leftStr.slice(i+1), prevParts);
          if(!result) {
            prevParts.pop();
          }else if (result.length === 4) {
            all.push(result.join('.'))
            prevParts.pop();
            return false;
          }else{
            return result
          }
        }
      }
      return false;
    }


    getIPV4Part(ingredients, []);

    return all

  }

  public reference(ingredients: string) {
    return ['1.0.10.23', '1.0.102.3', '10.1.0.23', '10.10.2.3', '101.0.2.3']
  }
}

const quirks = new Quirks();

quirks.runWithRef(1, false);
