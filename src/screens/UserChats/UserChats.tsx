import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {signOut} from '../../redux/actions/authActions';
import {useDispatch} from 'react-redux';
import {SVGAddChatRoom} from '../../SVG/SVGAddChatRoom';
import firestore from '@react-native-firebase/firestore';
import {useTypedSelector} from '../../redux/selectors/typedSelector';
import {IChat} from '../../redux/types/chatTypes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatRoom} from './ChatRoom';
import {useNavigation} from '@react-navigation/native';
import {setChatrooms} from '../../redux/actions/chatsActions';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

export const UserChats = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="ChatList" component={ChatList} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
};

const ChatList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {chatrooms} = useTypedSelector(state => state.chatsReducer);
  //console.log('Redux chats ', chatrooms);

  const signUserOut = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('Chatrooms')
      .onSnapshot(querySnapshot => {
        const chats: IChat[] = [];
        querySnapshot.forEach(doc => {
          chats.unshift(doc.data());
        });
        console.log('CHATS ', chats);
        dispatch(setChatrooms(chats));
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  useEffect(() => {
    console.log('chats');
  });

  const createChat = async () => {
    const newChatId = await firestore()
      .collection('Chatrooms')
      .get()
      .then(querySnapshot => {
        return querySnapshot.size;
      });

    firestore()
      .collection('Chatrooms')
      .doc(newChatId.toString())
      .set({chatroomId: newChatId});
  };

  const renderItem = ({item}: {item: IChat}) => {
    return (
      <TouchableOpacity
        style={styles.chatContainer}
        onPress={() =>
          navigation.navigate('ChatRoom', {chatroomId: item.chatroomId})
        }>
        <Text>{item.chatroomId}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.signOut} onPress={signUserOut}>
        <Text style={styles.text}>Sign out</Text>
      </TouchableOpacity>

      <FlatList
        data={chatrooms}
        renderItem={renderItem}
        //keyExtractor={chat => chat.chatroomId.toString()}
        showsVerticalScrollIndicator={false}
        style={styles.flatlist}
      />

      <TouchableOpacity
        style={styles.addChatroomContainer}
        onPress={createChat}>
        <SVGAddChatRoom />
      </TouchableOpacity>
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
  signOut: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: width * 0.3,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
  },
  addChatroomContainer: {
    position: 'absolute',
    padding: 15,
    bottom: 20,
    right: 20,
  },
  flatlist: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: 'white',
    marginTop: 60,
    width,
  },
  chatContainer: {
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 5,
    backgroundColor: 'aliceblue',
  },
});
