/* eslint-disable react/no-danger */

import PropTypes from "prop-types"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers } from "@fortawesome/free-solid-svg-icons"

import Link from "../link/link"
import Portrait from "./portrait"

import "./people.css"

const categorySortMap = new Map([
  ["STEPH", 1],
  ["PHD", 2],
  ["MASTERS", 3],
  ["POST-DOC", 4],
  ["EMPLOYEE", 5],
  ["MEDICAL", 6],
  ["UNDERGRAD", 7],
  ["VOLUNTEER", 8],
  ["VISITING", 9],
]);

const sortPeople = (a, b) => {
  const aValue = categorySortMap.get(a.category) * 1000 + a.order
  const bValue = categorySortMap.get(b.category) * 1000 + b.order

  if (aValue < bValue) {
    return -1
  }
  if (aValue > bValue) {
    return 1
  }
  return 0
};

const People = ({ personList }) => {
  const currentPeople = personList
    .filter(p =>  p.category != "VOLUNTEER" && p.current_or_alumni == "CURRENT")
    .sort(sortPeople);
    const volunteerPeople = personList
    .filter(p => p.category == "VOLUNTEER" && p.current_or_alumni == "CURRENT")
    .sort(sortPeople);
    const alumniPeople = personList
    .filter(p => p.current_or_alumni == "ALUMNI")
    .sort(sortPeople);
  return (
    <div className="people">
      <section>
        <header>
          <h1>People</h1>
          <FontAwesomeIcon icon={faUsers} size="2x" />
        </header>

        <h2>Current Lab Members</h2>
        <ul className="people__list">
          {currentPeople.map(Person)}
        </ul>
        <h3>Volunteers</h3>
        <ul className="people__list">
          {volunteerPeople.map(SimplePerson)}
        </ul>

        <h2>Alumni</h2>
        <h3>PhD</h3>
        <ul className="people__list">
          {alumniPeople.filter(p =>  p.category == "PHD").map(AlumniPerson)}
        </ul>
        <h3>Masters</h3>
        <ul className="people__list">
          {alumniPeople.filter(p =>  p.category == "MASTERS").map(AlumniPerson)}
        </ul>
        <h3>Undergrad</h3>
        <ul className="people__list">
          {alumniPeople.filter(p =>  p.category == "UNDERGRAD").map(SimplePerson)}
        </ul>
        <h3>Visiting Students</h3>
        <ul className="people__list">
          {alumniPeople.filter(p =>  p.category == "VISITING").map(AlumniPerson)}
        </ul>
      </section>
    </div>
  )
}

const Person = person => (
  <li key={person.name}>
    {person.image &&  <Portrait image={person.image} name={person.name} /> }
    <div>
      <h4>{person.name}</h4>
      {person.title && <h5>{person.title}</h5>}
      {person.email && (
        <Link
          className="person__list-email"
          to={`mailto:${person.email}`}
        >
          {person.email}
        </Link>
      )}
      {person.description && <div dangerouslySetInnerHTML={{ __html: person.description }} />}
    </div>
  </li>
);

const SimplePerson = person => (
  <li key={person.name}>
      <h4>{person.name}</h4>
  </li>
);


const AlumniPerson = person => (
  <li key={person.name}>
    <div>
      <h4>{person.name}</h4>
      {person.title && <h5>{person.title}</h5>}
    </div>
  </li>
);

People.propTypes = {
  markdown: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        frontmatter: PropTypes.shape({
          email: PropTypes.string,
          image: PropTypes.shape({}),
          name: PropTypes.string,
          title: PropTypes.string,
        }),
        html: PropTypes.node,
      }),
    })
  ).isRequired,
}

export default People
