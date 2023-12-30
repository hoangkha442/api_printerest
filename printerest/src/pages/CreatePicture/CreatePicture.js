import React, { useEffect, useRef, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { userLocalStorage } from '../../services/localService';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { userServices } from '../../services/userServices';
import Swal from 'sweetalert2';
export default function CreatePicture() {
  const [file, setFile] = useState();
  const [blob, setBlob] = useState("");
  const inputFileRef = useRef(null);
  const [isDragEnter, setIsDragEnter] = useState(false);

  const navigate = useNavigate()
  useEffect(() => { 
    if(!getUser){
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Phải đăng nhập trước khi đăng hình",
        showConfirmButton: false,
        timer: 1500,
    });
      navigate('/login')
    }

  }, [])
  useEffect(() => {
    if (file) {
      setBlob(URL.createObjectURL(file));
    }
    return () => {
      URL.revokeObjectURL(blob);
    };
  }, [file]);
  const onFileChange = (e) => {
    const newFile = e.target.files[0];
    console.log(newFile);
    setFile(newFile);
    if (newFile) {
      if (!newFile.type.match("image.*")) {
      } else {
        inputFileRef.current && (inputFileRef.current.value = null);
        setFile(newFile);
      }
    }
  };

  let getUser = userLocalStorage.get()

  const onDragLeave = () => {
    setIsDragEnter(false);
  };

  const onDragEnter = () => {
    setIsDragEnter(true);
  };

  const onDrop = (e) => {
    setIsDragEnter(false);
    const newFile = e.dataTransfer.files?.[0];
    if (newFile) {
      if (!newFile.type.match("image.*")) {
        //File không đúng định dạng
      } else {
        setFile(newFile);
      }
    }
  };

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); // Disable open image in new tab
    };

    window.addEventListener("dragover", handler);
    window.addEventListener("drop", handler);

    return () => {
      window.removeEventListener("dragover", handler);
      window.removeEventListener("drop", handler);
    };
  }, []);

  const onFinish = (values) => {
    let frm = new FormData()
    frm.append("tenHinh", values.tenHinh);
    frm.append("picture", file); 
    frm.append("moTa", values.moTa);
    frm.append("nguoi_dung_id", getUser);
    userServices.postPicture(frm).then((res) => { 
      message.success('Thêm ảnh thành công!')
      document.getElementById("create-course-form").reset();
    })
    .catch((err) => {
      console.log('err: ', err);
    })

  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="px-[300px]">
      <div className="flex space-x-10">
       <div
      style={{
        "--bg": `url(${blob})`,
      }}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onClick={() => inputFileRef.current && inputFileRef.current.click()}
      className={`${
        blob ? "before-bg-file" : ""
      } relative p-6 cursor-pointer h-[450px] w-[500px] mt-10 flex flex-col justify-center items-center border-2 border-dashed bg-gray-200 rounded-3xl border-gray-300 text-base leading-[1.6] select-none`}
    >
      <input
        ref={inputFileRef}
        onChange={onFileChange}
        type="file"
        accept="image/*"
        hidden
      />
        <div className="w-10 h-10 rounded-full bg-black text-center"><UploadOutlined className='text-white text-center mt-2 leading-5 text-xl'/></div>
      <p className="text-center my-3 pointer-events-none flex flex-col justify-center">
          Chọn một tệp hoặc kéo và thả tệp ở đây.
        </p>
      <p className="text-center text-[#F05123] pointer-events-none">
        {isDragEnter
          ? "Thả ảnh vào đây"
          : "Kéo thả ảnh vào đây, hoặc bấm để chọn ảnh"}
      </p>
    </div>
    {file ? <>
      <Form
      id='create-course-form'
    name="basic"
    labelCol={{
      span: 24,
    }}
    wrapperCol={{
      span: 24,
    }}

    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    className='mt-10 w-full'
  >
    <Form.Item
      label="Tên hình"
      name="tenHinh"
      rules={[
        {
          required: true,
          message: 'Please input tenHinh!',
        },
      ]}
    >
      <Input  placeholder='Thêm tiêu đề' className='py-2 pl-2 rounded-lg'/>
    </Form.Item>

    <Form.Item
      label="Mô tả"
      name="moTa"
      rules={[
        {
          required: true,
          message: 'Please input moTa!',
        },
      ]}
    >
      <Input  placeholder='Thêm mô tả chi tiết.' className='py-2 pl-2 rounded-lg'/>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <button className='bg-green-500 font-semibold text-base px-6 py-2 rounded-lg text-black' htmlType="submit">
        Lưu
      </button>
    </Form.Item>
  </Form>
    </> :<>
    
    <Form
    name="basic"
    labelCol={{
      span: 24,
    }}
    wrapperCol={{
      span: 24,
    }}

    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    className='mt-10 w-full'
  >
    <Form.Item
      label="Tên hình"
      name="tenHinh"
      rules={[
        {
          required: true,
          message: 'Please input tenHinh!',
        },
      ]}
    >
      <Input disabled placeholder='Thêm tiêu đề' className='py-2 pl-2 rounded-lg'/>
    </Form.Item>

    <Form.Item
      label="Mô tả"
      name="moTa"
      rules={[
        {
          required: true,
          message: 'Please input moTa!',
        },
      ]}
    >
      <Input disabled placeholder='Thêm mô tả chi tiết.' className='py-2 pl-2 rounded-lg'/>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <button className='bg-green-500 font-semibold text-base px-6 py-2 rounded-lg text-black' htmlType="submit">
        Lưu
      </button>
    </Form.Item>
  </Form>
    </>}
    </div>
    </div>
   
  )
}
