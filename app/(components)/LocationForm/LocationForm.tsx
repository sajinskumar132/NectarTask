import { AddNewLocation, ClearNickname, UpdateFieldValue, UpdateLocation } from '@/app/(store)/mainStore';
import { RootState } from '@/app/(store)/rootStore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoArrowBackCircleOutline } from 'react-icons/io5'
function LocationForm() {
  const Locationdetails = useSelector((item: RootState) => item.map.Location)
  const Isedit = useSelector((item: RootState) => item.map.isEdit)
  const dispatch = useDispatch()
  const router = useRouter()

  const [errors, setErrors] = useState({
    nickname: '',
    address: '',
  });


  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newErrors = {
      nickname: Locationdetails.nickname ? '' : 'Nickname is required',
      address: Locationdetails.address ? '' : 'Address is required',
    };
    setErrors(newErrors);
    if (!Object.values(newErrors).some((error) => error !== '')) {
      if (Isedit) {
        dispatch(UpdateLocation(Locationdetails))
      } else {
        dispatch(AddNewLocation(Locationdetails))
      }
      router.push('/')
    }
  };

  return (
    <div className='border rounded-lg p-5'>
      <div className='flex items-center'>
        <div className='border p-1 rounded-lg cursor-pointer' onClick={() => {
          router.push('/')
        }}>
          <IoArrowBackCircleOutline className='text-3xl' />
        </div>
        <h5 className='font-semibold ml-auto mr-auto text-lg'>New Location</h5>
      </div>
      <form className='flex flex-col gap-2 my-5' onSubmit={handleSubmit}>
        <label className='font-semibold'>Nick name</label>
        <input
          type='text'
          name='nickname'
          placeholder='Nick name'
          className={`border border-gray-300 rounded px-3 py-2 focus:outline-none w-[100%] ${errors.nickname ? 'border-red-500' : ''}`}
          value={Locationdetails.nickname}
          onChange={(e: any) => {
            dispatch(UpdateFieldValue({ name: "nickname", value: e.target.value }))
            if (errors.nickname !== "") {
              setErrors({ ...errors, ["nickname"]: '' })
            }

          }}
        />
        {errors.nickname && <span className='text-red-500'>{errors.nickname}</span>}

        <label className='font-semibold'>Address</label>
        <textarea
          rows={3}
          name='address'
          placeholder='Address'
          className={`border border-gray-300 rounded px-3 py-2 focus:outline-none  w-[100%] ${errors.address ? 'border-red-500' : ''
            }`}
          value={Locationdetails.address}
          onChange={(e: any) => {
            dispatch(UpdateFieldValue({ name: "address", value: e.target.value }))
            if (errors.address !== "") {
              setErrors({ ...errors, ["address"]: '' })
            }
          }}
        />
        {errors.address && <span className='text-red-500'>{errors.address}</span>}

        <label className='font-semibold'>Latitude</label>
        <input
          type='text'
          name='latitude'
          placeholder='Latitude'
          className='border border-gray-300 rounded px-3 py-2 focus:outline-none   w-[100%]'
          disabled
          value={Locationdetails.latitude}
        />

        <label className='font-semibold'>Longitude</label>
        <input
          type='text'
          name='longitude'
          placeholder='Longitude'
          className='border border-gray-300 rounded px-3 py-2 focus:outline-none   w-[100%]'
          disabled
          value={Locationdetails.longitude}
        />
        <div className=' flex justify-end gap-5 mt-5'>
          <button type='submit' className='bg-blue-500 text-white px-5 py-1 rounded'>
            {Isedit?"Update Location":"Add Location"}
          </button>
          <button type='submit' className=' border border-blue-500 px-5 py-1 rounded' onClick={() => {
            dispatch(ClearNickname())
          }}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default LocationForm;

