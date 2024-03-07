import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import Header from '../components/home/Header.js';
import Catalogs from '../components/home/Catalogs.js';

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    // Add your refresh logic here
    // For example, you can fetch new data from your server

    // Simulating a delay for demonstration purposes
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.headerText}>Catalogue</Text>
        </View>
        <Catalogs navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F3F4',
  },
  headerText: {
    fontSize: 24,
    color: '#000000',
    marginBottom: 6,
    fontFamily: 'Gilroy-Regular',
  },
});

export default HomeScreen;
