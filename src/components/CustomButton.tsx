import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Vibration } from 'react-native';
import { BallIndicator } from 'react-native-indicators';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const CustomButton = ({
  title,
  isLoading,
  isDisabled,
  onPress,
}: CustomButtonProps) => {
  const onPressButton = () => {
    Vibration.vibrate(100);

    onPress();
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPressButton}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? (
        <BallIndicator size={22} color="white" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#273469',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    height: 50,
  },
  text: {
    color: '#f2f6f5',
    fontSize: 16,
    fontFamily: 'RobotoBold',
  },
});

export default CustomButton;
