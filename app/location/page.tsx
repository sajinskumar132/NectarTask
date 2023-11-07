"use client"
import React, { useEffect, useRef, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import axios from 'axios';
import Map from '../(components)/Map/Map';
import SearchLocation from '../(components)/SearchLocation/SearchLocation';
import LocationForm from '../(components)/LocationForm/LocationForm';

function NewLocation() {
    return (
        <div className=' m-10' >
            <div className="grid grid-cols-3 gap-5">
                <div className='col-span-2 '>
                    <div className='rounded-lg p-3 border relative'>
                        <div className='absolute top-8 left-1/2 transform -translate-x-1/2 z-50'>
                            <SearchLocation />
                        </div>
                        <Map />
                    </div>
                </div>
                <div>
                    <LocationForm />
                </div>

            </div>
        </div>)
}

export default NewLocation
