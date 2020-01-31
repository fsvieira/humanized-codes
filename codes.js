const codeSystem = base => {

    if (base > 36) {
        throw "Base need to be less then 37."
    }

    const symbols = [];

    for (let i = 0; i < base; i++) {
        if (i < 10) {
            symbols.push("" + i)
        }
        else {
            const letter = "A".charCodeAt(0) + i - 10;
            symbols.push(String.fromCharCode(letter));
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

module.exports = {
    codeSystem,
    base36: codeSystem(36)
}

