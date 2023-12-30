import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { userLocalStorage } from '../../services/localService'
import { pictureServices } from '../../services/pictureServices'
import { BASE_URL_IMAGE } from '../../services/config'
import { MoreOutlined, UploadOutlined, LinkOutlined, HeartOutlined, SendOutlined  } from '@ant-design/icons';
import { Collapse, message } from 'antd';
import moment from 'moment'
import { userServices } from '../../services/userServices'
export default function DetailPicture() {
  const navigate = useNavigate()
  const [picture, setPicture] = useState()
  const [comment, setComment] = useState([])
  const [avatar, setAvatar] = useState('')

  const [user, setUser] = useState()
  
  const {id} = useParams()
  console.log('id: ', id);
  const getUser = userLocalStorage.get()
  let checkUser = () => { 
    if(!getUser) {
      navigate('/login')
    }
   }
  useEffect(() => { 
    
    pictureServices.getPictureDetail(id).then((res) => { 
      setPicture(res.data.content)
    })
    .catch((err) => {})

    pictureServices.getComment(id).then((res) => { 
      setComment(res.data.content)
    })
    .catch((err) => {})

    userServices.getUserByID().then((res) => { 
      let user = res.data.content 
      setUser(user)
      setAvatar(user.nguoi_dung.anh_dai_dien)
    })
    .catch((err) => {})

    userServices.checkSavedPictureByPicID(id).then((res) => { 
      console.log('res: ', res);
    })
    .catch((err) => {
      console.log('err: ', err);
     })

  }, [])

  let style = {
    "hover": "w-10 h-10 leading-10 text-center rounded-full hover:bg-gray-200 transition-all duration-300 cursor-pointer"
  }
  const onChange = (key) => {
    // console.log(key);
  };
  const items = [
    {
      key: '1',
      children: comment?.map((items) => { 
        return (
        <div className='flex items-center space-x-2 mb-3'>
          <div className="avatar w-10 h-10">
            <img className='w-full h-full object-cover rounded-full' src={BASE_URL_IMAGE + items?.nguoi_dung?.anh_dai_dien} alt="avatar" />
          </div>
          <div className="content">
            <div className=" flex space-x-2">
              <span className='font-semibold'>{items?.nguoi_dung?.ho_ten}</span>
              <span>{items?.noi_dung}</span>
            </div>
            <div className="flex space-x-4">
              <span className='font-normal text-gray-600'>{moment(items?.ngay_binh_luan).startOf('day').fromNow()}</span>
              <button className='font-medium text-gray-600'>Trả lời</button>
              <div className="cursor-pointer">
                <HeartOutlined />
              </div>
            </div>
          </div>
        </div>)
      }),
      label: <p className='font-semibold text-base'>Nhận xét</p>
    }
  ];
  return (
    <div className='px-[300px] py-5'>
      <div className="rounded-2xl shadow-2xl">
        <div className="flex">
          <div className="w-[50%]">
            <img className='rounded-2xl object-cover w-full h-full' src={ BASE_URL_IMAGE + picture?.duong_dan} alt="" />
          </div>
          <div className="w-[50%]">
            <div className="p-5">
              <div className="flex justify-between items-center">
                <div className="flex space-x-4 items-center place-items-center text-xl">
                  <div className={style?.hover}>
                    <MoreOutlined />
                  </div>
                  <div className={style?.hover}>
                    <UploadOutlined />
                  </div>
                  <div className={style?.hover}>
                    <LinkOutlined />
                  </div>
                </div>
                <div className="">
                  <p className='bg-red-600 py-2 px-4 rounded-[28px] text-base font-medium text-white cursor-pointer'>Lưu</p>
                </div>
              </div>

              {/* UserPost */}
              <div className="flex items-center justify-between">
                <div className='flex items-center space-x-2 mb-3 py-10'>
                  <div className="avatar w-10 h-10">
                    <img className='w-full h-full object-cover rounded-full' src={BASE_URL_IMAGE + picture?.nguoi_dung?.anh_dai_dien} alt="avatar" />
                  </div>
                  <div className="content flex flex-col">
                      <span className='font-semibold text-sm'>{picture?.nguoi_dung?.ho_ten}</span>
                      <span className='font-normal text-gray-600'>2,1k người theo dõi</span>
                  </div>
                </div>
                <div className="">
                  <p className='bg-gray-200 py-2 px-4 rounded-[28px] text-base font-medium text-black cursor-pointer'>Theo dõi</p>
                </div>
              </div>

              {/* GET COMMENT */}
              <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
            </div>


            {/* POST COMMENT */}
            <div className="py-5 border-t border-t-slate-200">
              <div className="px-5">
                <div className="flex items-center justify-between">
                  <p className='text-xl font-semibold'>{comment?.length} Nhận xét</p>
                  <div className={style?.hover}>
                    <HeartOutlined  className='text-lg'/>
                  </div>
                </div>
                <div className="flex space-x-4 py-4 items-center">
                  <div className="avatar w-10 h-10">
                    <img className='w-full h-full object-cover rounded-full' src={BASE_URL_IMAGE + avatar} alt="avatar" />
                  </div>
                    <form className='w-full relative' action="" id='reset-form'>
                      <input id='comment' required placeholder='Thêm nhận xét' className='block w-full p-3 pl-10 rounded-3xl bg-gray-200 border border-gray-200 focus:border-gray-300 focus:bg-white outline-none' type="text" name="" />
                      <button onClick={(e) => { 
                        e.preventDefault();
                        if(!getUser){
                          message.error('Bạn chưa đăng nhập!')
                          return
                        }
                        let noiDung = document.getElementById('comment').value
                        if(noiDung !=''){
                          let data = {
                            noiDung,
                            hinhID: id
                          }
                          userServices.postComment(data).then((res) => { 
                            message.success('Bình luận thành công!')
                            document.getElementById("reset-form").reset();
                            setTimeout(() => {
                              window.location.reload()
                            }, 300);
                          })
                          .catch((err) => { })
                        }
                       }}  type='submit' className='absolute right-4 top-3'><SendOutlined className='text-gray-500'/></button>
                    </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
