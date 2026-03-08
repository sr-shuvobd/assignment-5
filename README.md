1. Difference between var, let, and const

ans: 
    var: Function scoped, can be redeclared and reassigned.

    let: Block scoped, can be reassigned but not redeclared.

    const: Block scoped, cannot be reassigned after declaration.

2. What is the spread operator (...)?
ans:
    The spread operator (...) is used to copy or expand elements of an array or object.

    Example:
        const arr2 = [...arr1];

3.Difference between map(), filter(), and forEach()
ans:
    map(): Creates a new array by transforming elements.

    filter(): Creates a new array with elements that match a condition.

    forEach(): Loops through an array but does not return a new array.
4.What is an arrow function?
ans:
    An arrow function is a short syntax for writing functions in JavaScript.
Example:
    const add = (a,b) => a + b;

5.What are template literals?
ans:
    Template literals use backticks ( ) to create strings and insert variables using ${}.

    Example:
        const msg = `hello ${name}`;