import React, { useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface CustomInputProps {
  icon: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function CustomInput({ icon, placeholder, value, onChangeText }: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  return (
    <View style={[styles.container, isFocused && styles.inputFocus]}>
      {icon && <Icon name={icon} size={20} color={isFocused ? "#273469" : "#888"} style={styles.icon} />}
      
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#333333"
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#777777',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F2F6F5',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  inputFocus: {
    borderColor: '#273469',
  }
});
