import { createSlice } from "@reduxjs/toolkit";
import { IMainstore } from "./storeTypes";

const MapSlice = createSlice({
    name: "map",
    initialState: {
        SearchLocation: {
            latitude: 0,
            longitude: 0
        },
        Location: {
            nickname: '',
            address: '',
            latitude: '',
            longitude: ''
        },
        WholeLocations: [],
        Locations: [],
        isEdit: false,
        SelectedIndex: 0,
        TotalPagecount: 1,
        pageNumber: 1
    } as IMainstore,
    reducers: {
        updatelocation: (state, action) => {
            const { address, latitude, longitude } = action.payload
            state.Location.address = address
            state.Location.latitude = latitude
            state.Location.longitude = longitude
        },
        UpdateSearchLocation: (state, action) => {
            const { latitude, longitude } = action.payload
            state.SearchLocation.latitude = latitude
            state.SearchLocation.longitude = longitude
        },
        UpdateFieldValue: (state, action) => {
            const { name, value } = action.payload
            state.Location[name] = value
        },
        AddNewLocation: (state, action) => {
            state.Locations.push(action.payload)
        },
        DeleteLocation: (state, action) => {
            const Locations = state.Locations
            Locations.splice(action.payload, 1)
            state.Locations = Locations
        },
        ViewLocation: (state, action) => {
            const { nickname, address, latitude, longitude, index } = action.payload
            state.SearchLocation = { latitude, longitude },
                state.Location = { nickname, address, latitude, longitude }
            state.SelectedIndex = index
            state.isEdit = true
        },
        UpdateLocation: (state, action) => {
            state.Location[state.SelectedIndex] = action.payload
        },
        ClearNickname: (state) => {
            state.Location.nickname = ""
        },
        ResetData: (state) => {
            state.SearchLocation = {
                latitude: 0,
                longitude: 0
            },
                state.Location = {
                    nickname: '',
                    address: '',
                    latitude: '',
                    longitude: ''
                },
                state.isEdit = false
            state.SelectedIndex = 0
        }
    }
})
export const { updatelocation, UpdateSearchLocation, UpdateFieldValue, AddNewLocation, DeleteLocation, ViewLocation, UpdateLocation, ResetData, ClearNickname } = MapSlice.actions

export default MapSlice.reducer