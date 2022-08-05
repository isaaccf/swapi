import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { getAll } from '../services/swApi'
import Header from '../components/Header'
import CharacterList from '../components/CharacterList'

import styles from '../styles/Index.module.css'
import Loader from '../components/Loader'

export default function Home() {
  const [characters, setCharacters] = useState([])
  const [nextPage, setNextPage] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const updateNextPage = (nextPage) => {
    const nextPageNumber = nextPage?.match(/(?:=)([0-9]+)/)
    setNextPage(nextPageNumber && nextPageNumber[1] || '')
  }

  useEffect(() => {
    console.log('index')
    getAll().then(response => {
      setLoading(false)
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
      <Header updateSearch={setSearch} />
      {
        loading || !characters ? <div className="page"><Loader /></div> : <CharacterList characters={characters} />
      }
      {
        nextPage !== '' ? <button className={styles.loadMore} onClick={handleNextPage}>Load more...</button> : ''
      }
    </div>
  )
}
