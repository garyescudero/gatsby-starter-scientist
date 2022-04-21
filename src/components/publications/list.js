import PropTypes from "prop-types"
import React, { Fragment } from "react"

import Link from "../link/link"

const formatTitle = title => title.replace(/&lt;.+?&gt;/g, "")

const formatItem = article => (
  <li key={article.title}>
    <strong>
      <Link to={article.link}>{formatTitle(article.title)}</Link>
    </strong>
    <br />
    {article.authors}
    <br />
    {article.publication}
  </li>
)

const PublicationList = ({ publications }) => {
  const yearOrder = Object.keys(publications).sort((a, b) =>
    Number(a) < Number(b) ? 1 : -1
  )

  return (
    <>
      <div className="publications__links-year">
        {yearOrder.map(year => (
          <Link key={year} to={`/publications/#${year}`}>
            {year}
          </Link>
        ))}
      </div>
      {yearOrder.map(year => {
        const items = publications[year].map(article => formatItem(article))
        return (
          <div key={year}>
            <h2 id={year}>{year}</h2>
            <ul>{items}</ul>
          </div>
        )
      })}
    </>
  )
}

PublicationList.propTypes = {
  publications: PropTypes.shape({}).isRequired,
}

export default PublicationList
