const codeSystem = (base, customizedSymbols) => {

    if (base > 36) {
        throw "Base need to be less then 37."
    }

    const symbols = customizedSymbols || [];

    if (!symbols.length) {
        for (let i = 0; i < base; i++) {
            if (i < 10) {
                symbols.push("" + i)
            }
            else {
                const letter = "A".charCodeAt(0) + i - 10;
                symbols.push(String.fromCharCode(letter));
            }
        }
    }

    return {
        encode: number => {
            let code = "";

            do {
                code = symbols[number % base] + code;
                number = Math.floor(number / base)
            } while (number > 0)

            return code;
        },
        decode: code => {
            let number = 0;
            for (let i = code.length - 1; i >= 0; i--) {
                const c = symbols.indexOf(code[i]);
                const position = code.length - 1 - i;
                number += c * Math.pow(base, position);
            }

            return number;
        }
    };
}

const errorSystem = bits => {
    if (bits === 0) {
        throw "Can't detect any erros with 0 bits.";
    }

    const mask = (1 << bits) - 1;

    const xor = n => {
        let x = mask;
        
        while (n > 0) {
            const a = mask & n;
            n = n >> bits;
            x = (x ^ a) & mask;
        }
    
        return x;
    }

    return {
        bootstrap: number => {
            const x = xor(number);
            const result = (number << bits) + x;
            return result;
        },
        check: number => {
            const n = number >> bits;
            const x = number & mask;
            const c = xor(n);

            return x === c;
        }
    }
}

module.exports = {
    codeSystem,
    errorSystem,
    base36: codeSystem(36),
    error5: errorSystem(5) 
}

