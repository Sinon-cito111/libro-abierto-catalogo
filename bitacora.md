### Verificación de unicidad de ISBN (`n = 10.000`)

* **Cómo funciona el generador:** En `src/generador.js`, `generarIsbnUnico` utiliza un conjunto (`Set`) llamado `isbnsUsados` junto con un ciclo `do...while (usados.has(isbn))` que vuelve a generar el sufijo aleatorio de 7 dígitos en caso de colisión antes de aceptarlo, garantizando por diseño que ningún código se repita.
* **Comprobación empírica (`pruebas.js`):**
  1. Se invocó `const libros = generarCatalogo(10000);` para generar un catálogo de `10.000` libros.
  2. Se extrajeron todos los códigos en un conjunto nuevo: `const isbnsUnicos = new Set(libros.map((libro) => libro.isbn));` (ya que un `Set` descarta automáticamente cualquier valor duplicado).
  3. Se comparó `libros.length` contra `isbnsUnicos.size`.
* **Resultado obtenido:** `libros.length === 10000` y `isbnsUnicos.size === 10000` (`0` duplicados), confirmando que el generador produce `10.000` ISBN únicos de 13 dígitos.
---

## Consultas de la red de bibliotecas (`libro-abierto-catalogo`)

Antes de implementar los algoritmos de búsqueda, se definen los tres tipos de consulta que soportará el catálogo y la cardinalidad esperada de sus resultados:

| Tipo de consulta | Campo evaluado | ¿Devuelve un libro o varios? | Tipo de retorno esperado | Justificación |
| :--- | :--- | :--- | :--- | :--- |
| **Por ISBN** | `libro.isbn` | **Un solo libro** (o `null` si no existe) | `Object \| null` | El ISBN es un **identificador único** por edición/título en el catálogo; no existen dos libros distintos con el mismo ISBN, por lo que la búsqueda puede detenerse apenas encuentra la coincidencia exacta. |
| **Por título** | `libro.titulo` | **Varios libros** (o arreglo vacío `[]` si no hay coincidencias) | `Array<Object>` | Distintas editoriales, reediciones o coincidencias parciales de búsqueda (por ejemplo, buscar `"años"` o títulos generados) pueden compartir el mismo título o subcadena, por lo que se deben recolectar todas las coincidencias. |
| **Por autor** | `libro.autor` | **Varios libros** (o arreglo vacío `[]` si no hay coincidencias) | `Array<Object>` | Un mismo autor puede tener múltiples obras registradas en el catálogo de la red (por ejemplo, todos los libros escritos por `"Gabriel García Márquez"` o `"Laura Restrepo"`). |

### Implicación para el diseño de búsqueda

* **Búsqueda por ISBN (`buscarPorIsbn`):** Al buscar un único identificador exacto, admite corte temprano (*early return*) en búsqueda lineal y se beneficia directamente de **búsqueda binaria** ($O(\log n)$) cuando el catálogo está ordenado por `isbn`.
* **Búsqueda por título y por autor (`buscarPorTitulo`, `buscarPorAutor`):** Al poder devolver múltiples libros, deben recorrer todas las coincidencias (o el rango completo de coincidencias si el catálogo está ordenado por ese criterio) y retornar un arreglo (`[]`).