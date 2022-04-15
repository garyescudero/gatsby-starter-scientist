const { request } = require("gaxios")

const parseAuthors = authors => authors.map(author => author.name)

const parseYear = date => Number(date.split(" ")[0])


const formatAuthors = (authors, title) => {
  return authors.join(", ")
}

const formatPages = (volume, issue, pages) => {
  if (volume && issue && pages) {
    return `, ${volume}(${issue}): ${pages}`
  }
  if (volume && pages) {
    return `, ${volume}: ${pages}`
  }
  if (pages) {
    return `, ${pages}`
  }
  return ""
}

const parseArticles = dataWithUIDs => {
  const data = dataWithUIDs
  delete data.uids
  const articles = Object.entries(data).map(([pmid, datum]) => ({
    authors: formatAuthors(parseAuthors(datum.authors)),
    title: datum.title,
    year: parseYear(datum.pubdate),
    link: `https://www.ncbi.nlm.nih.gov/pubmed/${Number(pmid)}`,
    publication: `${datum.source} ${formatPages(
      datum.volume,
      datum.issue,
      datum.pages
    )}`,
  }))
  return articles
}

const fetchArticles = async ids => {
  const idParam = ids.join(",")
  const response = await request({
    url: `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${idParam}`,
  })
  return parseArticles(response.data.result)
}

module.exports = fetchArticles
