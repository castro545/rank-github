const Papa = require('papaparse');
const fs = require('fs');

function getTopRepos(N, language) {
  const csvFilePath = 'github-ranking-2018-12-18.csv';
  const csvFile = fs.readFileSync(csvFilePath, 'utf8');

  const repos = Papa.parse(csvFile, { header: true }).data
  .filter(repo => repo.Language && repo.Language.toLowerCase() === language.toLowerCase())
  .sort((a, b) => parseInt(b.Stars) - parseInt(a.Stars))
  .slice(0, N);

  const csvData = Papa.unparse([[
    'Rank', 'Language', 'Name', 'Stars', 'Forks',  'URL', 'Owner', 'Open Issues', 'Last Update', 'Description'
  ], ...repos.map((repo, i) => [
    i + 1, repo.Language, repo.Name, repo.Stars, repo.Forks,  repo.URL, repo.Owner, repo['Open Issues'], repo['Last Update'], repo.Description
  ])]);

  const csvFilePathOutput = `top_${N}_repos_${language}.csv`;
  fs.writeFileSync(csvFilePathOutput, csvData, 'utf8');

  console.log(`TOP ${N} repositorios para el lenguaje ${language} guardados en ${csvFilePathOutput}`);
}

getTopRepos(9, 'JavaScript');
