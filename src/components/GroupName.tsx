import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Group } from '../model/Group';
import { GroupScreen } from '../features/group/screens/GroupScreen';
import { ValuationScreen } from '../features/valuation/screens/ValuationScreen';
import { DecisionScreen } from '../features/decision/screens/DecisionScreen';

interface GroupNameProps {
  group: Group;
  id: number;
}
export const GroupName: React.FC<GroupNameProps> = ({ group, id }) => {
  const navigation = useNavigation();
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

  const handlePressDiscussion = () => {
    navigation.navigate('GroupScreen' as keyof typeof GroupScreen, { group } as never);
  }

  const handlePressValuation = () => {
    navigation.navigate('ValuationScreen' as keyof typeof ValuationScreen, { group } as never);
  }

  const handlePressDecision = () => {
    navigation.navigate('DecisionScreen' as keyof typeof DecisionScreen, { group } as never);
  }

  return (
    <View style={[styles.container, { width: contentWidth }]}>
        <Text style={styles.title}>{group.name}</Text>
        <Text style={styles.subTitle}>{group.description}</Text>
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
        <View style={[styles.line, { width: contentWidth/3 }]}></View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
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
  subTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    wordWrap: 'break-word',
  },
  subContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
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
  line: { height: 0, borderWidth: 0.5, borderColor: '#146C94' },
})
