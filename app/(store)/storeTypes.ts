
export interface IMainstore {
    SearchLocation: SearchLocation;
    Location: Location | any;
    WholeLocations: any[];
    Locations: any[];
    isEdit: boolean;
    SelectedIndex: number;
    TotalPagecount: number;
    pageNumber: number;
}

export interface Location {
    nickname: string;
    address: string;
    latitude: string;
    longitude: string;
}

export interface SearchLocation {
    latitude: number;
    longitude: number;
}