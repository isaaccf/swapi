import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import PropTypes from "prop-types"

import styles from './style.module.css'

const Searcher = ({ updateSearch, showClearButton}) => {
  const [search, setSearch] = useState('')
  const router = useRouter()

  useEffect(() => {
    console.log(sessionStorage.getItem('searchValue'))
    setSearch(sessionStorage.getItem('searchValue') || '')
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    updateSearch(search)
  } 

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const clearSearch = (e) => {
    e.preventDefault()
    sessionStorage.removeItem('searchValue')
    router.push('/')
  }

  return (
    <>
      <form className={styles.searchFrom} onSubmit={handleSubmit}>
        <input className={styles.search} style={showClearButton &&  { width: 'calc(100% - 100px)' }} type="text" placeholder="Search..." onChange={handleChange} value={search} />
        <button className={styles.button} onClick={handleSubmit}>🔎</button>
        { showClearButton ? <button className={`${styles.button} ${styles.clearButton}`} onClick={clearSearch}>✖️</button> : '' }
      </form>
    </>
  )
}

Searcher.propTypes = {
  updateSearch: PropTypes.func.isRequired,
  showClearButton: PropTypes.bool,
  searchValue: PropTypes.string
};

export default Searcher