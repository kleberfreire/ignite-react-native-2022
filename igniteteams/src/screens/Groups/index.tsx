import {GrupoCard} from '@components/GrupoCard';
import {FlatList} from 'react-native';
import {Header} from '@components/Header';
import {Highlight} from '@components/Highligth';
import {useState} from 'react';
import {Container} from './styles';
import {ListEmpty} from '@components/ListEmpty';
import {Button} from '@components/Button';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => <GrupoCard title={item} />}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
      />
      <Button title="Criar nova turma" />
    </Container>
  );
}