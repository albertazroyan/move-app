import React, { useState, useEffect } from 'react'

const isUrl = (url) => {
    return !/base64/.test(url)
  }
  
  const fixUrl = (url) => {
    if (/^https?|^\/\/?|base64|images\/default_img\//.test(url)) {
      return url
    }
    return `/assets/${url}`
  }

const checkImageStatus = (imageSrc) => {

  if (imageSrc && isUrl(imageSrc)) {
    try {
      const url = fixUrl(imageSrc)
      return new Promise((resolve) => {
      return fetch(url, { method: 'HEAD' })
        .then(res => resolve(res.status !== 404))
      })
      } catch (error) {
        console.warn(`failed to get "${imageSrc}" image`)
      }
  }

  return new Promise((resolve) => resolve(true))

}
  
const IconLoader = ({imageSrc, title=''}) => {
  const [loadStatus, setLoadStatus] = useState(true)
  
  useEffect(() => {
    const handle = setTimeout(() => {
      return checkImageStatus(imageSrc)
        .then(res => setLoadStatus(res))
        .catch(() => setLoadStatus(false))
    }, 1000)
  
    return () => clearTimeout(handle)

    }, [imageSrc])
  
    return (
    <>
      <img src={fixUrl(loadStatus ? imageSrc : 'unknown.png')} /> 
      {title && <span>{title}</span>}
    </>    
    )
}

export default IconLoader