/* eslint-disable react/no-danger */

import PropTypes from "prop-types"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers } from "@fortawesome/free-solid-svg-icons"

import Link from "../link/link"
import Portrait from "./portrait"
import Contact from "../home/contact/contact-container"

import "./pi.css"

const PI = ({ pi }) => {
  return (
    <div className="people">
      <section>
        <header>
          <h1>{pi.frontmatter.name}</h1>
        </header>
        {pi.frontmatter.image && (
          <Portrait image={pi.frontmatter.image} name={pi.frontmatter.name} />
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
