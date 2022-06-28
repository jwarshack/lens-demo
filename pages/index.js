import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import { client, recommendProfiles } from '../api'
import Link from 'next/link'


export default function Home() {
  const [profiles, setProfiles] = useState([])
  useEffect(() => {
    fetchProfiles()
  }, [])

  async function fetchProfiles() {
    try {
      const response = await client.query(recommendProfiles).toPromise()
      setProfiles(response.data.recommendedProfiles)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className={styles.container}>
      {
        profiles.map((profile, index) => (
          <Link href={`/profile/${profile.id}`} key={index}>
            <a>
              <div>
                {/* {
                  profile.picture ? 
                    <Image
                      src={profile.picture.original.url}
                      width="60px"
                      height="60px"
                    />
                    :
                    <div
                      style={{ width: '60px', height: '60px', backgroundColor: 'black'}}
                      />
                } */}
                <h3>{profile.handle}</h3>
                <p>{profile.bio}</p>
              </div>
            </a>
          </Link>
        ))
      }
     
    </div>
  )
}
