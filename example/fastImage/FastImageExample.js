import React, { Component } from 'react'
import {
  Button,
  PixelRatio,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image'
import uuid from 'uuid/v4'

const getImageUrl = (id, width, height) =>
  `https://source.unsplash.com/${id}/${width}x${height}`

const IMAGE_SIZE = 150
const IMAGE_SIZE_PX = PixelRatio.getPixelSizeForLayoutSize(IMAGE_SIZE)

// The server is used to test that sending headers is working correctly.
const USE_SERVER = false
const TOKEN = 'someToken'

const getImages = () => {
  if (USE_SERVER) {
    const baseUrl = '192.168.2.11'
    return [
      `http://${baseUrl}:8080/pictures/ahmed-saffu-235616.jpg`,
      `http://${baseUrl}:8080/pictures/alex-bertha-236361.jpg`,
      `http://${baseUrl}:8080/pictures/jaromir-kavan-233699.jpg`,
    ]
  }
  return [
    getImageUrl('x58soEovG_M', IMAGE_SIZE_PX, IMAGE_SIZE_PX),
    getImageUrl('yPI7myL5eWY', IMAGE_SIZE_PX, IMAGE_SIZE_PX),
    'https://cdn-images-1.medium.com/max/1600/1*-CY5bU4OqiJRox7G00sftw.gif',
  ]
}

const getTestProgressCallbacks = label => ({
  onLoadStart: () => console.log(`${label} - onLoadStart`),
  onProgress: e =>
    console.log(
      `${label} - onProgress - ${e.nativeEvent.loaded / e.nativeEvent.total}`,
    ),
  onLoad: () => console.log(`${label} - onLoad`),
  onError: () => console.log(`${label} - onError`),
  onLoadEnd: () => console.log(`${label} - onLoadEnd`),
})

const images = getImages()

// Preload images. This can be called anywhere.
FastImage.preload([
  {
    uri: 'https://facebook.github.io/react/img/logo_og.png',
    headers: { Authorization: 'someAuthToken' },
  },
  {
    uri: 'https://facebook.github.io/react/img/logo_og.png',
    headers: { Authorization: 'someAuthToken' },
  },
])

class FastImageExample extends Component {
  state = { bust: '?bust' }

  onPressedReload = () => {
    // Force complete re-render and bust image cache.
    const key = uuid()
    const bust = `?bust=${key}`
    this.setState({ bust })
  }

  render() {
    return (
      <View style={styles.container} key={this.state.bust}>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}
        >
          <View style={styles.textContainer}>
            <Text style={styles.bold}>FastImage</Text>
            <Text>• priority (low, normal, high)</Text>
            <Text>• authentication (token)</Text>
            <Button title="Reload" onPress={this.onPressedReload} />
          </View>
          <FastImage
            style={styles.image}
            source={{
              uri: images[0] + this.state.bust,
              headers: {
                token: TOKEN,
              },
              priority: FastImage.priority.low,
            }}
            {...getTestProgressCallbacks('1')}
          />
          <FastImage
            style={styles.image}
            source={{
              uri: images[1] + this.state.bust,
              headers: {
                token: TOKEN,
              },
              priority: FastImage.priority.normal,
            }}
            {...getTestProgressCallbacks('2')}
          />
          <FastImage
            style={styles.image}
            source={{
              uri: images[2] + this.state.bust,
              headers: {
                token: TOKEN,
              },
              priority: FastImage.priority.high,
            }}
            {...getTestProgressCallbacks('3')}
          />
        </ScrollView>
      </View>
    )
  }
}

FastImageExample.navigationOptions = {
  tabBarLabel: 'FastImage Example',
  tabBarIcon: ({ focused, tintColor }) => {
    if (focused)
      return <Icon name="ios-information-circle" size={26} color={tintColor} />
    return (
      <Icon name="ios-information-circle-outline" size={26} color={tintColor} />
    )
  },
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: '900',
  },
  textContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    backgroundColor: '#eee',
    margin: 2,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {},
  scrollContentContainer: {
    alignItems: 'center',
    flex: 0,
  },
})

export default FastImageExample
