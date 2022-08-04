import Link from "next/link"
import React from "react"

import styles from './style.module.css'

const listItem = ({element} = {}) => {

  const getCharacterId = (url) => {
    let match = url.match(/(\d+)(?=[^\d]+$)/)
    return match && match[0]
  }

  return (
    <Link href={`/character/${getCharacterId(element?.url)}`}>
      <div className={styles.itemList}>
        <div className={styles.itemName}>{element?.name}</div>
        <div className={styles.itemFilms}>{element?.films?.length} films</div>
        <div className={styles.itemBirth}>Birth year: {element?.birth_year}</div>
      </div>
    </Link>
  )
}

export default listItem