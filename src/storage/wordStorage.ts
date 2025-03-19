import AsyncStorage from '@react-native-async-storage/async-storage';
import { WordInfo } from '../api/dictionaryApp';

const STORAGE_KEY = 'viewed_words';

export const saveWord = async (wordData: WordInfo) => {
  const words = await getViewedWords();
  const isAlreadyExistsThisWord = words.some(
    ({ word }: WordInfo) => word === wordData.word
  );

  if (!isAlreadyExistsThisWord) {
    const newWords = [...words, wordData];

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newWords));
  }
};

export const getViewedWords = async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
};

export const deleteWord = async (wordData: WordInfo) => {
  const words = await getViewedWords();
  const newWords = words.filter(({ word }: WordInfo) => word !== wordData.word);

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newWords));
};
