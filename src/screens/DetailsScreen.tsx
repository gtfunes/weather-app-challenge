import { Box, HStack, Text, View, VStack } from '@gluestack-ui/themed';
import { DateTime } from 'luxon';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import WeatherImage from '../components/ui/WeatherImage';
import { RootState } from '../store';

const DetailsScreen = () => {
  const insets = useSafeAreaInsets();
  const forecast = useSelector((state: RootState) => state.weather.forecast);

  const getDailyForecast = useCallback(() => forecast.filter((_, i) => i % 8 === 0), [forecast]);

  return (
    <View bg="$background" style={{
        flex: 1,
        paddingTop: insets.top + 30,
        paddingBottom: insets.bottom,
      }}>
      <Box flex={1} px="$4" py="$6">
        <FlatList
          data={getDailyForecast()}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({ item }) => (
            <Box bg="$surface" p="$3" rounded="$lg" mb="$3">
              <HStack justifyContent="space-between">
                <VStack space="xs">
                  <Text bold>{DateTime.fromFormat(item.dt_txt, 'yyyy-MM-dd HH:mm:ss', { zone: 'utc' }).toLocal().toFormat('DDDD')}</Text>
                  <Text>{item.weather[0].main}</Text>
                  <Text>Min: {item.main.temp_min}°C</Text>
                  <Text>Max: {item.main.temp_max}°C</Text>
                </VStack>
                <WeatherImage item={item.weather[0]} size={64} />
              </HStack>
            </Box>
          )}
        />
      </Box>
    </View>
  );
};

export default DetailsScreen;
