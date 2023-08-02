import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Draggable from 'react-native-draggable'

export const ElementSearch = ({ title = ""}:{title: string}) => {
  return (
    <View style={styles.container}>
      <Draggable>
        <View style={styles.titleContainer}>
          <View style={styles.content}>
            <Text style={styles.text}>{title}</Text>
          </View>
          <View />
        </View>
      </Draggable>
    </View>
  )
}

// ElementSearch.propTypes = {
//   title: PropTypes.string.isRequired,
//   index: PropTypes.number.isRequired,
// }

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 6,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOpacity: 1,
    shadowRadius: 20,
    paddingTop: 15,
  },
  titleContainer: {
    width: 600,
    height: 40,
    backgroundColor: 'white',
    borderColor: '#19A7CE',
    borderWidth: 1,
  },
  content: {
    flex: 1,
    padding: 5,
  },
  text: {
    color: '#373B3E',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 15.71,
  },
})
