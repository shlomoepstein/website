// JavaScript

let divBy = divisor => number => number % divisor == 0;

for (let i = 1; i <= 100; i++)
   console.log(
      divBy(3)(i)
         ? divBy(5)(i)
            ? 'CracklePop'
            : 'Crackle'
         : divBy(5)(i)
            ? 'Pop'
            : i);
