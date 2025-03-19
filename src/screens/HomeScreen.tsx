import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchWordData } from '../api/dictionaryApp';
import { saveWord } from '../storage/wordStorage';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomTextInput';
import Toast from 'react-native-toast-message';
import * as Animatable from 'react-native-animatable';

const HomeScreen = () => {
  const [word, setWord] = useState('');
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  const searchWord = useCallback(async () => {
    setIsLoadingSearch(true);

    const data = await fetchWordData(word);

    if (data) {
      navigation.navigate('WordDetail', { wordData: data[0] });
      await saveWord(data[0]);
      setWord('');
    } else {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'An error occurred while searching for the word.',
      });
    }

    setIsLoadingSearch(false);
  }, [word, Keyboard]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Animatable.View
          animation="fadeInUp"
          iterationCount={1}
          direction="alternate"
          style={styles.box}
        >
          <Animatable.Image
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            source={require('../../assets/book.png')}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
          <Text style={styles.text}>Dictionary App</Text>
          <View style={{ width: '100%' }}>
            <CustomInput
              icon="search"
              placeholder="Search a word..."
              value={word}
              onChangeText={setWord}
            />
          </View>

          <View style={{ width: '100%' }}>
            <View style={{ width: '100%' }}>
              <CustomButton
                title="Search"
                onPress={searchWord}
                isLoading={isLoadingSearch}
                isDisabled={word.length === 0}
              />
            </View>
          </View>
        </Animatable.View>
        <Toast />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F2F6F5',
  },
  box: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 22,
    backgroundColor: '#A3D8E5',
  },
  text: {
    fontSize: 28,
    color: '#333333',
    fontFamily: 'Roboto',
  },
});

export default HomeScreen;
