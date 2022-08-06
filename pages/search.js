import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { getSearchData } from '../services/swApi'
import CharacterList from '../components/CharacterList'
import Header from '../components/Header'
import Loader from '../components/Loader'

export default function Search() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [nextPage, setNextPage] = useState('')
  const [loading, setLoading] = useState(true)
  const [characters, setCharacters] = useState([])

  const updateNextPage = (nextPage) => {
    const nextPageNumber = nextPage?.match(/(?:=)([0-9]+)/)
    setNextPage(nextPageNumber && nextPageNumber[1] || '')
  }

  useEffect(() => {
    setSearch('')
  }, [])

  useEffect(() => {
    if (!router.query.term || router.query.term === '') return 

    setSearch(router.query.term)
    sessionStorage.setItem('search', router.query.term)
    getSearchData(router.query.term).then(result => {
      setLoading(false)
      setCharacters(result.results)
      updateNextPage(result.next)
    })
  }, [router.query.term])

  useEffect(() => {
    if (!search || search === '') return 
    if (search === undefined) {
      router.push(`/`)
    }
    router.push(`/search?term=${search}`, undefined, {shallow: true})
  }, [search])

  const handleNextPage = (e) => {
    e.preventDefault();
    setLoading(true)
    getSearchData(search, nextPage).then(response => {
      setCharacters(current => [...current, ...response.results])
      updateNextPage(response.next)
      setLoading(false)
    })
  }

  return (
    <div className="page">
      <Head>
        <title>SWAPI</title>
      </Head>
      <Header updateSearch={setSearch} showClearButton={true} />
      <CharacterList characters={characters} />
      { loading && <Loader /> }
      {
        nextPage !== '' ? <button className='loadMore' onClick={handleNextPage}>Load more...</button> : ''
      }
    </div>
  )
}
