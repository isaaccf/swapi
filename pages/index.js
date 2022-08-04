import React, { useEffect, useState } from 'react'
import styles from '../styles/Index.module.css'

import { getAll } from '../services/swApi'
import ListItem from '../components/ListItem'

export default function Home() {
  const [characters, setCharacters] = useState([])
  const [nextPage, setNextPage] = useState('')

  const updateNextPage = (nextPage) => {
    const nextPageNumber = nextPage?.match(/(?:=)([0-9]+)/)
    setNextPage(nextPageNumber && nextPageNumber[1] || '')
  }

  useEffect(() => {
    getAll().then(response => {
      setCharacters(response.results)
      updateNextPage(response.next)
    })
  }, [])

  const handleNextPage = (e) => {
    e.preventDefault();
    getAll(nextPage).then(response => {
      setCharacters(current => [...current, ...response.results])
      updateNextPage(response.next)
    })
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.h1}>Star Wars API</h1>
      <div className={styles.container}>
        {
          characters?.map(character => {
            return <ListItem key={character.name} element={character} />
          })
        }
      </div>
      {
        nextPage !== '' ? <button className={styles.loadMore} onClick={handleNextPage}>Load more...</button> : ''
      }
    </div>
  )
}
