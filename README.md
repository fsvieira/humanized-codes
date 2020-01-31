# humanized-codes

Humanized codes are meant to be handled by people, written on paper and shared. 
The codes only use decimal digits (0..9) and uppercase letters, they are meant to be short code to identify a
small or big numbers. 

For example they can be used to encode a database integer ID or a specific date.

Ex. ```The date date=2020-01-31T15:01:17.647Z can be passed to a person using this code K62AP58V.```
Ex. ```Big number 7607118767 can be written as 3HT2YEN```

## Install
```
    npm install humanized-codes --save
```

## Use 

It can be used with browser or node.

```javascript
    
    const {
        codeSystem,
        base36
    } = require("humanized-codes");


    // Use base 36 system (36 symbols)
    // 1. encode a date,
    const dateHumanCode = base36.encode(new Date().getTime());
    console.log("Date Human Code => " + dateHumanCode + ", date=" + new Date(base36.decode(dateHumanCode)).toISOString());

    // 2. encode a small or big number,
    const bigNumber = Math.floor(Math.random() * 10000000000);
    const bigNumberHumanCode = base36.encode(bigNumber);
    console.log("Big Number Human Code => " + bigNumberHumanCode + ", decoded=" + base36.decode(bigNumberHumanCode) + "=" + bigNumber);

    // 3. make a composed code.
    const code = `${bigNumberHumanCode}-${dateHumanCode}`;
    const [n, d] = code.split("-");
    console.log("Code: " + code + ", decoded: " + base36.decode(n) + ", " + new Date(base36.decode(d)).toISOString());


    // Use base 16 system (16 symbols, hexadecimal)
    const hexBase = codeSystem(16);
    const dateHexHumanCode = hexBase.encode(new Date().getTime());
    console.log("Date Hex Human Code => " + dateHexHumanCode + ", date=" + new Date(hexBase.decode(dateHexHumanCode)).toISOString());

```
