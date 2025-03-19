import axios from "axios";

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export interface Meaning {
  partOfSpeech: string;
  definitions: [
    {
      definition: string;
      example: string;
      synonyms: string[];
      antonyms: string[];
    }
  ]
}

export interface WordInfo {
  word: string;
  phonetic: string;
  phonetics: [
    {
      text: string
    },
  ];
  origin: string;
  meanings: Meaning[];
}

export const fetchWordData = async (word: string) => {
  try {
    const response = await axios.get(`${API_URL}${word}`);
    
    return response.data as WordInfo[];
  } catch (error) {
    return null;
  }
};
