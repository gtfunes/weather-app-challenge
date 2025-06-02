import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';

type locationResult = {
    position?: GeolocationResponse;
    error?: string;
};

interface locationCallback {
    (result: locationResult): void;
}

export const requestAndGetPosition = async (callback: locationCallback) => {
    Geolocation.requestAuthorization(() => {
        Geolocation.getCurrentPosition(
            position => {
                callback({ position });
            },
            error => {
                callback({ error: error.message || 'Unable to retrieve location' });
            },
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
        );
    },
    (error) => {
        callback({ error: error.message || 'Location permission denied' });
    }
    );
}
