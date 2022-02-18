/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 * 
 */


import React,{useState,useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Pressable,
  Alert,
  Modal
} from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator()

function HomeScreen({ navigation}) {
  return (
  <View style={styles.containerHome}>
    <Text style={styles.text}>Pomodoro Clock</Text>
    <Image source={require('./assets/background-pomodoro.png')}/>
    <Button style={styles.buttonPurple} title="Get's Started" onPress={()=>navigation.navigate('Pomodoro')}/>
  </View>
  )
}

function PomodoroScreen(props) {

  const [minutes,setMinutes] = useState(45)
  const [seconds,setSeconds] = useState(0)
  const [isStarted,setIsStarted] = useState(false)

  const [breaks,setBreaks] = useState(5)
  const [fontStyle,setFontStyle] = useState('Monteserrat')


  const [hasModal,setHasModal] = useState(false)

  useEffect(()=>{
    let interval = null
    if(isStarted) {
      interval = setInterval(()=>{
        if(seconds > 0) {
          setSeconds(seconds => seconds - 1)
        }
        else if(seconds>0) {
          setMinutes(minutes => minutes - 1)
          setSeconds(60)
        }
        else if(minutes<=0 && seconds <=0) {
          if(breaks !== 0) {
            clearInterval(interval)
            setBreaks(breaks => breaks -1)
          }
          else {
            clearInterval(interval)
            endingCycle()
          }
        }
      },1000)
    }
    else if(!isStarted && seconds !== 0) {
      clearInterval(interval)
    }
    return ()=> clearInterval(interval)
  },[isStarted,minutes,seconds,breaks])
  
  function toggleStart() {
    setIsStarted(!isStarted)
  }

  function toggleModal() {
    setHasModal(!hasModal)
  }


  function endingCycle() {
    setMinutes(25)
    setSeconds(0)
    setBreaks(5)
  }

  return (
    <View>
      <View>
        <Modal
          animationType='slide'
          transparent={false}
          visible={hasModal}
          onRequestClose={()=>{
            setHasModal(!hasModal)
          }}
        >
         
          <View> 
            <View>
              <Text>Time</Text> 
              <View>
                <Button title='30 minutes' onPress={()=>setMinutes(30)}/>  
                <Button title='45 minutes' onPress={()=>setMinutes(45)}/> 
                <Button title='50 minutes' onPress={()=>setMinutes(50)}/> 
              </View>
            </View>
 
            <View> 
              <Text>Breaks</Text> 
              <View>
                <Button title='5 breaks' onPress={()=>setBreaks(5)}/> 
                <Button title='10 breaks' onPress={()=>setBreaks(10)}/> 
                <Button title='15 breaks' onPress={()=>setBreaks(15)}/>
              </View>
            </View>

            <View>
                <Button title='Save' onPress={()=>{setHasModal(!hasModal)}} />
            </View>
          </View>
        </Modal>

        
      </View>
      <View>
        <Text>Pomodoro Clock</Text>
      </View>
      <View>
        <Text style={styles.text}>{minutes>11?minutes:'0'+minutes}:{seconds>9?seconds:'0'+seconds}</Text>
        <Text>Breaks:{breaks}</Text>
      </View>
      <View>
        <Button title='start' onPress={toggleStart} />
        <Button title='reset'/>
      </View>
      <View>
       <Button title='options' onPress={()=>{setHasModal(!hasModal)}}/>
      </View>
    </View>
  )
}

const App = () => {
 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pomodoro" component={PomodoroScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  containerHome : {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonPurple : {
    color :'#fff',
    fontWeight: '700',
    backgroundColor: `#5800FF`
  },
  text : {
    fontSize: 35,
    fontWeight: '900',
    marginTop: 25
  }
})

export default App;
