import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { getAll } from '../services/swApi'
import Header from '../components/Header'
import CharacterList from '../components/CharacterList'

import styles from '../styles/Index.module.css'

export default function Home() {
  const [characters, setCharacters] = useState([])
  const [nextPage, setNextPage] = useState('')
  const [search, setSearch] = useState('')
  const router = useRouter()

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

  useEffect(() => {
    if (search === '') return 

    console.log('search', search)
    router.push(`/search?term=${search}`)
  }, [search])

  const handleNextPage = (e) => {
    e.preventDefault();
    getAll(nextPage).then(response => {
      setCharacters(current => [...current, ...response.results])
      updateNextPage(response.next)
    })
  }

  return (
    <div className={styles.page}>
      <Header updateSearch={setSearch}/>
      <CharacterList characters={characters} />
      {
        nextPage !== '' ? <button className={styles.loadMore} onClick={handleNextPage}>Load more...</button> : ''
      }
    </div>
  )
}
