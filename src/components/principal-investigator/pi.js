/* eslint-disable react/no-danger */

import PropTypes from "prop-types"
import React from "react"

import { GatsbyImage } from "gatsby-plugin-image"
import Contact from "../home/contact/contact-container"

import "./pi.css"

const PI = ({ pi }) => {
  return (
    <div className="principal-investigator">
      <section>
        <header>
          <h1>{pi.frontmatter.name}</h1>
        </header>
        {pi.frontmatter.image && (
          <GatsbyImage
            alt={pi.frontmatter.name}
            className="principal-investigator__image"
            image={pi.frontmatter.image.childImageSharp.gatsbyImageData}
          />
        )}
        {pi.html && <div dangerouslySetInnerHTML={{ __html: pi.html }} />}
      </section>
      <Contact />
    </div>
  )
}

PI.propTypes = {
  pi: PropTypes.node.isRequired,
}

export default PI
