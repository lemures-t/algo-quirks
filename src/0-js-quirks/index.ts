function doSomething(){
  
}

function start(){
  let init = 0;
  // let pre = 0;
  let round = 1;
  let nextTick = 1000;
  function timeout(){ 
    const now = +new Date();
    if (!init) init = now;
    nextTick = nextTick * round - (now - init);    
    round++;

    doSomething();
  
    setTimeout(timeout,  nextTick)
    // for (let i = 0 ; i < 1500000000; i++){}
  }
  timeout();
}


start()