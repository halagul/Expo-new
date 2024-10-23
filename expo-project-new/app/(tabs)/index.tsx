import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetchSurahs = () => {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/surah');
        const json = await response.json();
        setSurahs(json.data);
        await AsyncStorage.setItem('surahs', JSON.stringify(json.data));
      } catch (error) {
        console.error('Error fetching surahs:', error);
        const offlineSurahs = await AsyncStorage.getItem('surahs');
        if (offlineSurahs) {
          setSurahs(JSON.parse(offlineSurahs));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  return { surahs, loading };
};

const useFetchAyahs = (surahId) => {
  const [ayahs, setAyahs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (surahId) {
      const fetchAyahs = async () => {
        setLoading(true);
        try {
          const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahId}/en.asad`);
          const json = await response.json();
          setAyahs(json.data.ayahs);
          await AsyncStorage.setItem(`surah-${surahId}`, JSON.stringify(json.data.ayahs));
        } catch (error) {
          console.error('Error fetching ayahs:', error);
          const offlineAyahs = await AsyncStorage.getItem(`surah-${surahId}`);
          if (offlineAyahs) {
            setAyahs(JSON.parse(offlineAyahs));
          }
        } finally {
          setLoading(false);
        }
      };
      fetchAyahs();
    }
  }, [surahId]);

  return { ayahs, loading };
};

const QuranApp = () => {
  const { surahs, loading: surahLoading } = useFetchSurahs();
  const [selectedSurahId, setSelectedSurahId] = useState(null);
  const { ayahs, loading: ayahLoading } = useFetchAyahs(selectedSurahId);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quran App</Text>
      </View>
      
      {surahLoading ? (
        <ActivityIndicator size="large" color="#6200EE" />
      ) : (
        <FlatList
          data={surahs}
          keyExtractor={(item) => item.number.toString()}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                onPress={() => setSelectedSurahId(item.number)}
                style={styles.surahContainer}
              >
                <Text style={styles.surahTitle}>
                  {item.number}. {item.englishName} - {item.ayahs} Ayahs
                </Text>
              </TouchableOpacity>
              {selectedSurahId === item.number && ayahLoading ? (
                <ActivityIndicator size="small" color="#6200EE" />
              ) : (
                selectedSurahId === item.number && ayahs.map((ayah) => (
                  <View key={ayah.number} style={styles.ayahContainer}>
                    <Text style={styles.ayahText}>{ayah.text}</Text>
                  </View>
                ))
              )}
            </View>
          )}
          contentContainerStyle={styles.surahList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    padding: 16,
  },
  header: {
    backgroundColor: '#9B51E0',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  surahContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 3,
  },
  surahTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  surahList: {
    paddingBottom: 20,
  },
  ayahContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 1,
  },
  ayahText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
});

export default QuranApp;
