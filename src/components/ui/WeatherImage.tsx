import { WeatherItem } from '@/src/store/weatherSlice';
import React from 'react';
import { Image } from 'react-native';

const WeatherImage = ({ item, size = 32 }: { item: WeatherItem, size?: number }) => <Image
    source={{ uri: `https://openweathermap.org/img/wn/${item.icon || '10n'}@2x.png` }}
    alt={item.description}
    width={size}
    height={size} />

export default WeatherImage;
