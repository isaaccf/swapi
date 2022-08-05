import React, { useState } from 'react'
import Searcher from '../Searcher'
import PropTypes from "prop-types"

import styles from './style.module.css'
import Link from 'next/link'

const Header = ( {updateSearch, showClearButton} ) => {
  return (
    <div>
      <Link href="/"><h1 className={styles.h1}>Star Wars API</h1></Link>
      <Searcher updateSearch={updateSearch} showClearButton={showClearButton} />
    </div>
  )
}

Header.propTypes = {
  updateSearch: PropTypes.func,
  showClearButton: PropTypes.bool
}

export default Header