/*
 *  DO NOT EDIT FOR TEST
 */

export namespace GeoLocation {
    export interface Location {
        readonly timestamp: Date;
        readonly latitude: string;
        readonly longitude: string;
        readonly name: string;
        readonly horizontalAccuracy: number;

        distanceFrom?(location): number;
    }
}

export class GeoLocation {
    //
    // This is just a mock for a fictitious React Native geolocation module

    private _desiredAccuracy = 500;
    private _distanceFilter = 0;
    private _allowsBackgroundLocationUpdates = false;
    private _pausesLocationUpdatesAutomatically = true;

    get desiredAccuracy(): number {
        return this._desiredAccuracy;
    }

    set desiredAccuracy(value: number) {
        this._desiredAccuracy = value;
    }

    get distanceFilter(): number {
        return this._distanceFilter;
    }

    set distanceFilter(value: number) {
        this._distanceFilter = value;
    }

    get allowsBackgroundLocationUpdates(): boolean {
        return this._allowsBackgroundLocationUpdates;
    }

    set allowsBackgroundLocationUpdates(value: boolean) {
        this._allowsBackgroundLocationUpdates = value;
    }

    get pausesLocationUpdatesAutomatically(): boolean {
        return this._pausesLocationUpdatesAutomatically;
    }

    set pausesLocationUpdatesAutomatically(value: boolean) {
        this._pausesLocationUpdatesAutomatically = value;
    }

    startUpdatingLocation() {}

    stopUpdatingLocation() {}

    getLocationUpdates(
        onUpdate: (location?: GeoLocation.Location[], error?: any) => void
    ) {
        const newLocation: GeoLocation.Location[] = [{
            timestamp: new Date(),
            latitude: "40.0165858",
            longitude: "-105.2838789",
            name: "1023 Walnut St., Boulder, CO 80302",
            horizontalAccuracy: 1,
        }]

        onUpdate(newLocation);
    }
}