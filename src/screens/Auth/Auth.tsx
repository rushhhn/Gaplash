import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useTypedSelector} from '../../redux/selectors/typedSelector';
import {
  setLogin,
  setPassword,
  setAuthPage,
  signIn,
  signUp,
} from '../../redux/actions/authActions';
import {useDispatch} from 'react-redux';

export const Auth = () => {
  const dispatch = useDispatch();
  const {authPage, login, password, error} = useTypedSelector(
    state => state.authReducer,
  );

  const handleLogin = (text: string) => dispatch(setLogin(text));
  const handlePassword = (text: string) => dispatch(setPassword(text));
  const switchBetweenSigninAndSignout = (page: string) => {
    dispatch(setAuthPage(page));
  };
  const signUserIn = () => {
    dispatch(signIn(login, password));
  };
  const signUserUp = () => {
    dispatch(signUp(login, password));
  };

  return (
    <View style={styles.screen}>
      {authPage === 'SIGN_IN' ? (
        <Text>Login to your acount</Text>
      ) : (
        <Text>Register a new acount</Text>
      )}

      <TextInput
        style={styles.input}
        selectionColor={'white'}
        placeholder="Login..."
        value={login}
        onChangeText={handleLogin}
      />
      <TextInput
        style={styles.input}
        selectionColor={'white'}
        placeholder="Password..."
        value={password}
        onChangeText={handlePassword}
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={() => (authPage === 'SIGN_IN' ? signUserIn() : signUserUp())}>
        <Text style={styles.text}>
          {authPage === 'SIGN_IN' ? 'Sign in' : 'Sign up'}
        </Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text>or </Text>
        {authPage === 'SIGN_IN' ? (
          <TouchableOpacity
            onPress={() => switchBetweenSigninAndSignout('SIGN_UP')}>
            <Text style={styles.text}>Sign up</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => switchBetweenSigninAndSignout('SIGN_IN')}>
            <Text style={styles.text}>Sign in</Text>
          </TouchableOpacity>
        )}
      </View>
      {error ? (
        <View style={styles.alertContainer}>
          <Text style={styles.text}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

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
  alertContainer: {
    position: 'absolute',
    bottom: 0,
    width,
    padding: 20,
    backgroundColor: 'coral',
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    width: width * 0.7,
    marginVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    color: 'white',
  },
  text: {
    color: 'white',
    borderColor: 'white',
    textAlign: 'center',
  },
  btn: {
    width: width * 0.3,
    marginVertical: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
  },
});
