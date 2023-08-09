import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

interface ElementValuationProps {
  title: string;
}

export const ElementValuation = ({ title = ""}: ElementValuationProps) => {
  //const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([
    { id: '1', label: 'Novel', selected: false, left: 0 },
    { id: '2', label: 'Attractive', selected: false, left: 7 },
    { id: '3', label: 'Trend', selected: false, left: 14 },
    { id: '4', label: 'Obsolete', selected: false, left: 21 },
    { id: '5', label: 'Unfamiliar', selected: false, left: 28 },
  ])
  const handleItemClick = (itemId: string ) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, selected: !item.selected } : item
      )
    )
  }
  const selectedItems = items.filter((item) => item.selected)

  return (
    <View style={styles.container}>
      <View style={styles.containerSectionA}>
          <View >
            <Text style={styles.titleText}>{title}</Text>
          </View>
      </View>
      <View style={styles.containerSectionB}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.item,
              item.selected ? styles.selectedItem : null,
              { left: item.left },
            ]}
            onPress={() => handleItemClick(item.id)}
          >
            <Text style={styles.text}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* <View style={styles.containerSectionB}>
        <View style={styles.containerSectionA}>
          <Text style={styles.text}>
            Elementos seleccionados: {selectedItems.length}
          </Text>
          {selectedItems.map((item) => (
            <Text key={item.id} style={styles.text}>
              {item.label}
            </Text>
          ))}
        </View>
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  countText: {
    color: '#146C94',
    fontSize: 16,
    fontWeight: '900',
  },
  containerSectionA: {
    position: 'relative',
    flexDirection: 'row',
    gap: 12,
  },
  titleContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10,
  },
  titleText: {
    color: '#424242',
    fontSize: 20,
    fontWeight: '500',
  },
  containerSectionB: {
    position: 'relative',
    flexDirection: 'row',
  },
  item: {
    width: 84,
    height: 36,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(150, 152, 155, 0.3)',
  },
  text: {
    color: '#424242',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedItem: {
    backgroundColor: 'rgba(25, 167, 206, 0.30)',
  },
})
