import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { getAll } from '../services/swApi'
import Header from '../components/Header'
import CharacterList from '../components/CharacterList'

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
    sessionStorage.removeItem('search')
    getAll().then(response => {
      setLoading(false)
      setCharacters(response.results)
      updateNextPage(response.next)
    })
  }, [])

  useEffect(() => {
    if (search === '') return 

    router.push(`/search?term=${search}`)
  }, [search])

  const handleNextPage = (e) => {
    e.preventDefault();
    setLoading(true)
    getAll(nextPage).then(response => {
      setCharacters(current => [...current, ...response.results])
      updateNextPage(response.next)
      setLoading(false)
    })
  }

  return (
    <div className='page'>
      <Header updateSearch={setSearch} />
      <CharacterList characters={characters} />
      { loading && <Loader /> }
      {
        nextPage !== '' ? <button className='loadMore' onClick={handleNextPage}>Load more...</button> : ''
      }
    </div>
  )
}
