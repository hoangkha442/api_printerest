import React, { useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../asset/img/Pinterest-logo.png'
import { SearchOutlined, BellOutlined, WechatOutlined, UserOutlined, SettingOutlined, VerticalAlignTopOutlined, LogoutOutlined } from '@ant-design/icons';
import { userLocalStorage } from '../../services/localService';
import { DownOutlined} from '@ant-design/icons';
import { Dropdown, message } from 'antd';
export default function Header() {
  let getUser = userLocalStorage.get()
  const location = useLocation();
  const navigate = useNavigate()
  const toLogin = () => { 
    navigate('/login')
  }

  const items = [
    {
      key: '1',
      label: (
        <p onClick={() => { navigate('/update-user') }}>Cài đặt tài khoản</p>
      ),
      icon: <SettingOutlined />
    },
    {
      key: '2',
      label: (
        <p onClick={() => { navigate('/create') }}>Tạo hình ảnh</p>
      ),
      icon: <VerticalAlignTopOutlined />
    },
    {
      key: '3',
      danger: true,
      label: <p onClick={() => { userLocalStorage.remove() }}>Đăng xuất</p>,
      icon: <LogoutOutlined />
    },
  ];

  const isActive = (path) => location.pathname === path;
  return (
    <div className="px-8 py-4">
      <nav className="flex justify-between items-center text-white">
        {/* Navigation */}
        { getUser ? <>
          <div className="flex items-center space-x-1 w-[250px] flex-none">
          <NavLink className='mr-1' to={'/'}>
            <div className="w-12 h-12 rounded-full text-center flex place-items-center justify-center hover:bg-slate-200 transition-all duration-500">
              <img src={logo} className='w-7 h-7' alt="logo" />
            </div>
          </NavLink>
          <NavLink
            to="/"
            className={`px-4 py-[10px] text-lg font-medium rounded-[24px] ${isActive('/') ? 'bg-[#111111] font-semibold' : ' text-black'}`}
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/create"
            className={`px-4 py-[10px] text-lg font-medium rounded-[24px] ${isActive('/create') ? 'bg-[#111111] font-semibold' : ' text-black'}`}
          >
            Tạo
          </NavLink>
        </div>
        {/* SEARCH */}
        <form action="" className='text-black w-full relative shrink'>
          <input className='block w-full p-3 pl-10 rounded-3xl bg-gray-200 border border-gray-200 focus:border-gray-500 outline-none' type="text" placeholder='Tìm kiếm'/>
          <button className='absolute top-[6px] left-4 text-[18px] text-gray-500'>
            <SearchOutlined />
          </button>
        </form>
        {/* Account */}
        <div className="w-[250px] flex-none">
          <div className="flex place-items-center justify-evenly text-gray-600 text-2xl">
            <div className="relative w-10 h-10 cursor-pointer">
              <BellOutlined />
              <p className='absolute top-[4px] font-bold right-[5px] bg-red-500 text-[12px] text-white w-5 h-5 rounded-full text-center leading-5'><span>73</span></p>
            </div>
            <WechatOutlined  className='text-3xl cursor-pointer'/>
            <div className="flex items-center gap-2">
              <div onClick={() => { 
                navigate(`/user-info`)
              }} className="w-10 h-10 rounded-full bg-gray-200 text-center leading-[30px] cursor-pointer">
                  <span className='text-[16px] font-semibold'>K</span>
              </div>
                <Dropdown className='cursor-pointer' menu={{items,}}
                >
                  <a onClick={(e) => e.preventDefault()}>
                      <DownOutlined className='text-[16px]'/>
                  </a>
                </Dropdown>
            </div>
          </div>
        </div>
        </> : <>
        <div className="flex items-center space-x-1 w-[250px] flex-none">
          <NavLink className='mr-1' to={'/'}>
            <div className="w-12 h-12 rounded-full text-center flex place-items-center justify-center hover:bg-slate-200 transition-all duration-500">
              <img src={logo} className='w-7 h-7' alt="logo" />
            </div>
          </NavLink>
          <NavLink
            to="/"
            className={`px-4 py-[10px] text-lg font-medium rounded-[24px] ${isActive('/') ? 'bg-[#111111] font-semibold' : ' text-black'}`}
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/create"
            className={`px-4 py-[10px] text-lg font-medium rounded-[24px] ${isActive('/create') ? 'bg-[#111111] font-semibold' : ' text-black'}`}
          >
            Tạo
          </NavLink>
        </div>
        {/* SEARCH */}
        <form action="" className='text-black w-full relative shrink'>
          <input className='block w-full p-3 pl-10 rounded-3xl bg-gray-200 border border-gray-200 focus:border-gray-500 outline-none' type="text" placeholder='Tìm kiếm'/>
          <button className='absolute top-2 left-4 text-[18px] text-gray-500'>
            <SearchOutlined />
          </button>
        </form>
        {/* Account */}
        <div className="w-[250px] flex-none">
          <div className="flex place-items-center justify-evenly text-gray-600 text-2xl">
            <div className="relative w-10 h-10 cursor-pointer" onClick={toLogin}>
              <BellOutlined />
            </div>
            <WechatOutlined onClick={toLogin} className='text-3xl'/>
            <div className="w-10 h-10 rounded-full bg-gray-200 text-center leading-[25px] cursor-pointer" onClick={toLogin}>
                <span className='text-[16px] font-semibold'><UserOutlined /></span>
            </div>
          </div>
        </div>
        </>}
      </nav>
    </div>
  )
}
