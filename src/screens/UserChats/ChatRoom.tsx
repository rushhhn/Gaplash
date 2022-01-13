import {firebase} from '@react-native-firebase/auth';
import React, {useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {GiftedChat, InputToolbar, Bubble} from 'react-native-gifted-chat';
import {useDispatch} from 'react-redux';
import {getMessages} from '../../redux/actions/messageActions';
import {useTypedSelector} from '../../redux/selectors/typedSelector';
import firestore from '@react-native-firebase/firestore';
import {EMessageActions} from '../../redux/types/messageTypes';

export const ChatRoom = ({route}) => {
  const dispatch = useDispatch();

  const {chatroomId} = route.params;
  //console.log('Redux chatroomId ', chatroomId);

  const {messages, isLoadingMessages} = useTypedSelector(
    state => state.messageReducer,
  );
  const {user} = useTypedSelector(state => state.authReducer);

  useEffect(() => {
    const handleBackButton = () => {
      dispatch({type: EMessageActions.SET_IS_MESSAGES_LOADING, payload: true});
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    return () => backHandler.remove();
  }, []);

  const onSend = useCallback(newMessages => {
    firestore()
      .collection('Chatrooms')
      .doc(chatroomId.toString())
      .collection('Messages')
      .add({
        _id: Math.random(),
        text: newMessages[0].text,
        createdAt: new Date().toString(),
        user: {
          _id: user.uid,
          name: 'Tester',
          avatar: 'https://placeimg.com/140/140/any',
        },
      });
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Chatrooms')
      .doc(chatroomId.toString())
      .collection('Messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot(querySnapshot => {
        const newMessages: IMessage[] = [];
        // querySnapshot.docChanges().forEach(change => {
        //   if (change.type === 'added') {
        //     newMessages.unshift(change.doc.data());
        //   }
        // });
        querySnapshot.forEach(doc => {
          newMessages.unshift(doc.data());
        });
        //console.log('Messages from Firestore ', newMessages);
        dispatch(getMessages(newMessages));
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [chatroomId]);

  useEffect(() => {
    console.log('chatroom');
  });

  if (isLoadingMessages)
    return (
      <View style={styles.loader}>
        <ActivityIndicator size={'large'} color={'white'} />
      </View>
    );

  return (
    <View style={styles.chatScreen}>
      <GiftedChat
        messages={messages}
        user={{
          _id: user.uid,
        }}
        renderInputToolbar={props => customtInputToolbar(props)}
        renderBubble={renderBubble}
        onSend={onSend}
      />
    </View>
  );
};

const renderBubble = (props: any) => {
  return (
    <Bubble
      {...props}
      textStyle={{
        right: {
          color: 'white',
          fontFamily: 'CerebriSans-Book',
        },
        left: {
          color: '#24204F',
          fontFamily: 'CerebriSans-Book',
        },
      }}
      wrapperStyle={{
        left: {
          backgroundColor: '#E6F5F3',
        },
        right: {
          backgroundColor: '#3A13C3',
        },
      }}
    />
  );
};

const customtInputToolbar = (props: any) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: 'coral',
        borderTopColor: 'violet',
        borderTopWidth: 1,
        padding: 1,
      }}
    />
  );
};

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  chatScreen: {
    height,
    width,
    backgroundColor: 'grey',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
});

// const messages = [
//   {
//     _id: 1,
//     text: 'Hello developerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
//     createdAt: new Date(),
//     user: {
//       _id: 2,
//       name: 'React Native',
//       avatar: 'https://placeimg.com/140/140/any',
//     },
//   },
//   {
//     _id: 2,
//     text: 'Hello developer',
//     createdAt: new Date(),
//     user: {
//       _id: 3,
//       name: 'React Native',
//       avatar: 'https://placeimg.com/140/140/any',
//     },
//   },
//   {
//     _id: 3,
//     text: 'Hello developer',
//     createdAt: new Date(),
//     user: {
//       _id: 4,
//       name: 'React Native',
//       avatar: 'https://placeimg.com/140/140/any',
//     },
//   },
//   {
//     _id: 4,
//     text: 'Hello developer',
//     createdAt: new Date(),
//     user: {
//       _id: 5,
//       name: 'React Native',
//       avatar: 'https://placeimg.com/140/140/any',
//     },
//   },
// ];
