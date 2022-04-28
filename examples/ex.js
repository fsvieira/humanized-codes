
const {
    codeSystem,
    base36
} = require("../codes");


const dateHumanCode = base36.encode(new Date().getTime());
console.log("Date Human Code => " + dateHumanCode + ", date=" + new Date(base36.decode(dateHumanCode)).toISOString());


const bigNumber = Math.floor(Math.random() * 10000000000);
const bigNumberHumanCode = base36.encode(bigNumber);
console.log("Big Number Human Code => " + bigNumberHumanCode + ", decoded=" + base36.decode(bigNumberHumanCode) + "=" + bigNumber);


const hexBase = codeSystem(16);
const dateHexHumanCode = hexBase.encode(new Date().getTime());
console.log("Date Hex Human Code => " + dateHexHumanCode + ", date=" + new Date(hexBase.decode(dateHexHumanCode)).toISOString());


const code = `${bigNumberHumanCode}-${dateHumanCode}`;
const [n, d] = code.split("-");

console.log("Code: " + code + ", decoded: " + base36.decode(n) + ", " + new Date(base36.decode(d)).toISOString());

{
    const symbols = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","T","U","V","W","X","Y","Z"];
    console.log(symbols.length);
    const {encode, decode} = codeSystem(symbols.length, symbols);

    let code;
    for (let n=0; n<10; n++) {
        code = 100000 + n;
        const encoded = encode(code);
        console.log("Code: " + code + ", encode: ", encoded, ", decoded: " + decode(encoded));
    }
}