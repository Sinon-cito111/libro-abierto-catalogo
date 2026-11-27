const { generarCatalogo } = require("./generador")
const catalogo = generarCatalogo(100);

console.log("=== Primeros 5 libros generados ===");
console.table(catalogo.slice(0, 5));

let anioMasAntiguo = catalogo[0].anio;
let anioMasReciente = catalogo[0].anio;
let totalPrestamos = 0;

for (const libro of catalogo) {
    if (libro.anio < anioMasAntiguo){
        anioMasAntiguo = libro.anio;
    }
    if (libro.anio > anioMasReciente) {
        anioMasReciente = libro.anio;
    }
    totalPrestamos += libro.prestamos;
}
console.log("\n=== Resumen del catalogo generado ===");
console.log("Total de libros evaluados:", catalogo.length);
console.log("Año más antiguo:          ", anioMasAntiguo);
console.log("Año más reciente:         ", anioMasReciente);
console.log("Total de préstamos:       ", totalPrestamos.toLocaleString("es-CO"));