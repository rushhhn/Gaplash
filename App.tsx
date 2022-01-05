/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Auth} from './screens/Auth/Auth';
import {ContactList} from './screens/ContactList/ContactList';
import {Provider, useDispatch} from 'react-redux';
import {store} from './redux/store';
import {useTypedSelector} from './redux/selectors/typedSelector';
import {signIn} from './redux/actions/authActions';
import auth from '@react-native-firebase/auth';

const Gaplash = () => {
  const dispatch = useDispatch();

  const {isLoading, isSignedIn} = useTypedSelector(state => state.authReducer);

  // Handle user state changes
  async function onAuthStateChanged(user: any) {
    if (user?.email) {
      dispatch(signIn(user.email, 'Sixchars'));
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

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      {isSignedIn ? <ContactList /> : <Auth />}
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
