import { serviceClass } from '@/app/(sevices)/seviceClass';
import { UpdateSearchLocation, updatelocation } from '@/app/(store)/mainStore';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

function SearchLocation() {
    const dispatch = useDispatch()
    const [Input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<any>([]);
    const [Dropdown, SetDropdown] = useState(false)
    return (
        <div className="relative" id='DropDownContainer' onClick={() => {
            SetDropdown(true)
        }} onBlur={() => {
            setTimeout(() => SetDropdown(false), 500)
        }}>
            <input
                type="text"
                placeholder="Enter location"
                value={Input}
                onChange={(e) => {
                    setInput(e.target.value)
                    if (e.target.value.trim() !== '') {
                        serviceClass.getLocationSuggestions(e.target.value)
                            .then((suggestions) => {
                                setSuggestions([...suggestions])
                            });
                    } else {
                        setSuggestions([]);
                    }
                }}
                className={"border border-gray-300  rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 w-[20vw]"}
            />
            {Dropdown && suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full max-w-md max-h-80 overflow-auto rounded-b-lg">
                    {suggestions.map((suggestion: any, index: number) => (
                        <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                setInput(suggestion.formatted)
                                dispatch(UpdateSearchLocation({ latitude: suggestion.coordinates.lat, longitude: suggestion.coordinates.lng }))
                                dispatch(updatelocation({ address: suggestion.formatted, latitude: suggestion.coordinates.lat, longitude: suggestion.coordinates.lng }))
                                SetDropdown(false)
                            }}
                        >
                            {suggestion.formatted}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchLocation
