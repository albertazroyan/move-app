import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ImageLoader from '../elements/icon'
import styles from './styles.module.css'
import Data from './helpers/data.json'
import { removeSpaces } from './helpers/remove-space'

const MainMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }
  
  const renderMenuIcons = () => {
    return Data && Data.map(data => {
      const matchesCurrentPage = location.pathname.includes(removeSpaces(data.title))
      const linkstyle = { background: matchesCurrentPage ? '#4635a7' : '' }

        return ( 
          <Link 
            style={linkstyle}
            key={data.title} 
            to={removeSpaces(data.title)} 
            className={styles.manuIcon}
          >
            <ImageLoader imageSrc={data.src} title={isMenuOpen && data.title} />
          </Link>                 
        )
     }) 
  }
  
  return (
    <div className={styles.main}>
      <div 
        className={styles.icon} 
        onMouseEnter={() => toggleMenu()}
        onMouseLeave={() => toggleMenu()}
      >
        { isMenuOpen && 
          <div className={styles.user}>
            <ImageLoader 
              imageSrc={'FeaturedCoverImage.png'} 
              title='Daniel' 
            />  
          </div>
        }
        { renderMenuIcons() }
      </div>
      {isMenuOpen && (
        <div className={styles.content} >

        </div>
      )}
    </div>
  )
}

export default MainMenu