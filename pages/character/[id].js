import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Head from 'next/head'
import Link from "next/link";

import { getCharacterDetail, getFilmDetails } from "../../services/swApi";
import { getDateTimeFromDate } from "../../services/utils";

import styles from '../../styles/Character.module.css'
import Loader from "../../components/Loader";

const Character = () => {
  const router = useRouter()
  const [characterId, setCharacterId] = useState()
  const [loading, setLoading] = useState(true)
  const [characterData, setCharacterData] = useState({})

  useEffect(()=>{
    if(!router.isReady) return
    setCharacterId(router.query.id)
}, [router.isReady])

  useEffect(() => {
    getCharacterDetail(characterId).then(async (response) => {
      if (!response) return

      const filmsDetails = await Promise.all(
        response?.films.map(async (filmUrl) => {
          return await getFilmDetails(filmUrl)
        })
      )
      response = {...response, filmsDetails}
      setCharacterData(response)
      setLoading(false)
    })
  }, [characterId])

  const returningPage = () => {
    let searchSaved = sessionStorage.getItem('search')
    if (searchSaved === null || searchSaved === '') {
      return '/'
    }
    else {
      return `/search?term=${searchSaved}`
    }
  }

  if (loading || !characterData) return <div className="page"><Loader /></div>

  return (
    <div className="page">
      <Head>
        <title>SWAPI</title>
      </Head>
      <Link href={returningPage()}>
        <div className={styles.navigateBack}>
          <span>&larr; </span>
          <span className={styles.backText}>back to {returningPage() === '/' ? 'main' : 'search'} list</span>
        </div>
      </Link>
      <div className={styles.characterName}>{characterData?.name}</div>
      <div className={styles.characterData}>
        <div>Height: {characterData?.height}</div>
        <div>Gender: {characterData?.gender}</div>
        <div>Mass: {characterData?.mass}</div>
        <div>Hair color: {characterData?.hair_color}</div>
        <div>Eye color: {characterData?.eye_color}</div>
        <div>Skin color: {characterData?.skin_color}</div>
        <div>Birth year: {characterData?.birth_year}</div>
      </div>
      <div className={styles.films}>
        <div className={styles.filmsTitle}>{characterData?.filmsDetails?.length} films</div>
        <ul>
          {
            characterData?.filmsDetails?.map(film => <li key={film.episode_id}>{film.title}: {Math.round(getDateTimeFromDate(film.release_date).years)} years ago</li>)
          }
        </ul>
      </div>
    </div>
  )

}

export default Character;