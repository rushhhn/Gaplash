import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {signOut} from '../../redux/actions/authActions';
import {useDispatch} from 'react-redux';

export const ContactList = () => {
  const dispatch = useDispatch();

  const signUserOut = () => {
    dispatch(signOut());
  };

  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.btn} onPress={signUserOut}>
        <Text style={styles.text}>Sign out</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Contact list</Text>
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
