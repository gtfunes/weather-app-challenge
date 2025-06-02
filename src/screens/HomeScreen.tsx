
import {
  Box,
  Button,
  HStack,
  Icon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  View,
  VStack,
} from '@gluestack-ui/themed';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CircleGaugeIcon, DropletIcon, FastForwardIcon, LocateIcon, SearchIcon, ThermometerIcon } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import WeatherImage from '../components/ui/WeatherImage';
import { getDeviceLocation, getLocationAuthorization } from '../services/location';
import { AppDispatch, RootState } from '../store';
import { fetchWeather } from '../store/weatherSlice';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [query, setQuery] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const { loading, current, forecast, error } = useSelector((state: RootState) => state.weather);

  const locationButtonPressed = useCallback(() => {
    getLocationAuthorization(permission => {
      if (permission.status === 'denied' || permission.status === 'blocked') {
        Alert.alert(
          'Location Error',
          'Location permission is denied or blocked. Please enable location services in your device settings.',
          [{ text: 'OK' }],
        );
        return;
      }

      getDeviceLocation(result => {
          if (result.error) {
            Alert.alert(
              'Location Error',
              result.error,
              [{ text: 'OK' }],
            );
            return;
          }

          if (result.position) {
            const { latitude, longitude } = result.position.coords;
            dispatch(fetchWeather({ lat: latitude.toString(), lon: longitude.toString() }));
          }
        },
      );
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWeatherInformation = useCallback(() => {
    return [
      [
        {
          text: 'Feels Like',
          data: current ? `${Math.round(current.main.feels_like)}°` : null,
          icon: ThermometerIcon,
        },
        {
          text: 'Humidity',
          data: current ? `${Math.round(current.main.humidity)}%` : null,
          icon: DropletIcon,
        },
      ],
      [
        {
          text: 'Pressure',
          data: current ? `${current.main.pressure} hPa` : null,
          icon: CircleGaugeIcon,
        },
        {
          text: 'Wind Speed',
          data: current ? `${current.wind.speed} m/s` : null,
          icon: FastForwardIcon,
        },
      ],
    ];
  }, [current]);

  const getHourlyForecast = useCallback(() => forecast.slice(0, 8), [forecast]);

  useEffect(() => {
    if (!current) {
      locationButtonPressed();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View bg="$background" style={{
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    }}>
      <ScrollView flex={1} bg="$background" px="$4" py="$6" style={{
          paddingTop: insets.top,
          paddingBottom: Math.max(insets.bottom, 50),
        }}>
        <VStack space="lg">
          <Input variant="outline" size="md">
            <InputSlot backgroundColor="$surface" pl="$3">
              <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField
              backgroundColor="$surface"
              placeholder="Input location name"
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={() => {
                if (query) {
                  dispatch(fetchWeather({ city: query }));
                }
              }}
            />
          </Input>

          <Pressable
            bg="$blue100"
            px="$4"
            py="$2"
            borderRadius="$full"
            alignSelf="flex-start"
            onPress={() => locationButtonPressed()}
          >
            <HStack alignItems="center" space="sm">
              <Icon as={LocateIcon} size="sm" />
              <Text color="$blue700" fontWeight="medium">
                Use current location
              </Text>
            </HStack>
          </Pressable>

          {error && <Text color="$red600">{error}</Text>}

          {loading && <Spinner color="$surface" size="large" />}

          {current && !loading && !error && (
            <VStack space="xs" alignItems="center" mt="$2">
              <Text color="$text" fontSize="$2xl" fontWeight="bold">
                {current.name}
              </Text>
              <Text color="$text" fontSize="$3xl" fontWeight="bold">
                {Math.round(current.main.temp)}°
              </Text>
              <Text fontSize="$lg" color="$text">{current.weather[0].main}</Text>
              <HStack justifyContent="space-between">
                <Text color="$text">H: {Math.round(current.main.temp_max)}° </Text>
                <Text color="$text">L: {Math.round(current.main.temp_min)}° </Text>
              </HStack>
            </VStack>
          )}

          {current && !loading && !error && (
            <VStack space="xs" mt="$2">
                {getWeatherInformation().map((weatherRow) => (
                  <HStack key={`container-${weatherRow[0].text}`} justifyContent="center" space="lg" mt="$2">
                    {weatherRow.map((item, idx) => (
                      <Box
                        key={`info-${idx}-${item.text}`}
                        bg="$blue100"
                        px="$3"
                        py="$2"
                        borderRadius="$lg"
                        alignItems="flex-start"
                        style={{ flex: 1, maxWidth: '35%' }}
                      >
                        <VStack justifyContent="center" space="lg">
                          <HStack alignItems="center" space="sm">
                            <Icon as={item.icon} size="xs" />
                            <Text fontSize="$md" fontWeight="medium">
                              {item.text}
                            </Text>
                          </HStack>
                          <Text fontSize="$lg" fontWeight="bold">
                            {item.data}
                          </Text>
                        </VStack>
                      </Box>
                    ))}
                  </HStack>
                ))}

              <Text mt="$4" color="$text">Hourly Forecast</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} mt="$2">
                <HStack space="md">
                  {getHourlyForecast().map((item, idx) => (
                    <Box
                      key={`hf-${idx}-${item.dt_txt}`}
                      bg="$blue100"
                      px="$3"
                      py="$2"
                      borderRadius="$lg"
                      alignItems="center"
                    >
                      <Text fontSize="$sm" fontWeight="medium">
                        {new Date(item.dt_txt).getHours()}:00
                      </Text>
                      <WeatherImage item={item.weather[0]} />
                      <Text fontSize="$md">{Math.round(item.main.temp)}°</Text>
                    </Box>
                  ))}
                </HStack>
              </ScrollView>
            </VStack>
          )}

          {current && !loading && !error && (
            <Button
              size="lg"
              mt="$2"
              bg="$primary500"
              borderRadius="$lg"
              onPress={() => navigation.navigate('Forecast')}
            >
              <Text color="white" fontWeight="semibold">
                View 5-Day Forecast
              </Text>
            </Button>
          )}
        </VStack>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
