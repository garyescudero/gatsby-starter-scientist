import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import People from "./people"

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
            image {
              childImageSharp {
                gatsbyImageData(
                  quality: 70
                  placeholder: BLURRED
                  width: 300
                  layout: CONSTRAINED
                  transformOptions: { fit: OUTSIDE }
                )
              }
            }
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
