'use client'
import { RootState } from '@/app/(store)/rootStore';
import { useRouter } from 'next/navigation';
import { GrView } from 'react-icons/gr';
import { AiOutlineDelete } from 'react-icons/ai';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteLocation, ResetData, ViewLocation } from '@/app/(store)/mainStore';
import { IoIosArrowBack } from 'react-icons/io'
import { IoChevronForwardOutline } from 'react-icons/io5'
function LocationTable() {
  const router = useRouter();
  const location = useSelector((State: RootState) => State.map.Locations);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(ResetData())
  }, [])
  return (
    <div className='flex items-center justify-center h-[80vh]'>
      <div className=' max-w-8xl p-3 shadow-xl flex flex-col'>
        <button
          className="px-4 py-1 m-3 border-[1px] max-w-[200px] border-blue-500 rounded-lg text-blue-500 font-semibold  ml-auto"
          onClick={() => {
            router.push('/location');
          }}
        >
          Add New Location
        </button>
        <div>
          <table className="table-auto border rounded-lg">
            <thead>
              <tr>
                <th className="border px-6 py-2 min-w-[200px] max-w-[400px]">NickName</th>
                <th className="border px-6 py-2 min-w-[200px] max-w-[400px]">Address</th>
                <th className="border px-6 py-2 min-w-[200px] max-w-[400px]">Latitude</th>
                <th className="border px-6 py-2 min-w-[200px] max-w-[400px]">Longitude</th>
                <th className="border px-6 py-2 min-w-[200px] max-w-[400px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {location.length === 0 ? (
                <tr className=' h-60'>
                  <td colSpan={5} className="border px-6 py-2 text-center">
                    No locations found.
                  </td>
                </tr>
              ) : (
                location.map((item: any, index: number) => (
                  <tr key={index} className='border-b-[1px] hover:bg-slate-100 text-center'>
                    <td className=" px-6 py-2 min-w-[200px] max-w-[400px]">{item.nickname}</td>
                    <td className=" px-6 py-2 min-w-[200px] max-w-[400px]">{item.address}</td>
                    <td className=" px-6 py-2 min-w-[200px] max-w-[400px]">{item.latitude}</td>
                    <td className=" px-6 py-2 min-w-[200px] max-w-[400px]">{item.longitude}</td>
                    <td className=' px-6 py-6 flex gap-5 justify-center items-center'>
                      <div className='border p-2 rounded-lg cursor-pointer' onClick={() => {
                        dispatch(ViewLocation({ ...item, ['index']: index }))
                        router.push('/location');
                      }}>
                        <GrView />
                      </div>
                      <div className='border p-2 rounded-lg cursor-pointer' onClick={() => {
                        dispatch(DeleteLocation(index))
                      }}>
                        <AiOutlineDelete />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className=' flex gap-1 justify-end m-3'>
          <div className=' border p-1 rounded'>
            <IoIosArrowBack />
          </div>
          <div className=' border p-1 rounded'>
            <IoChevronForwardOutline />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationTable;

