import React, { useEffect, useState } from 'react'
import { pictureServices } from '../../services/pictureServices.js'
import { BASE_URL_IMAGE } from '../../services/config.js'
import { useNavigate } from 'react-router-dom'
import { userServices } from '../../services/userServices.js'

export default function ListPicture() {
  const [pictures, setPictures] = useState([])
  const navigate = useNavigate()
  useEffect(() => { 
    pictureServices.getPictures().then((res) => { 
      let data = res.data.content
      setPictures(data)
    })
    .catch({})
    userServices.checkSavedPictureByPicID().then((res) => {
      console.log('res: ', res);
    })
    .catch(() => { 
      
     })
  },[])

  
  let renderListPicture = () => { 
    return pictures?.map((items, index) => {
      return (
        <div key={index} className="w-full h-full cursor-pointer" onClick={() => { 
          navigate(`detail/${items?.hinh_id}`)
         }}>
          <figure className="movie-item hover:before:left-[125%] relative overflow-hidden cursor-pointer">
            <img
              className="md:h-[300px] h-[230px] w-full object-cover rounded-xl"
              src={ BASE_URL_IMAGE + items.duong_dan} alt={`hinhAnh${items?.ten_hinh}`}
            />
            <figcaption className="overlay absolute left-0 bottom-0 w-full h-[100%] opacity-0 bg-overlay hover:opacity-100 transition-all">
              <div className="figcaption-btn w-[80%] h-[30%]">
                <button className="text-white border-none rounded-3xl py-2 px-4 bg-red-700 font-[500] hover:text-white uppercase flex items-center">
                  <span></span>
                </button>
              </div>
            </figcaption>
          </figure>
        </div>
      )
    })
   }
  return (
    <div className="px-5 py-2">
      <div className='grid grid-cols-6 gap-3 w-full h-full'>
      {renderListPicture()}
    </div>
    </div>
  )
}
