# humanized-codes

Humanized codes are meant to be handled by people, written on paper and shared. 
The codes only use decimal digits (0..9) and uppercase letters, they are meant to be short code to identify a
small or big numbers. 

For example they can be used to encode a database integer ID or a specific date.

Ex. The date date=2020-01-31T15:01:17.647Z can be passed to a person using this code K62AP58V.
Ex. Big number 7607118767 can be written as 3HT2YEN

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
    } = require("../codes");


    // Use a predifined system, 36 symbols [0-9][A-Z]
    const dateHumanCode = base36.encode(new Date().getTime());
    console.log("Date Human Code => " + dateHumanCode + ", date=" + new Date(base36.decode(dateHumanCode)).toISOString());

    // Use base 16 hexadecimal system: [0-9][A-F]
    const hexBase = codeSystem(16);
    const dateHexHumanCode = hexBase.encode(new Date().getTime());

    console.log("Date Hex Human Code => " + dateHexHumanCode + ", date=" + new Date(hexBase.decode(dateHexHumanCode)).toISOString());


    // Encode id + date
```