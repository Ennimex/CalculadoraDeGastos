"use strict";
let transacciones = [];
let contadorId = 1;
const montoInput = document.getElementById("monto");
const descripcionInput = document.getElementById("descripcion");
const agregarIngresoButton = document.getElementById("agregarIngreso");
const agregarGastoButton = document.getElementById("agregarGasto");
const balanceTotalElement = document.getElementById("balanceTotal");
const listaTransaccionesElement = document.getElementById("listaTransacciones");
function agregarTransaccion(tipo) {
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
    const nuevaTransaccion = {
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
