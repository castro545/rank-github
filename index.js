// Importamos las librerías necesarias para el manejo de archivos y de CSV

const Papa = require('papaparse');
const fs = require('fs');

/**
 * Definimos una función que recibe dos parámetros:
 * @param{N} -> número de repositorios que queremos obtener
 * @param{language} language: lenguaje de programación que queremos filtrar
 * @returns archivo .cvs con los lenguajes y numero de repositorios filtrados
 */
function getTopRepos(N, language) {

  // Leemos el archivo CSV que contiene los datos de los repositorios
  const csvFilePath = 'github-ranking-2018-12-18.csv';
  const csvFile = fs.readFileSync(csvFilePath, 'utf8');

  // Parseamos el contenido del archivo CSV utilizando la librería PapaParse
  const repos = Papa.parse(csvFile, { header: true }).data
    // Filtramos los repositorios por el lenguaje de programación
    .filter(repo => repo.Language && repo.Language.toLowerCase() === language.toLowerCase())
    // Ordenamos los repositorios por la cantidad de estrellas y nos quedamos con los N primeros
  .sort((a, b) => parseInt(b.stars) - parseInt(a.stars))
  .slice(0, N);

  // Convertimos los datos de los repositorios en un archivo CSV utilizando la librería PapaParse
  const csvData = Papa.unparse([[
    'Rank', 'Language', 'Name', 'Stars', 'Forks',  'URL', 'Owner', 'Open Issues', 'Last Update', 'Description'
  ], ...repos.map((repo, i) => [
    i + 1, repo.Language, repo.Name, repo.Stars, repo.Forks,  repo.URL, repo.Owner, repo['Open Issues'], repo['Last Update'], repo.Description
  ])]);

  // Guardamos el archivo CSV generado en disco
  const csvFilePathOutput = `top_${N}_repos_${language}.csv`;
  fs.writeFileSync(csvFilePathOutput, csvData, 'utf8');

  // Imprimimos un mensaje en consola indicando que se ha completado la operación
  console.log(`TOP ${N} repositorios para el lenguaje ${language} guardados en ${csvFilePathOutput}`);
}

// Ejecutamos la función getTopRepos con los parámetros deseados
getTopRepos(8 ,'JavaScript'); 
