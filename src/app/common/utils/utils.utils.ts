// Devuelve la cadena original con totas las palabras en letra capital. Ej: "diego junior llusco chui" -> "Diego Junior Llusco Chui"
export function letraCapital(str: string): string {
    if (str.includes(' ')) {
        const arrayString = str.split(" ");
        for (var i = 0; i < arrayString.length; i++) {
            arrayString[i] = arrayString[i].charAt(0).toUpperCase() + arrayString[i].slice(1);
        }
        const frase = arrayString.join(" ");
        return frase;
    } else {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Devuelve la cadena original con la primera palabra en letra capital. Ej: "diego junior llusco chui" -> "Diego junior llusco chui"
export function letraCapitalInicial(str: string): string {
    if (str.includes(' ')) {
        const arrayString = str.split(" ");

        arrayString[0] = arrayString[0].charAt(0).toUpperCase() + arrayString[0].slice(1);
        const frase = arrayString.join(" ");

        return frase;
    } else {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Devuelve la primera palabra de una cadena. Ej:"Diego Junior Llusco Chui" -> "Diego"
export function returnPrimerSubString(nombres: string): string {
    const arrayString = nombres.split(" ");
    let str = arrayString[0];
    return str;
}

// Devuleve una cadena en mayúsculas de todas las letras iniciales de cada palabra. Ej:"Diego Junior Llusco Chui" -> "DJLC"
export function inicialesCapital(str: string): string {
    const arrayString = str.split(" ");
    for (var i = 0; i < arrayString.length; i++) {
        arrayString[i] = arrayString[i].charAt(0).toUpperCase();
    }
    const frase = arrayString.join("");
    return frase;
}

// Devuelve cadena de numeros con ceros a la izquierda
export function addCerosIzquierda(num: number): string {
    if (num >= 1 && num < 10) {
        return "000" + num;
    } else if (num >= 10 && num < 100) {
        return "00" + num;
    } else if (num >= 100 && num < 1000) {
        return "0" + num;
    } else {
        return String(num)
    }
}

export function getCodigoServicioNum(str: string): string {
    const arrayString = str.split("-");

    return addCerosIzquierda(Number(arrayString[arrayString.length - 1]) + 1);
}

// Devuelve monto con coma decimal sin Bs. Ej. 5000 -> 5,000.00
export function formatoMonto(monto: number) {
    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
    })
    return formatter.format(monto)
}

// Devuelve monto con coma decimal Con Bs. Ej. 5000 -> Bs. 5,000.00
export function formatoBsMonto(monto: number): string {
    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
    })
    return 'Bs. ' + formatter.format(monto)
}