import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Publications from "./publications"

import sortArticles from "./sort-articles"

const PublicationsContainer = () => {
  //   const query = useStaticQuery(
  //     graphql`
  //       query {
  //         publications(list: {elemMatch: {title: {regex: "/.*/"}}}) {
  //           list{
  //             authors
  //             title
  //             year
  //             link
  //             publication
  //           }
  //         }
  //       }
  //     `,
  //   );

  //   const publicationsByYear = query.publications && query.publications.list.length > 0
  //     ? sortArticles(query.publications.list)
  //     : null;

  //     if ( publicationsByYear ) {
  //       return (
  //         publicationsByYear
  //         && <Publications publications={publicationsByYear} />
  //       );
  //     }

  const gsQuery = useStaticQuery(
    graphql`
      query {
        googleScholarPublications(
          list: { elemMatch: { title: { regex: "/.*/" } } }
        ) {
          list {
            authors
            title
            year
            link
            publication
          }
        }
      }
    `
  )

  const gsPublicationsByYear =
    gsQuery.googleScholarPublications &&
    gsQuery.googleScholarPublications.list.length > 0
      ? sortArticles(gsQuery.googleScholarPublications.list)
      : null

  return (
    gsPublicationsByYear && <Publications publications={gsPublicationsByYear} />
  )
}

export default PublicationsContainer
