import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { AsyncStorage, Button, Modal, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import Header from './components/Header';

export default function App() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(-1);
  const [inputData, setInputData] = useState('');
  const [newData, setNewData] = useState(false);
  const [showDetails, setshowDetails] = useState(false);
  const [details, setDetails] = useState(null);

  const handleSubmit = () => {
    let currData = [...data]
    if (newData) {
      currData.push(inputData)
      setData(currData)
      setNewData(!newData)
    } else {
      currData[index] = inputData
      setData(currData)
      setIndex(-1)
      setNotes(currData)
    }
    setInputData('')
    setNotes(currData)
  }

  const handleRemove = (idx) => {
    let currData = [...data]
    currData.splice(idx, 1)
    setData(currData)
    setNotes(currData)
  }

  const getNotes = async () => {
    const allData = await AsyncStorage.getItem('notes')
    setData(allData ? JSON.parse(allData) : [])
  }

  const setNotes = (currData) => {
    const stringifyData = JSON.stringify(currData)
    AsyncStorage.setItem('notes', stringifyData)
  }

  useEffect(() => {
    getNotes()
  })

  const handleClickDetail = (key) => {
    setDetails(data[key])
    setshowDetails(true)
  }

  const handleCloseDetails = () => {
    setshowDetails(false)
    setDetails(null)
  }

  return (
    <View style={{ display: 'flex' }}>
      <Header />
      <View>
        {data ?
          data.length > 0 ?
            data.map(
              (item, key) => (
                index > -1 && index === key ?
                  <TextInput
                    key={key}
                    style={{ paddingVertical: 20, paddingHorizontal: 10, backgroundColor: '#eee', borderRadius: 5 }}
                    onChangeText={(text) => setInputData(text)}
                    value={inputData}
                    onSubmitEditing={handleSubmit}
                    autoFocus={true} />
                  :
                  (
                    <TouchableOpacity style={{ paddingVertical: 20, paddingHorizontal: 15, backgroundColor: '#eee', borderRadius: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, marginHorizontal: 10 }}
                      title={item.name}
                      key={key}
                      onLongPress={() => (
                        setIndex(key),
                        setInputData(item)
                      )}
                      onPress={() => handleClickDetail(key)}>

                      <Text>{item}</Text>
                      <Text onPress={() => handleRemove(key)}>Delete</Text>
                    </TouchableOpacity>
                  )
              )
            )
            : null
          : null
        }
        {newData ? (
          <TextInput
            style={{ paddingVertical: 20, paddingHorizontal: 10, backgroundColor: '#eee', borderRadius: 5 }}
            onChangeText={(text) => setInputData(text)}
            value={inputData}
            onSubmitEditing={handleSubmit}
            autoFocus={true} />
        )
          : null
        }

      </View>
      <View style={{ marginTop: 20 }}>
        <Button title={newData ? 'cancel' : 'add'} onPress={() => setNewData(!newData)} />
      </View>
      <Modal visible={showDetails}>
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottomColor: '#ddd', marginBottom: 10 }}>
            <Text>{details}</Text>
          </View>
          <Text>{details}</Text>
        </View>
        <TouchableOpacity style={{ marginTop: 50, marginLeft: 50 }} onPress={() => handleCloseDetails()}>
          <Text onPress={() => handleCloseDetails()}>XXXXX</Text>
        </TouchableOpacity>
      </Modal>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  statusBar: {
    backgroundColor: '#4263ec',
  },
  topHead: {
    backgroundColor: '#4263ec',
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
