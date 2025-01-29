type TipoTransaccion = "ingreso" | "gasto";

interface Transaccion {
    id: number;
    monto: number;
    descripcion: string;
    tipo: TipoTransaccion;
}

let transacciones: Transaccion[] = [];
let contadorId = 1;

const montoInput = document.getElementById("monto") as HTMLInputElement;
const descripcionInput = document.getElementById("descripcion") as HTMLInputElement;
const agregarIngresoButton = document.getElementById("agregarIngreso") as HTMLButtonElement;
const agregarGastoButton = document.getElementById("agregarGasto") as HTMLButtonElement;
const balanceTotalElement = document.getElementById("balanceTotal") as HTMLSpanElement;
const listaTransaccionesElement = document.getElementById("listaTransacciones") as HTMLUListElement;

function agregarTransaccion(tipo: TipoTransaccion) {
    const monto = parseFloat(montoInput.value);
    const descripcion = descripcionInput.value.trim();

    if (monto <= 0 || isNaN(monto)) {
        alert("El monto debe ser un número positivo.");
        return;
    }

    if (descripcion === "") {
        alert("La descripción no puede estar vacía.");
        return;
    }

    const nuevaTransaccion: Transaccion = {
        id: contadorId++,
        monto,
        descripcion,
        tipo,
    };

    transacciones.push(nuevaTransaccion);
    actualizarBalance();
    actualizarListaTransacciones();
    limpiarFormulario();
}

function actualizarBalance() {
    const total = transacciones.reduce((acc, transaccion) => {
        return transaccion.tipo === "ingreso" ? acc + transaccion.monto : acc - transaccion.monto;
    }, 0);
    balanceTotalElement.textContent = total.toFixed(2);
}

function actualizarListaTransacciones() {
    listaTransaccionesElement.innerHTML = "";
    transacciones.forEach((transaccion) => {
        const li = document.createElement("li");
        li.textContent = `${transaccion.descripcion}: $${transaccion.monto.toFixed(2)}`;
        li.classList.add(transaccion.tipo);
        listaTransaccionesElement.appendChild(li);
    });
}

function limpiarFormulario() {
    montoInput.value = "";
    descripcionInput.value = "";
}

agregarIngresoButton.addEventListener("click", () => agregarTransaccion("ingreso"));
agregarGastoButton.addEventListener("click", () => agregarTransaccion("gasto"));