import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';

// export const GroupName = ({ navigation, route }) => {
//   const { titles } = route.params;
//   const handlePressDiscussion = () => {
//     navigation.navigate('Home');
//   };

//   const handlePressValuation = () => {
//     navigation.navigate('Valuation', { titles });
//   };
interface GroupNameProps {
  title: string;
  id: number;
}
export const GroupName: React.FC<GroupNameProps> = ({ title, id }) => {
  const navigation = useNavigation();

  const handlePressDiscussion = () => {
    navigation.navigate('GroupScreen' as never);
  }

  const handlePressValuation = () => {
    navigation.navigate('ValuationScreen' as never);
  }

  const handlePressDecision = () => {
    navigation.navigate('DecisionScreen' as never);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.subContainer}>
        <TouchableOpacity
          style={[styles.buttonGo, id === 0 ? styles.buttonUp : null]}
          onPress={handlePressDiscussion} disabled={id === 2}>
          <Text style={styles.textButton}>Recomended Topics</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonGo, id === 1 ? styles.buttonUp : null]}
          onPress={handlePressValuation} disabled={id === 2}>
          <Text style={styles.textButton}>Valuation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.blurryButton, id === 2 ? styles.buttonUp : null]}
          onPress={handlePressDecision} disabled={id === 0 || id === 1}>
          <Text style={[styles.textBlurryButton, id === 2 ? styles.textButton : null]}>Decision</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 30,
    paddingBottom: 33.71,
    paddingLeft: 8,
    paddingRight: 8.01,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    color: 'black',
    fontSize: 40,
    fontWeight: '700',
    wordWrap: 'break-word',
  },
  subContainer: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 38,
  },
  buttonUp: {
    padding: 10,
    backgroundColor: 'rgba(25, 167, 206, 0.10)',
    borderRadius: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textButton: {
    color: '#146C94',
    fontSize: 18,
    fontWeight: '700',
    wordWrap: 'break-word',
  },
  buttonGo: {
    padding: 10,
    borderRadius: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  blurryButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    borderRadius: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textBlurryButton: {
    color: 'rgba(20, 108, 148, 0.50)',
    fontSize: 18,
    fontWeight: '700',
    wordWrap: 'break-word',
  },
  line: { width: '100%', height: 0, borderWidth: 0.5, borderColor: '#146C94' },
})
