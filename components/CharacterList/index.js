import React, { useEffect } from 'react'
import PropTypes from "prop-types"

import ListItem from '../ListItem'

import styles from './style.module.css'

const CharacterList = ({ characters }) => {

  return (
    <div className={styles.container}>
      {
        characters?.map(character => {
          return <ListItem key={character.name} element={character} />
        })
      }
    </div>
  )
}

CharacterList.propTypes = {
  characters: PropTypes.array.isRequired
};

export default CharacterList