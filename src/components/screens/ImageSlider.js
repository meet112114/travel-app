import React from 'react';
import { View, Image } from 'react-native';
import Swiper from 'react-native-swiper';

function ImageSlider({ images }) {
  return (
    <View style={{ height: 200 }}>
      <Swiper loop={false}>
        {images.map((imageUrl, index) => (
          <Image key={index} source={{ uri: imageUrl }} style={{ flex: 1 }} resizeMode="cover" />
        ))}
      </Swiper>
    </View>
  );
}

export default ImageSlider;