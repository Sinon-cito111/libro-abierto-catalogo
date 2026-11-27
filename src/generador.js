const PREFIJOS = [
  "La sombra de",
  "Crónica de",
  "El secreto de",
  "Memorias de",
  "Caminos hacia",
  "La casa de",
  "Ecos de",
  "El último viaje de"
];

const SUSTANTIVOS = [
  "la montaña",
  "los sueños",
  "la lluvia",
  "el olvido",
  "la ciudad perdida",
  "las dos palmas",
  "el silencio",
  "la niebla"
];

const NOMBRES = [
  "Gabriel",
  "Laura",
  "Mario",
  "Héctor",
  "Evelio",
  "Jorge",
  "José",
  "Manuel",
  "Isabel",
  "Claudia"
];

const APELLIDOS = [
  "Márquez",
  "Restrepo",
  "Mendoza",
  "Abad",
  "Rosero",
  "Franco",
  "Rivera",
  "Vallejo",
  "Gómez",
  "Cárdenas"
];

function enteroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function elegirAleatorio(lista) {
    return lista[enteroAleatorio(0, lista.length - 1)];
}
function generarIsbnUnico(usados) {
    let isbn;
    do {
        const sufijo = String(enteroAleatorio(0, 9999999)).padStart(7,"0")
        isbn = `978958${sufijo}`;
    } while (usados.has(isbn)) 
        usados.add(isbn)
        return isbn;
}
function generarCatalogo(n) {
    const catalogo = []
    const isbnsUsados = new Set();
    for (let i = 0; i < n; i++){
    const isbn = generarIsbnUnico(isbnsUsados);
    const titulo = `${elegirAleatorio(PREFIJOS)} ${elegirAleatorio(SUSTANTIVOS)}`;
    const autor = `${elegirAleatorio(NOMBRES)} ${elegirAleatorio(APELLIDOS)}`;
    const anio = enteroAleatorio(1900, 2026);
    const prestamos = enteroAleatorio(0, 500);

    catalogo.push({
        isbn,
        titulo,
        autor,
        anio,
        prestamos
    });
    }
    return catalogo;
}
module.exports = { generarCatalogo };