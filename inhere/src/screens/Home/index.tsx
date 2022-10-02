import {useState} from 'react';

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from 'react-native';
import {Participant} from '../../components/Participant';
import {styles} from './styles';

// const participants = [
//   'Kurtis Beltran',
//   'Sami Ramos',
//   'Lex Blundell',
//   'Christy Guthrie',
//   'Yusra Mohamed',
//   'Riccardo Ingram',
//   'Spencer Stacey',
//   'Eoin Velasquez',
//   'Avneet Gibbs',
//   'Buddy Richardson',
// ];

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantsName, setParticipantsName] = useState<string>('');

  function handleParticipantAdd() {
    if (participants.includes(participantsName)) {
      return Alert.alert(
        'Participante existe',
        'Já existe um participante na lista com esse nome',
      );
    }
    setParticipants(prevState => [...prevState, participantsName]);
    setParticipantsName('');
  }

  function handleParticipantRemove(name: string) {
    Alert.alert('Remover', `Desejá Remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => {
          setParticipants(prevState =>
            prevState.filter(participant => name !== participant),
          );
          Alert.alert('Deletado!', name);
        },
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Sexta 4 de Novembro de 2022</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
          keyboardType="email-address"
          onChangeText={setParticipantsName}
          value={participantsName}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? adicione participantes a sua lista
            de presença.
          </Text>
        )}
      />
    </View>
  );
}
