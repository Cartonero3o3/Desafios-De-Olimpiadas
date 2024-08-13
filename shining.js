let filas = [];
let columnas = [];
let vidaIniciales = [];
let vidaActuales = [];
let mapa = [];
let luchadoresChequeados = [];

function principal() {
    const datos = {
        n: 2,
        r: 2,
        c: 2,
        luchadores: [
            { fila: 0, columna: 0, vidaInicial: 13, vidaActual: 13 },
            { fila: 1, columna: 1, vidaInicial: 40, vidaActual: 40 }
        ],
        d: 5,
        mapa: [
            "..",
            ".."
        ]
    };

    for (const luchador of datos.luchadores) {
        filas.push(luchador.fila);
        columnas.push(luchador.columna);
        vidaIniciales.push(luchador.vidaInicial);
        vidaActuales.push(luchador.vidaActual);
        luchadoresChequeados.push(false);
    }

    mapa = datos.mapa.map(linea => linea.split('').map(c => '-1'));

    for (let i = 0; i < columnas.length; ++i) {
        mapa[filas[i]][columnas[i]] = "L";
    }

    const resultado = sanar(filas, columnas, vidaIniciales, vidaActuales, datos.d, mapa);
    console.log("Máxima curación posible ->", resultado);
}

function sanar(filas, columnas, vidaIniciales, vidaActuales, d, mapa) {
    if (filas[0] < 0 || filas[0] >= mapa.length || columnas[0] < 0 || columnas[0] >= mapa[filas[0]].length || mapa[filas[0]][columnas[0]] === "X") {
        return 0;
    }

    if (mapa[filas[0]][columnas[0]] !== "L") {
        if (parseInt(mapa[filas[0]][columnas[0]]) >= d) {
            return 0;
        }
    } else if (d === 0) {
        return 0;
    }

    mapa[filas[0]][columnas[0]] = d.toString();

    let maxCuracion = 0;
    if (mapa[filas[0]][columnas[0]] !== "L") {
        if (hayLuchadoresPendientes()) {
            maxCuracion = obtenerMaximaCuracionDisponible(filas, columnas);
        }
    }

    if (d > 0) {
        const direcciones = [
            [-1, 0],
            [0, 1],
            [1, 0],
            [0, -1]
        ];

        for (const [df, dc] of direcciones) {
            const filaOriginal = filas[0];
            const columnaOriginal = columnas[0];
            filas[0] += df;
            columnas[0] += dc;
            maxCuracion = Math.max(maxCuracion, sanar(filas, columnas, vidaIniciales, vidaActuales, d - 1, mapa));
            filas[0] = filaOriginal;
            columnas[0] = columnaOriginal;
        }
    }

    return maxCuracion;
}

function obtenerMaximaCuracionDisponible(filas, columnas) {
    let maximaCuracion = 0;

    for (let i = 0; i < vidaIniciales.length; ++i) {
        if (Math.abs(filas[0] - filas[i]) + Math.abs(columnas[0] - columnas[i]) <= 2) {
            let curacionPosible = vidaIniciales[i] - vidaActuales[i];
            curacionPosible = Math.min(curacionPosible, 10);
            maximaCuracion = Math.max(maximaCuracion, curacionPosible);
            luchadoresChequeados[i] = true;
        }
    }

    return maximaCuracion;
}

function hayLuchadoresPendientes() {
    return luchadoresChequeados.some(chequeado => !chequeado);
}

principal();



/*en caso de ejecutar el otro ejemplo les ahorro tiempo 

let fila = [];
let col = [];
let vidaInicial = [];
let vidaActual = [];
let mapa = [];
let luchadoresChequeados = [];

function main() {

    const datos = {
        n: 6,
        r: 4,
        c: 6,
        luchadores: [
            { fila: 2, col: 2, vidaInicial: 13, vidaActual: 10 },
            { fila: 3, col: 3, vidaInicial: 40, vidaActual: 34 },
            { fila: 0, col: 5, vidaInicial: 40, vidaActual: 1 },
            { fila: 2, col: 0, vidaInicial: 50, vidaActual: 48 },
            { fila: 0, col: 4, vidaInicial: 40, vidaActual: 32 },
            { fila: 3, col: 1, vidaInicial: 6, vidaActual: 1 }
        ],
        d: 4,
        mapa: [
            "..XX..",
            "...XXX",
            "...X..",
            "......"
        ]
    };

    for (const luchador of datos.luchadores) {
        fila.push(luchador.fila);
        col.push(luchador.col);
        vidaInicial.push(luchador.vidaInicial);
        vidaActual.push(luchador.vidaActual);
        luchadoresChequeados.push(false);
    }

    mapa = datos.mapa.map(line => line.split('').map(c => c !== 'X' ? '-1' : c));

    for (let i = 0; i < col.length; ++i) {
        mapa[fila[i]][col[i]] = "L";
    }

    const resultado = sanar(fila, col, vidaInicial, vidaActual, datos.d, mapa);
    console.log("Máxima curación posible ->", resultado);
}


function sanar(fila, col, vidaInicial, vidaActual, d, mapa) {
    if (fila[0] < 0 || fila[0] >= mapa.length || col[0] < 0 || col[0] >= mapa[fila[0]].length || mapa[fila[0]][col[0]] === "X") {
        return 0;
    }

    if (mapa[fila[0]][col[0]] !== "L") {
        if (parseInt(mapa[fila[0]][col[0]]) >= d) {
            return 0;
        }
    } else if (d === 0) {
        return 0;
    }

    mapa[fila[0]][col[0]] = d.toString();

    let maxHeal = 0;
    if (mapa[fila[0]][col[0]] !== "L") {
        if (luchadoresPendientes()) {
            maxHeal = maximaCuracionDisponible(fila, col);
        }
    }

    if (d > 0) {
        const direcciones = [
            [-1, 0], // Arriba
            [0, 1],  // Derecha
            [1, 0],  // Abajo
            [0, -1]  // Izquierda
        ];

        for (const [df, dc] of direcciones) {
            const filaOriginal = fila[0];
            const colOriginal = col[0];
            fila[0] += df;
            col[0] += dc;
            maxHeal = Math.max(maxHeal, sanar(fila, col, vidaInicial, vidaActual, d - 1, mapa));
            fila[0] = filaOriginal;
            col[0] = colOriginal;
        }
    }

    return maxHeal;
}

function maximaCuracionDisponible(fila, col) {
    let maximaCuracion = 0;

    for (let i = 0; i < vidaInicial.length; ++i) {
        if (Math.abs(fila[0] - fila[i]) + Math.abs(col[0] - col[i]) <= 2) {
            let curacionPosible = vidaInicial[i] - vidaActual[i];
            curacionPosible = Math.min(curacionPosible, 10);
            maximaCuracion = Math.max(maximaCuracion, curacionPosible);
            luchadoresChequeados[i] = true;
        }
    }

    return maximaCuracion;
}

function luchadoresPendientes() {
    return luchadoresChequeados.some(chequeado => !chequeado);
}

main();

*/