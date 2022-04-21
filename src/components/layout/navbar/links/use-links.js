import { useStaticQuery, graphql } from "gatsby"

const useLinks = () => {
  const query = useStaticQuery(
    graphql`
      query {
        people: allPeopleCsv {
          nodes {
            name
          }
        }
        googleScholarPublications(
          list: { elemMatch: { title: { regex: "/.*/" } } }
        ) {
          list {
            title
          }
        }
        markdown: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/pi.md/" } }
        ) {
          edges {
            node {
              id
            }
          }
        }
      }
    `
  )

  const links = []

  if (query?.people?.nodes.length > 0) {
    links.push("people")
  }
  if (query?.googleScholarPublications) {
    links.push("publications")
  }
  if (query?.markdown?.edges?.length > 0) {
    links.push("pi")
  }

  return links
}

export default useLinks
