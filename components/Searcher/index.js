import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import PropTypes from "prop-types"

import styles from './style.module.css'

const Searcher = ({ updateSearch, showClearButton}) => {
  const [search, setSearch] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (!router.query.term || router.query.term === '') return 

    setSearch(router.query.term)
  }, [router.query.term])

  const handleSubmit = (e) => {
    e.preventDefault()
    updateSearch(search)
  } 

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const clearSearch = (e) => {
    e.preventDefault()
    setSearch('')
    router.push('/')
  }

  return (
    <>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input className={styles.search} type="text" placeholder="Search..." onChange={handleChange} value={search} />
        <button className={`${styles.button} ${styles.searchButton}`} onClick={handleSubmit}>🔎</button>
        { showClearButton ? <button className={`${styles.button} ${styles.clearButton}`} onClick={clearSearch}>✖️</button> : '' }
      </form>
    </>
  )
}

Searcher.propTypes = {
  updateSearch: PropTypes.func.isRequired,
  showClearButton: PropTypes.bool
};

export default Searcher