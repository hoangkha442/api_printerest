import React, { useEffect, useState } from 'react'
import { userLocalStorage } from '../../services/localService'
import { useNavigate } from 'react-router-dom'
import { ConfigProvider, message } from 'antd'
import { userServices } from '../../services/userServices'
import { BASE_URL_IMAGE } from '../../services/config'
import { Tabs } from 'antd';

export default function UserInfo() {
    const navigate = useNavigate()
    const [pictures, setPictures] = useState([])
    const [saved, setSaved] = useState([])
    const [user, setUser] = useState([])
    console.log('user: ', user);
    const getUser = userLocalStorage.get()
    if(!getUser) {
        message.warning('Bạn chưa đăng nhập!')
        navigate('/login')
    }    
    useEffect(() => { 
      userServices.getUserByID(getUser).then((res) => { 
        setUser(res.data.content)
      })
      .catch(() => { })

      userServices.getCreated().then((res) => { 
        setPictures(res.data.content)
      })
      .catch(() => { })

      userServices.getSaved().then((res) => { 
        setSaved(res.data.content)
      })
      .catch(() => { })
    }, [])
    let renderLayout = () => {
      return user?.map((item, index) => { 
        return (
          <div key={index} class="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
            <div className="flex justify-center mb-5">
              <img className='w-32 h-32 rounded-full object-cover' src={BASE_URL_IMAGE + item?.anh_dai_dien} alt="avatar" />
            </div>
            <div className="mb-3">
            <h1 class=" text-4xl font-semibold text-black">{item?.ho_ten}</h1>
            <p class="text-gray-600 py-1 font-light">{item?.email}</p>
            <p class="text-gray-800">0 người đang theo dõi</p>
            </div>
            <div className="flex justify-center pt-3 space-x-2">
              <button className={style.button}>Chia sẻ</button>
              <button onClick={() => { 
                navigate('/update-user')
               }} className={style.button}>Chỉnh sửa hồ sơ</button>
            </div>
          </div>
        )
       })
    }
    let style = {
      'button': 'py-3 px-5 rounded-3xl bg-gray-200 text-black text-base font-medium hover:bg-gray-300 transition-all duration-200'
    }
    const onChange = (key) => {
      console.log(key);
    };
    const items = [
      {
        key: '1',
        label: <p className='font-medium text-black text-base'>Đã tạo</p>,
        children: (
          pictures?.length == 0 ? <>
            <div className={`pb-28 px-10 flex justify-center space-x-3 mt-5 flex-col items-center`}>
                <p className='text-base font-normal'>Chưa có gì để hiển thị! Ghim bạn tạo sẽ xuất hiện ở đây.</p>
                <button className='py-2 mt-4 px-4 bg-red-500 rounded-3xl text-white font-medium'>Tạo ghim</button>
            </div>
        </> :<>
            <div className="pb-28 grid grid-cols-5 gap-3 w-full h-full px-10">
            {pictures?.map((items, index) => {
            return (
                <div key={index} className="w-full h-full cursor-pointer" onClick={() => { 
                  setTimeout(() => {
                    navigate(`/detail/${items?.hinh_id}`)
                  }, 500)
                }}>
                <img className='w-full h-full object-cover rounded-xl relative' src={ BASE_URL_IMAGE + items.duong_dan} alt={`hinhAnh${items?.ten_hinh}`} />
              </div>
            )
        })}
          </div>

        </>

        ),
      },
      {
        key: '2',
        label: <p className='font-medium text-base text-black'>Đã lưu</p>,
        children: (
          saved?.length == 0 ? <>
            <div className={`pb-28 px-10 flex justify-center space-x-3 mt-5 flex-col items-center`}>
                <p className='text-base font-normal'>Bạn chưa lưu Ghim nào.</p>
                <button onClick={() => { navigate('/') }} className='py-3 mt-4 px-6 bg-gray-200 hover:bg-gray-300 transition-all duration-300 rounded-3xl text-base text-black font-medium'>Tìm ý tưởng</button>
            </div>
        </> :<>
            <div className="pb-28 grid grid-cols-5 gap-3 w-full h-full px-10">
            {saved?.map((items, index) => {
            return (
                <div key={index} className="w-full h-full cursor-pointer" onClick={() => { 
                navigate(`/detail/${items?.hinh_anh?.hinh_id}`)
                }}>
                <img className='w-full h-full object-cover rounded-xl relative' src={ BASE_URL_IMAGE + items?.hinh_anh?.duong_dan} alt={`hinhAnh${items?.ten_hinh}`} />
              </div>
            )
        })}
          </div>
        </>

        ),
      }
    ];
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-8 mx-auto">
        {renderLayout()}
      </div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'black',
          },
        }}
      >
      <Tabs  defaultActiveKey="1" items={items} onChange={onChange} />
      </ConfigProvider>
    </section>
  )
}
