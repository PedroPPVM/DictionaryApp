import React, { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Meaning } from "../api/dictionaryApp";

const WordDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { wordData } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: wordData?.word });
  }, [navigation]);

  return (
    <ScrollView style={{ backgroundColor: "#F2F6F5" }}>
      <View style={styles.container}>
        <Text style={styles.text}>Pronetic: {wordData?.phonetic}</Text>

        <Text style={styles.text}>Origin: {wordData?.origin}</Text>

        <Text style={{ fontSize: 24, fontFamily: "RobotoBold", color: '#333333' }}>Meanings:</Text>

        {wordData?.meanings.map((meaning: Meaning, index: number) => (
          <View key={index} style={{paddingLeft: 10, display: 'flex', gap: 5}}>
            <Text style={styles.text}>Part Of Speech: {meaning.partOfSpeech}</Text>

            <Text style={[styles.text, {fontWeight: 'bold'}]}>Definitions:</Text>

            <View style={{display: 'flex', gap: 5}}>
              {meaning.definitions.map(({ definition }, index) => <Text key={definition} style={styles.text}>{index + 1}. {definition}</Text>)}
            </View>
            
            {(wordData.meanings.length - 1) !== index && (
              <View style={styles.divisor}/>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    display: 'flex', 
    width: '100%', 
    height: '100%', 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    gap: 10,
  },
  text: {
    fontSize: 18, 
    color: '#333333',
    fontFamily: 'Roboto',
  },
  divisor: {
    backgroundColor: '#333333',
    width: '100%',
    height: 2,
    marginVertical: 10,
  }
});

export default WordDetailScreen;
