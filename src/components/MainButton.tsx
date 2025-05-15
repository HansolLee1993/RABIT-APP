import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

interface MainButtonProps {
  onPress: () => void;
  title: string;
}

export const MainButton: React.FC<MainButtonProps> = ({onPress, title}) => {
  return (
    <TouchableOpacity style={styles.mainButton} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 15,
    elevation: 3,
    minWidth: 130,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
