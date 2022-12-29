import {useEffect, useState, useRef} from 'react';
import {useRoute} from '@react-navigation/native';
import {Alert, FlatList, Keyboard, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ButtonIcon} from '@components/ButtoIcon';
import {Filter} from '@components/Filter';
import {Highlight} from '@components/Highligth';
import {Input} from '@components/Input';
import {Container, Form, HeaderList, NumberOfPlayers} from './styles';
import {PlayerCard} from '@components/PlayerCard';
import {ListEmpty} from '@components/ListEmpty';
import {Button} from '@components/Button';
import {Header} from '@components/Header';
import {PlayerStorageDTO} from '@storage/player/PlayerStorageDTO';
import {playerAddByGroup} from '@storage/player/playerAddByGroup';
import {AppError} from '@utils/AppErros';
import {playersGetByGroupAndTeam} from '@storage/player/playersGetByGroupAndTeam';
import {playerRemoveByGroup} from '@storage/player/playerRemoveByGroup';
import {groupRemoveByName} from '@storage/group/groupRemoveByName';
import {Loading} from '@components/Loading';

type RouteParams = {
  group: string;
};

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState('Time A');
  const [newPlayerName, setNewPlayerName] = useState('');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const router = useRoute();
  const {group} = router.params as RouteParams;
  const navigation = useNavigation();

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Novo pessoa', 'Informe o nome da pessoa');
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();
      Keyboard.dismiss();

      fetchPlayerByTeam();
      setNewPlayerName('');
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Nova pessoa', error.message);
      } else {
        return Alert.alert('Nova pessoa', 'Não foi possível adicionar!');
      }
    }
  }

  async function fetchPlayerByTeam() {
    try {
      setIsLoading(true);
      const playerByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playerByTeam);
    } catch (error) {
      Alert.alert(
        'Pessoas',
        'Não foi possível carregar as pessoas do time selecionado!',
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function playerRemove(playerName: string) {
    await playerRemoveByGroup(playerName, group);
    fetchPlayerByTeam();
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      Alert.alert('Pessoa', `Deseja remover ${playerName} deste grupo?`, [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => playerRemove(playerName),
        },
      ]);
    } catch (error) {
      Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa');
    }
  }

  async function groupRemove(groupName: string) {
    await groupRemoveByName(groupName);
    navigation.navigate('groups');
  }
  async function handleGroupRemove() {
    try {
      Alert.alert('Grupo', `Deseja remover o grupo ${group}?`, [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => groupRemove(group),
        },
      ]);
    } catch (error) {
      Alert.alert('Grupo', 'Não foi possível remover esse grupo!');
    }
  }

  useEffect(() => {
    fetchPlayerByTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="Adicione a galera e separe os times" />
      <Form>
        <Input
          placeholder="Nome do participante"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>
      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handlePlayerRemove(item.name)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas nesse time" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            {paddingBottom: 100},
            players.length === 0 && {flex: 1},
          ]}
        />
      )}

      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  );
}
