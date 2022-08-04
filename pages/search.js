import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getSearchData } from '../services/swApi'
import CharacterList from '../components/CharacterList'
import Header from '../components/Header'

export default function Home() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    if (!router.query.term) return 

    setSearch(router.query.term)
    sessionStorage.setItem('searchValue', router.query.term)
    getSearchData(router.query.term).then(result => {
      setCharacters(result.results)
    })
  }, [router.query.term])

  useEffect(() => {
    if (search === undefined) {
      console.log('pra /')
      router.push(`/`)
    }
    router.push(`/search?term=${search}`, undefined, {shallow: true})
  }, [search])

  return (
    <div className="page">
      <Header updateSearch={setSearch} showClearButton={true} />
      <div>searching {search}</div>
      <CharacterList characters={characters || []} />
    </div>
  )
}
