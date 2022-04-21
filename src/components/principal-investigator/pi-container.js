import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import PI from "./pi"

const PIContainer = () => {
  const query = useStaticQuery(
    graphql`
      query {
        markdown: markdownRemark(fileAbsolutePath: { regex: "/pi.md/" }) {
          html
          frontmatter {
            email
            image {
              childImageSharp {
                gatsbyImageData(
                  quality: 100
                  placeholder: BLURRED
                  height: 300
                  width: 300
                )
              }
            }
            name
            title
            order
          }
        }
      }
    `
  )

  console.log(query.markdown)

  return query.markdown === null || query.markdown.html === "" ? null : (
    <PI pi={query.markdown} />
  )
}

export default PIContainer
