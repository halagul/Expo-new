import { Text, View,StyleSheet,Image, Pressable } from 'react-native'
import React from 'react'

 const UserData = (props:any)=>{
  const item = props.item 
    return (
      <Pressable style={styles.item}>
        <Image source={{ uri: item.image }} style={styles.img} />
        <Text style={{fontSize:16,paddingTop:5}}>{item.name}</Text>
        <Text style={{fontSize:20,fontWeight:'bold'}}>{item.price}</Text>

      </Pressable>
    )
  }
  const styles = StyleSheet.create({
    item: {
      backgroundColor: '#f0f0f0',
      padding: 10,
      margin: 10,
      borderRadius: 8,
      width: 180, // Adjust width for 2 columns
      height: 220,
      justifyContent: 'center',
      alignItems: 'center',
    },
    img: {
      width: 100,
      height: 150,
      borderRadius: 39, // Adjust borderRadius for a circular image
      marginBottom: 5,
      resizeMode: 'contain',
    },
  });

  export default UserData;