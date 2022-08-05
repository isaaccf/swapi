import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getSearchData } from '../services/swApi'
import CharacterList from '../components/CharacterList'
import Header from '../components/Header'
import Loader from '../components/Loader'

export default function Search() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [characters, setCharacters] = useState([])

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
    })
  }, [router.query.term])

  useEffect(() => {
    if (!search || search === '') return 
    if (search === undefined) {
      router.push(`/`)
    }
    router.push(`/search?term=${search}`, undefined, {shallow: true})
  }, [search])

  return (
    <div className="page">
      <Header updateSearch={setSearch} showClearButton={true} />
      {
        loading || !characters ? <div className="page"><Loader /></div> : <CharacterList characters={characters} />
      }
    </div>
  )
}
