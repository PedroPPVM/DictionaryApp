import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  Vibration,
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { WordInfo } from '../../../api/dictionaryApp';
import { deleteWord } from '../../../storage/wordStorage';
import { MaterialIndicator } from 'react-native-indicators';

interface WordCardProps {
  wordData: WordInfo;
  onRefresh: () => void;
}

const WordCard = ({ wordData, onRefresh }: WordCardProps) => {
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  const onDeleteWord = useCallback(async () => {
    Vibration.vibrate(100);

    setIsLoadingDelete(true);

    await deleteWord(wordData);

    onRefresh();

    setIsLoadingDelete(false);
  }, [wordData]);

  return (
    <TouchableOpacity
      style={styles.cardButton}
      onPress={() => navigation.navigate('WordDetail', { wordData: wordData })}
      disabled={isLoadingDelete}
    >
      <View style={{ flex: 1, gap: 5 }}>
        <Text style={styles.title}>{wordData?.word}</Text>

        <Text style={styles.text}>
          Definition: {wordData.meanings[0].definitions[0].definition}
        </Text>
      </View>

      <View style={styles.iconBox}>
        <TouchableOpacity
          onPress={() => onDeleteWord()}
          disabled={isLoadingDelete}
        >
          {isLoadingDelete ? (
            <MaterialIndicator size={22} color="#4c3c39" />
          ) : (
            <Icon name="trash" size={22} color="#4c3c39" />
          )}
        </TouchableOpacity>

        <Icon name="arrow-right" size={22} color="#4c3c39" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginHorizontal: 10,
    backgroundColor: '#A3D8E5',
    borderRadius: 30,
    justifyContent: 'space-between',
    elevation: 6,
    shadowColor: '#4c3c39',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginVertical: 7,
  },
  title: {
    fontSize: 18,
    fontFamily: 'RobotoBold',
    color: '#333333',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Roboto',
    color: '#333333',
  },
  iconBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
});

export default WordCard;
