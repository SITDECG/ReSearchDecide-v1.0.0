import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Linking, Dimensions } from 'react-native'

const handleTitlePress = (text: string) => {
  const query = encodeURIComponent(text)
  const url = `https://scholar.google.com/scholar?q=${query}`
  Linking.openURL(url)
}

export const ElementDiscussion = ({ title = "", index = 0}:{title: string, index: number }) => {
  const [contentWidth, setContentWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const updateContentWidth = () => {
      const windowWidth = Dimensions.get('window').width;
      setContentWidth(windowWidth);
    };

    Dimensions.addEventListener('change', updateContentWidth);

    return () => {
      // Dimensions.removeListener('change', updateContentWidth);
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.countText}>{index}</Text>
      </View>
      <TouchableOpacity onPress={() => handleTitlePress(title)}>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    borderRadius: 17,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  countText: {
    color: '#146C94',
    fontSize: 16,
    fontWeight: '900',
    wordWrap: 'break-word',
  },
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10,
  },
  titleText: {
    color: '#424242',
    fontSize: 20,
    fontWeight: '500',
    wordWrap: 'break-word',
  },
})
