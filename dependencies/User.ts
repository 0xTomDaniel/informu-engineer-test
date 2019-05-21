/*
 *  DO NOT EDIT FOR TEST
 */

import { GeoLocation } from "./GeoLocationService";

export class User {
    //
    // This is just a mock for a fictitious User module

    private _email: string;
    private _location: GeoLocation.Location;

    constructor(
        private _firstName: string,
        private _lastName: string,
    ) {}

    get firstName(): string {
        return this._firstName
    }

    set firstName(value: string) {
        this._firstName = value
    }

    get lastName(): string {
        return this._lastName
    }

    set lastName(value: string) {
        this._lastName = value
    }

    get location(): GeoLocation.Location {
        return this._location
    }

    set location(value: GeoLocation.Location) {
        this._location = value
    }
}