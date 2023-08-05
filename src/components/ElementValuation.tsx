import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

interface ElementValuationProps {
  title: string;
  index?: number;
  drag?: () => void; // Propiedad drag opcional
}

export const ElementValuation = ({ title = "", index = 0}: ElementValuationProps) => {
  //const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([
    { id: '1', label: 'Novel', selected: false, left: 0 },
    { id: '2', label: 'Attractive', selected: false, left: 90 },
    { id: '3', label: 'Used', selected: false, left: 180 },
    { id: '4', label: 'Modest', selected: false, left: 270 },
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
        <View style={styles.contentContainer}>
          <Text style={styles.countText}>{index}</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
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

// return (
//   <View style={styles.container}>
//     <View style={styles.containerSectionA}>
//       <View style={styles.contentContainer}>
//         <Text style={styles.countText}>{index}</Text>
//       </View>
//       <View style={styles.contentContainer}>
//         <View style={styles.titleContainer}>
//           <Text style={styles.titleText}>{title}</Text>
//         </View>
//       </View>
//     </View>
//     <View style={styles.containerSectionB}>
//       {items.map((item) => (
//         <TouchableOpacity
//           key={item.id}
//           style={[
//             styles.item,
//             item.selected ? styles.selectedItem : null,
//             { left: item.left },
//           ]}
//           onPress={() => handleItemClick(item.id)}
//         >
//           <Text style={styles.text}>{item.label}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//     <View style={styles.containerSectionB}>
//       <View style={styles.containerSectionA}>
//         <Text style={styles.text}>
//           Elementos seleccionados: {selectedItems.length}
//         </Text>
//         {selectedItems.map((item) => (
//           <Text key={item.id} style={styles.text}>
//             {item.label}
//           </Text>
//         ))}
//       </View>
//     </View>
//   </View>
// );
// };

// ElementValuation.propTypes = {
//   title: PropTypes.string.isRequired,
//   index: PropTypes.number.isRequired,
// }

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    justifyContent: 'flex-start',
    //alignItems: 'flex-center',
    flexDirection: 'column',
    gap: 12,
  },
  countText: {
    color: '#146C94',
    fontSize: 16,
    fontWeight: '900',
    //wordWrap: 'break-word',
  },
  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 5,
  },
  containerSectionA: {
    flex: 1,
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
    //wordWrap: 'break-word',
  },
  containerSectionB: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    gap: 12,
  },
  item: {
    width: 84,
    height: 36,
    padding: 10,
    position: 'absolute',
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
