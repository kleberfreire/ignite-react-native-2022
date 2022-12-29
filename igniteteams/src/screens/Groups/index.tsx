import {useState, useCallback} from 'react';
import {GrupoCard} from '@components/GrupoCard';
import {Alert, FlatList} from 'react-native';
import {Header} from '@components/Header';
import {Highlight} from '@components/Highligth';
import {Container} from './styles';
import {ListEmpty} from '@components/ListEmpty';
import {Button} from '@components/Button';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {groupGetAll} from '@storage/group/groupsGetAll';
import {Loading} from '@components/Loading';

export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroups() {
    navigation.navigate('new');
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);
      const data = await groupGetAll();
      setGroups(data);
    } catch (error) {
      Alert.alert('Grupos', 'Não foi possível carregar os grupos');
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', {group});
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, []),
  );

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <GrupoCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={groups.length === 0 && {flex: 1}}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          )}
        />
      )}
      <Button title="Criar nova turma" onPress={handleNewGroups} />
    </Container>
  );
}
