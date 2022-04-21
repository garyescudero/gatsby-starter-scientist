import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import People from "./people"

import sortMarkdown from "../../utils/sort-markdown"

const PeopleContainer = () => {
  // const query = useStaticQuery(
  //   graphql`
  //     query {
  //       markdown: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/people/" } }) {
  //         edges {
  //           node {
  //             html
  //             frontmatter {
  //               email
  //               image {
  //                 childImageSharp {
  //                   gatsbyImageData(
  //                     quality: 70,
  //                     placeholder: BLURRED,
  //                     height: 300,
  //                     width: 300,
  //                   )
  //                 }
  //               }
  //               name
  //               title
  //               order
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `,
  // );

  // const markdown = sortMarkdown(query.markdown.edges, ['order', 'name']);

  const query = useStaticQuery(
    graphql`
      query {
        allPeopleCsv {
          nodes {
            category
            current_or_alumni
            description
            email
            name
            order
            title
          }
        }
      }
    `
  )

  return query.allPeopleCsv?.nodes?.length > 0 ? (
    <People personList={query.allPeopleCsv.nodes} />
  ) : null
}

export default PeopleContainer
