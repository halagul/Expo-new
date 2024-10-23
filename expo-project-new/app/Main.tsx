import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useFetchProducts } from '../hooks/useFetchProducts'; // Adjust the path as necessary

const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { products, loading, error } = useFetchProducts(selectedCategory);

  // Categories array with name for each category
  const categories = [
    { name: 'Fruits' },
    { name: 'Vegetables' },
    { name: 'Bakery' },
    { name: 'Dairy' }
  ];

  // Render each category with label
  const renderCategory = (category) => (
    <TouchableOpacity
      key={category.name}
      style={styles.categoryButton}
      onPress={() => setSelectedCategory(category.name)}
    >
      <View style={[styles.iconContainer, selectedCategory === category.name && styles.selectedIconContainer]}>
        <Text>{category.name}</Text>
      </View>
      <Text style={styles.categoryText}>{category.name}</Text>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error fetching data</Text>;
  if (products.length === 0) return <Text>No products available</Text>;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Product Categories</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search for products" />
        <TouchableOpacity style={styles.filterButton}>
          <Text>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Categories Row */}
      <View style={styles.categoriesContainer}>
        {categories.map(renderCategory)}
      </View>

      {/* FlatList for Products */}
      <FlatList
  data={products}
  keyExtractor={(item) => (item ? item.id.toString() : Math.random().toString())} // Fallback for undefined items
  renderItem={({ item }) => {
    if (!item) return null; // Skip undefined items
    return (
      <View style={styles.productItem}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <Text style={{ fontWeight: 'bold', fontSize: 23 }}>{item.category}</Text>
        <Text style={{ padding: 10 }}>{item.name}</Text>
      </View>
    );
  }}
  numColumns={2}
  columnWrapperStyle={styles.row}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    paddingBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  categoryButton: {
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
  iconContainer: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  selectedIconContainer: {
    backgroundColor: 'green',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  productItem: {
    flex: 1,
    margin: 4,
    height: 180,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default Main;
