import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { Platform } from 'react-native';
import { PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';

type locationPermissionResult = {
    status?: PermissionStatus;
    error?: string;
};

interface locationPermissionCallback {
    // eslint-disable-next-line no-unused-vars
    (result: locationPermissionResult): void;
}

type locationResult = {
    position?: GeolocationResponse;
    error?: string;
};

interface locationCallback {
    // eslint-disable-next-line no-unused-vars
    (result: locationResult): void;
}

export const getLocationAuthorization = (callback?: locationPermissionCallback) => {
    request(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((status) => {
        callback?.({ status });
    }).catch(() => {
        callback?.({ error: 'Location permission request failed' });
    });
};

export const getDeviceLocation = (callback: locationCallback) => {
    Geolocation.getCurrentPosition(
        position => {
            callback({ position });
        },
        _error => {
            callback({ error: 'Unable to retrieve current location' });
        },
        { timeout: 5000 },
    );
};
