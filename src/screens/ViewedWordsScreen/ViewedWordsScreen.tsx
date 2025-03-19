import React, { useCallback, useMemo, useState } from 'react';
import { View, FlatList, RefreshControl, StyleSheet, Text } from 'react-native';
import { getViewedWords } from '../../storage/wordStorage';
import { BallIndicator } from 'react-native-indicators';
import WordCard from './components/WordCard';
import Icon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect } from '@react-navigation/native';
import { WordInfo } from '../../api/dictionaryApp';

const ViewedWordsScreen = () => {
  const [words, setWords] = useState<WordInfo[]>([]);
  const [isLoadingWords, setIsLoadingWords] = useState<boolean>(false);
  const [isLoadingRefresh, setIsLoadingRefresh] = useState<boolean>(false);

  const sortedWords = useMemo(
    () => words.sort((left, right) => left.word.localeCompare(right.word)),
    [words]
  );

  const loadWords = useCallback(async () => {
    setIsLoadingWords(true);

    const viewedWords = await getViewedWords();

    setWords(viewedWords);

    setIsLoadingWords(false);
    setIsLoadingRefresh(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadWords();
    }, [])
  );

  const onRefresh = () => {
    setIsLoadingRefresh(true);
    loadWords();
  };

  return (
    <View style={styles.container}>
      {isLoadingWords ? (
        <View style={styles.loadingBox}>
          <BallIndicator size={80} color="white" />
        </View>
      ) : (
        <FlatList
          data={sortedWords}
          renderItem={({ item }) => (
            <Animatable.View
              animation="zoomInUp"
              iterationCount={1}
              direction="alternate"
              key={item.word}
              style={{ width: '100%' }}
            >
              <WordCard wordData={item} onRefresh={loadWords} />
            </Animatable.View>
          )}
          keyExtractor={(item) => item.word}
          contentContainerStyle={sortedWords.length === 0 ? { flex: 1 } : {}}
          ListEmptyComponent={() => (
            <Animatable.View
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
              style={styles.emptyContainer}
            >
              <Icon name="alert-circle" size={60} color="#333333" />

              <Text style={{ color: '#333333', fontSize: 22 }}>
                No words here.
              </Text>
            </Animatable.View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={isLoadingRefresh}
              onRefresh={onRefresh}
              colors={['#1E90FF', '#4682B4', '#5F9EA0']}
              progressBackgroundColor="#ffffff"
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    paddingTop: 65,
    paddingHorizontal: 10,
    backgroundColor: '#F2F6F5',
  },
  loadingBox: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  emptyContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: 10,
  },
});

export default ViewedWordsScreen;
