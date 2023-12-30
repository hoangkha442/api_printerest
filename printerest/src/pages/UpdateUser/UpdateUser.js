import React, { useEffect, useState } from 'react'
import {Form, Input, message } from 'antd';
import { userServices } from '../../services/userServices';

export default function UpdateUser() {
  const [form] = Form.useForm();
  const [user, setUser] = useState({
    ho_ten: '',
    email: '',
    tuoi: '',
    mat_khau: '',
  });
  useEffect(() => { 
    userServices.getUserByID().then((res) => {
      setUser(res.data.content[0])
    })
    .catch(() => {})
  }, [])
  useEffect(() => form.resetFields(), [user, form])
  let style = {
    li: 'hover:bg-gray-200 hover:rounded-md px-3 py-2 transition-all duration-300'
  }
  const onFinish = (values) => {
    let newData = {...user, ...values}
    userServices.putUser(newData).then((res) => { 
      console.log('res: ', res);
    })
    .catch(() => { })

  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='px-10 flex gap-40'>
      <div className="w-[250px] shrink-0 pt-10">
        <ul className="flex flex-col gap-5 font-medium text-gray-800 tracking-wide text-base">
          <li className='pl-3'><a href="" className='py-2 border-b-2 border-b-black'>Chỉnh sửa hồ sơ</a></li>
          <li><a href="" className={style.li}>Chế độ hiển thị hồ sơ</a></li>
          <li><a href="" className={style.li}>Quản lí tài khoản</a></li>
          <li><a href="" className={style.li}>Tài khoản được xác nhận</a></li>
          <li><a href="" className={style.li}>Quyền mạng xã hội</a></li>
          <li><a href="" className={style.li}>Thông báo</a></li>
          <li><a href="" className={style.li}>Quyền riêng tư và dữ liệu</a></li>
          <li><a href="" className={style.li}>Bảo mật</a></li>
          <li><a href="" className={style.li}>Nội dung mang thương hiệu</a></li>
        </ul>
      </div>
      <div className="">
        <div className="w-[60%] py-5">
          <p className='text-3xl font-semibold'>Chỉnh sửa hồ sơ</p>
          <p className='text-base mt-2'>Hãy giữ riêng tư thông tin cá nhân của bạn. Thông tin bạn thêm vào đây hiển thị cho bất kỳ ai có thể xem hồ sơ của bạn.</p>
        </div>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={user}
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className='w-[60%] shrink'
        form={form}
      >
        <Form.Item label="Email" name="email" rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}>
          <Input type="text" className='py-3 pl-4 rounded-2xl'/>
        </Form.Item>
        <Form.Item label="Mật Khẩu" name="mat_khau" rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}>
          <Input.Password type="text" className='py-3 pl-4 rounded-2xl'/>
        </Form.Item>
        <Form.Item label="Họ tên" name="ho_ten" rules={[
        {
          required: true,
          message: 'Please input your name!',
        },
      ]}>
          <Input type="text" className='py-3 pl-4 rounded-2xl'/>
        </Form.Item>
        <Form.Item label="Tuổi" name="tuoi" rules={[
        {
          required: true,
          message: 'Please input your age!',
        },
      ]}>
          <Input type="text" className='py-3 pl-4 rounded-2xl'/>
        </Form.Item>
        <Form.Item className='text-end'>
          <button className='bg-green-400 py-2 px-4 rounded-3xl font-medium' type='submit'>Cập nhật</button>
        </Form.Item>
      </Form>
      </div>
  </div>
  )
}
