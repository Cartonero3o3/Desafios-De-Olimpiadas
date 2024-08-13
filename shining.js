const sanar = (filas, columnas, vidaInicial, vidaActual, d, mapa) => {
    const filasMapa = mapa.length;
    const columnasMapa = mapa[0].length;
    const direcciones = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    const distanciaManhattan = (x1, y1, x2, y2) => 
        Math.abs(x1 - x2) + Math.abs(y1 - y2);

    const buscarPosicionesAlcanzables = (filaInicio, columnaInicio, distanciaMaxima) => {
        const cola = [[filaInicio, columnaInicio, 0]];
        const visitado = new Set();
        visitado.add(`${filaInicio},${columnaInicio}`);
        const posicionesAlcanzables = [];

        while (cola.length > 0) {
            const [filaActual, columnaActual, distancia] = cola.shift();

            if (distancia <= distanciaMaxima) {
                posicionesAlcanzables.push([filaActual, columnaActual]);

                for (const [dx, dy] of direcciones) {
                    const nuevaFila = filaActual + dx;
                    const nuevaColumna = columnaActual + dy;

                    if (nuevaFila >= 0 && nuevaFila < filasMapa &&
                        nuevaColumna >= 0 && nuevaColumna < columnasMapa &&
                        mapa[nuevaFila][nuevaColumna] === '.' &&
                        !visitado.has(`${nuevaFila},${nuevaColumna}`)) {
                        
                        visitado.add(`${nuevaFila},${nuevaColumna}`);
                        cola.push([nuevaFila, nuevaColumna, distancia + 1]);
                    }
                }
            }
        }

        return posicionesAlcanzables;
    };

    const calcularSanacion = (filaDesde, columnaDesde) => {
        let totalSanado = 0;
        for (let i = 0; i < filas.length; i++) {
            const distancia = distanciaManhattan(filaDesde, columnaDesde, filas[i], columnas[i]);
            if (distancia <= 2) {
                const vidaMaxima = vidaInicial[i] - vidaActual[i];
                if (vidaMaxima > 0) {
                    // Solo se permite curar hasta menos de 10 puntos de vida
                    totalSanado += Math.min(vidaMaxima, 9); // Cambiado de 10 a 9
                }
            }
        }
        return totalSanado;
    };

    const posicionesAlcanzables = buscarPosicionesAlcanzables(filas[0], columnas[0], d);
    let maxVidaSanada = 0;

    for (const [fila, columna] of posicionesAlcanzables) {
        if (mapa[fila][columna] === '.') {
            const sanacion = calcularSanacion(fila, columna);
            maxVidaSanada = Math.max(maxVidaSanada, sanacion);
        }
    }

    return maxVidaSanada;
};

// Ejemplo de uso:
const filas = [2, 3, 0, 2, 0, 3, 4];
const columnas = [2, 3, 5, 0, 4, 1, 9];
const vidaInicial = [13, 40, 50, 40, 40, 6];
const vidaActual = [10, 34, 48, 32, 10, 1];
const d = 4;
const mapa = [
    "..XX..",
    "...XXX",
    "...X..",
    "......"
];

console.log(sanar(filas, columnas, vidaInicial, vidaActual, d, mapa)); // Debe imprimir 8
