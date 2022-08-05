import React, { useState } from 'react'
import Searcher from '../Searcher'
import PropTypes from "prop-types"

import styles from './style.module.css'

const Header = ( {updateSearch, showClearButton, searchValue} ) => {
  return (
    <div>
      <h1 className={styles.h1}>Star Wars API</h1>
      <Searcher updateSearch={updateSearch} showClearButton={showClearButton} searchValue={searchValue} />
    </div>
  )
}

Header.propTypes = {
  updateSearch: PropTypes.func,
  showClearButton: PropTypes.bool,
  searchValue: PropTypes.string
}

export default Header