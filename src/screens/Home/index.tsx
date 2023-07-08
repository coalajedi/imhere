/*
 * Copyright (C) 2023 Felipe D. Silva (a.k.a Coala Jedi)
 * All Rights Reserved
 *
 * Unauthorized copying or redistribution of this file in source and binary forms via any medium
 * is strictly prohibited.
 */

import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './style';
import {Participant} from '../../components/Participant';
import {useState} from 'react';

const EmptyListComponent = () => {
  return (
    <Text style={styles.listEmptyText}>
      Ninguém chegou no evento ainda? Adicione participantes a sua lista de
      presença
    </Text>
  );
};

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState<string>('');

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      setParticipantName('');
      return Alert.alert(
        'Participante Existente',
        'Já existe um participante na lista com esse nome',
      );
    }

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
  }

  function handleParticipantRemove(name: string) {
    Alert.alert('Remover participante', `Deseja realmente remover ${name}?`, [
      {
        text: 'Sim',
        onPress: () => {
          setParticipants(prevState =>
            prevState.filter(participant => participant !== name),
          );
          Alert.alert(`${name} foi removido(a)`);
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

      <Text style={styles.eventDate}>Sexta, 4 de Agosto de 2023</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <Participant
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyListComponent}
      />
    </View>
  );
}
