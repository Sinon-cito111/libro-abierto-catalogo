const { generarCatalogo } = require("./src/generador");

const libros = generarCatalogo(10000);
const isbnsUnicos = new Set(libros.map((libro) => libro.isbn));

console.log("total de libros generados:", libros.length)
console.log("total ISBN unicos:", isbnsUnicos.size)
console.log("Hay ISBN repetidos?: ",
    libros.length === isbnsUnicos.size ? "No (100% unicos)" : "Si"
)
