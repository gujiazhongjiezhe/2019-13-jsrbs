var utils = (function(){
    let toArray = function(likeAry){
        let ary = Array.prototype.slice.call(likeAry)
        return ary
    }
    let mean = function(){
        let ary = toArray(arguments);
        ary.sort((a,b)=>a-b);
        ary.pop();
        ary.shift();
       let res =  eval(ary.join('+'))/ary.length
       return res
    }

    return {
        toArray:toArray,
        mean:mean
    }
})();
