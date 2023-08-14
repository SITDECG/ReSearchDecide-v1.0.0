import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { useUpdateBooleanProperties } from '../features/valuation/hooks/use-update-boolean-properties'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import icons from "../../assets/incons";

interface ElementValuationProps {
  title: string;
}

export const ElementValuation = ({ title = ""}: ElementValuationProps) => {
  const [items, setItems] = useState([
    { id: '1', label: 'Novel', selected: false, left: 0 },
    { id: '2', label: 'Attractive', selected: false, left: 5 },
    { id: '3', label: 'Trend', selected: false, left: 10 },
    { id: '4', label: 'Obsolete', selected: false, left: 15 },
    { id: '5', label: 'Unfamiliar', selected: false, left: 20 },
  ])
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

  const { updateProperties } = useUpdateBooleanProperties();

  const handleItemClick = (itemId: any ) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId.id ? { ...item, selected: !item.selected } : item
      )
    )
  }
  
  useEffect(() => {
    const selectedItem = items.find(item => item.selected);
    if (selectedItem) {
      const propertiesToUpdate: { [key: string]: boolean } = {};
      if (selectedItem.id === '1') {
        propertiesToUpdate.novel = selectedItem.selected;
      } else if (selectedItem.id === '2') {
        propertiesToUpdate.attractive = selectedItem.selected;
      } else if (selectedItem.id === '3') {
        propertiesToUpdate.trend = selectedItem.selected;
      } else if (selectedItem.id === '4') {
        propertiesToUpdate.obsolete = selectedItem.selected;
      } else if (selectedItem.id === '5') {
        propertiesToUpdate.unfamiliar = selectedItem.selected;
      }
      updateProperties(title, propertiesToUpdate);
    }
  }, [items]);

  return (
    <View style={styles.container}>
      <View style={styles.containerIcon}>
          <FontAwesomeIcon icon={ icons.gripVertical } size={28} style={{color: "#146C94",}} />
      </View>
      <View>
        <View style={styles.containerSectionA}>
            <View>
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
              onPress={() => handleItemClick(item)}
            >
              <Text style={styles.text}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  countText: {
    color: '#146C94',
    fontSize: 16,
    fontWeight: '900',
  },
  containerIcon: {
    paddingEnd: 5,
    justifyContent: 'center', 
  },
  containerSectionA: {
    position: 'relative',
    flexDirection: 'row',
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
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(150, 152, 155, 0.3)',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  text: {
    color: '#424242',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedItem: {
    backgroundColor: 'rgba(25, 167, 206, 0.30)',
  },
})
