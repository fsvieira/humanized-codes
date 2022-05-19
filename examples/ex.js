
const {
    codeSystem,
    base36,
    error5,
    errorSystem
} = require("../codes");


const dateHumanCode = base36.encode(new Date().getTime());
console.log("Date Human Code => " + dateHumanCode + ", date=" + new Date(base36.decode(dateHumanCode)).toISOString());


const number = Math.floor(Math.random() * 100000);
const numberHumanCode = base36.encode(number);
console.log("Number Human Code => " + numberHumanCode + ", decoded=" + base36.decode(numberHumanCode) + "=" + number);


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
        code = 10000000 + n;
        const encoded = encode(code);
        console.log("Code: " + code + ", encode: ", encoded, ", decoded: " + decode(encoded));
    }
}


{
    const symbols = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","T","U","V","W","X","Y","Z"];
    console.log(symbols.length);
    const {encode, decode} = codeSystem(symbols.length, symbols);

    let code;
    for (let n=0; n<10; n++) {
        code = 1000 + n;
        const codeError = error5.bootstrap(code);
        const encoded = encode(codeError);
        console.log("Code: " + code + ", encode: ", encoded, ", decoded: " + decode(encoded), "check: " + error5.check(decode(encoded)));
    }
    
}

console.log("--- Error check ---");
{
    const symbols = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","T","U","V","W","X","Y","Z"];
    console.log(symbols.length);
    const {encode, decode} = codeSystem(symbols.length, symbols);

    let code;
    for (let n=0; n<10; n++) {
        code = 1000 + n;
        const codeError = error5.bootstrap(code);
        const encoded = encode(codeError);

        let errors = ""
        if (Math.random() > 0.5) {
            for (let i=0; i<encoded.length; i++) {
                const coin = Math.random() > 0.5;

                if (coin) {
                    const s = symbols[Math.round(Math.random()*(symbols.length - 1))];
                    errors += s;
                }
                else {
                    errors += encoded.charAt(i);
                }
            }
        }
        else {
            errors = encoded;
        }
        
        const decoded = decode(errors);
        const check = error5.check(decoded);
        console.log(
            "Code: " + code + ", encode: ", encoded, 
            ", errors: " + errors + ", decoded: " + decoded, 
            "check: " + check,
            ", is it rigth? ", ((encoded === errors) === check)?'yes':'no'
        );
    }
}

// Simulation
{
    function sim (bits) { 
        const symbols = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","T","U","V","W","X","Y","Z"];
        const {encode, decode} = codeSystem(symbols.length, symbols);

        const errorX = errorSystem(bits);
        let bad = 0;
        const runs = 30000;
        for (let n=0; n<runs; n++) {
            const code = Math.round(Math.random() * 1000000);
            const codeError = errorX.bootstrap(code);
            const encoded = encode(codeError);

            let errors = ""
            if (Math.random() > 0.5) {
                for (let i=0; i<encoded.length; i++) {
                    const coin = Math.random() > 0.5;

                    if (coin) {
                        const s = symbols[Math.round(Math.random()*(symbols.length - 1))];
                        errors += s;
                    }
                    else {
                        errors += encoded.charAt(i);
                    }
                }
            }
            else {
                errors = encoded;
            }
            
            const decoded = decode(errors);
            const check = errorX.check(decoded);

            if (!((encoded === errors) === check)) {
                bad++;
            }
        }

        console.log(`Simulation stats ${bits}: ${Math.round((bad / runs) * 100)}%`);
    }

    for (let i=1; i<9; i++) {
        sim(i);
    }
}