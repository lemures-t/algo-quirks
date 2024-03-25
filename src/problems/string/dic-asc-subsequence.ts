/**
 * P29 01:21:00
 * 给定一个全是小写字母的字符串 str,删除多余字符，使得每种字符只保留 1 个，并让最终结果字符串的子典序最小
 * 【举例】
 * str = "acbc",删掉第一个，c,得到“abc”，是所有结果字符串中字典序最小的。
 * str = "dbcacbaca",删掉第一个'b'、第一个'c'、第二个'c'、第二个'a',得到“dabc”, 是所有结果子符串中子典序最小的。
 */

import AlgoQuirks = require("../../AlgoQuirks");

type IParam = string
class Quirks extends AlgoQuirks<[IParam]> {
  public ingredientMaker(time: number) {
    return [''] as [IParam]
  }

  public main(ingredient: IParam) {
   
  
  }

  public reference(ingredient: IParam) {
  }
}

const quirks = new Quirks();

quirks.runWithRef(1, false);

