import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface MainButtonProps {
  onPress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
}

export const MainButton: React.FC<MainButtonProps> = ({
  onPress,
  title,
  style,
}) => {
  return (
    <TouchableOpacity style={[styles.mainButton, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 12,
    elevation: 3,
    minWidth: 110,
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
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
