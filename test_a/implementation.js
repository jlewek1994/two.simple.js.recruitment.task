// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(S) {
    // write your code in JavaScript (Node.js 8.9.4)
    let v = parseInt(S, 2);

    if(!isBinary(S)) {
        throw new Error('S must be string representing binary value');
    } else if (v > 1000000) {
        throw new Error('v must be les them 1000000');
    } else {
        return implementation(v)
    }
}

function isOdd(num) { return num % 2;}

function implementation(v) {
    let i;
    for(i = 0; v > 0; i++) {
        v = isOdd(v) ? v - 1 : v / 2;
    }

    return i;
}

function isBinary(str) {
    for(let i = 0; i < str.length; i++) {
        if(parseInt(str[i])!==1 && parseInt(str[i])!==0) {
            return false;
        }
    }
    return true;
}

console.log(solution('111'));