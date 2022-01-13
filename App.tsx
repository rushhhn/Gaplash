import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
  LogBox,
} from 'react-native';
import {Auth} from './src/screens/Auth/Auth';
import {UserChats} from './src/screens/UserChats/UserChats';
import {Provider, useDispatch} from 'react-redux';
import {store} from './src/redux/store';
import {useTypedSelector} from './src/redux/selectors/typedSelector';
import {signIn} from './src/redux/actions/authActions';
import auth from '@react-native-firebase/auth';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

LogBox.ignoreLogs(['EventEmitter.removeListener']);
LogBox.ignoreAllLogs(true);

const Gaplash = () => {
  const dispatch = useDispatch();

  const {isLoading, isSignedIn} = useTypedSelector(state => state.authReducer);

  // Handle user state changes
  async function onAuthStateChanged(user: any) {
    if (user?.email) {
      dispatch(
        signIn(user.email, 'Sixchars', {uid: user.uid, email: user.email}),
      );
      firestore()
        .collection('Users')
        .doc(user.uid)
        .get()
        .then(doc => {
          if (!doc.exists) {
            firestore()
              .collection('Users')
              .doc(user.uid)
              .set({uid: user.uid, email: user.email});
          }
        });
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (isLoading)
    return (
      <View style={styles.screen}>
        <ActivityIndicator size={'large'} color={'white'} />
      </View>
    );

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'grey',
    },
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer theme={MyTheme}>
        {isSignedIn ? <UserChats /> : <Auth />}
      </NavigationContainer>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Gaplash />
    </Provider>
  );
};

export default App;

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 5,
  },
});
