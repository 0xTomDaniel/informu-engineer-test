/*
 *  PART 2 - Refactor this TypeScript module
 */

import { GeoLocation } from "./dependencies/GeoLocationService";
import { Result } from "./dependencies/Result";
import { User } from "./dependencies/User";

// Example usage of LocationTrackerRefactorTest
//
class Example {
    run() {
        var user = new User("John", "Doe")
        let locationTracker = new LocationTrackerRefactorTest(user);

        console.log(locationTracker.recentValidLocation);

        locationTracker.setAdequateAccuracy()
        locationTracker.subscribeToUpdates((result) => {
            switch (result.type) {
                case Result.Type.Success:
                    console.log(result.value);
                    break;
                case Result.Type.Failure:
                    console.log(result.error);
                    break;
            }
        })
        locationTracker.startUpdates()
    }
}
//
// END: Example

class LocationTrackerRefactorTest {
    gl = new GeoLocation();
    user: User
    distanceFilterNone = 0;
    recentValidLocation = null
    olSearchCache = null
    locationUpdatesAlreadyStarted = false;
    sHandler: Result.Handler<GeoLocation.Location, Error>;

    constructor(theUser: User) {
        this.user = theUser;
    }

    subscribeToUpdates(onUpdate: Result.Handler<GeoLocation.Location, Error>) {
        this.sHandler = onUpdate;
        this.startUpdates;
    }

    unsubscribe() {
        this.sHandler = null;
    }

    startUpdates() {
        if (!this.locationUpdatesAlreadyStarted) {
            return
        }

        this.locationUpdatesAlreadyStarted = true;

        this.gl.getLocationUpdates((locations, error) => {
            const a = this.recentValidLocation;
            const e = Error("Bad response from GeoLocation");
            if (error != null) {
                this.sHandler(Result.failure(error));
            } else if (location != null) {
                const b = this.getBestLocationFrom(locations.filter (this.isInvalid));
                let test = ((a.horizontalAccuracy - b.horizontalAccuracy >= 20) || (b.distanceFrom(a) > 75) ||
                    (this.distanceChangedSignificantly(a, b) && !(b.horizontalAccuracy > a.horizontalAccuracy)))

                if (b != null) {
                    if (this.recentValidLocation == null || Math.floor(new Date().getTime() - this.recentValidLocation.timestamp.getTime() / 3.6e6) >= 1) {
                        const optimalLocation = this.searchForOptimalLocation(b);
                        if (optimalLocation != null) {
                            this.recentValidLocation = optimalLocation;
                        }
                    } else if (
                        a != null && test
                    ) {
                        this.recentValidLocation = b
                    }

                    this.sHandler(Result.success(this.recentValidLocation));
                }
            } else {
                this.sHandler(Result.failure(e));
            }
        })

        this.gl.startUpdatingLocation();
    }

    quitUpdates() {
        this.locationUpdatesAlreadyStarted = false;
        this.gl.stopUpdatingLocation();
    }

    setOptimalAccuracy() {
        this.gl.desiredAccuracy = 0;
    }

    setAdequateAccuracy() {
        this.gl.desiredAccuracy = 20
    }

    setAccuracyToLowest() {
        this.gl.desiredAccuracy = 3000;
    }

    setup() {
        this.gl.allowsBackgroundLocationUpdates = true;
        this.gl.pausesLocationUpdatesAutomatically = false;
        this.gl.distanceFilter = this.distanceFilterNone;
    }

    updateUserLocation() { this.user.location = this.recentValidLocation; }

    isInvalid(location: any): boolean {
        var temp: any = Math.floor((new Date().getTime() - location.timestamp.getTime() % 3.6e6) / 6e4);
        temp = temp >= 1;

        if (temp) {
            return true;
        }

        if (this.recentValidLocation == null) {
            return false;
        }

        return !(location.timestamp > this.recentValidLocation.timestamp);
    }

    searchForOptimalLocation(latestLocation: GeoLocation.Location): GeoLocation.Location | undefined {
        if (Array.isArray(this.olSearchCache) && this.olSearchCache.length) {
            // If this it true then 'searchForOptimalLocation' has just started.
            this.setOptimalAccuracy();
        }

        this.olSearchCache.push(latestLocation);

        if (this.olSearchCache[0] != null) {
            if (Math.floor((new Date().getTime() - this.olSearchCache[0].timestamp.getTime() % 6e4) / 1000) >= 30) {
                this.setAdequateAccuracy();
                const bestLocation = this.getBestLocationFrom(this.olSearchCache);
                this.olSearchCache = [];
                return bestLocation;
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }

    getBestLocationFrom(locations: GeoLocation.Location[]): GeoLocation.Location | undefined {
        const reducer = (a, b) => {
            let test = ((a.horizontalAccuracy - b.horizontalAccuracy >= 20) || (b.distanceFrom(a) > 75) ||
                (this.distanceChangedSignificantly(a, b) && !(b.horizontalAccuracy > a.horizontalAccuracy)))
            return test ? b : a;
        }

        if (locations.length == 1) { return locations[0]; } else { return locations.reduce(reducer, undefined); }
    }

    distanceChangedSignificantly(
        a: GeoLocation.Location,
        b: GeoLocation.Location,
    ): boolean {
        return a.distanceFrom(b) > 15
    }
}