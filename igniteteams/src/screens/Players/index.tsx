import {useState} from 'react';
import {FlatList} from 'react-native';

import {ButtonIcon} from '@components/ButtoIcon';
import {Filter} from '@components/Filter';
import {Highlight} from '@components/Highligth';
import {Input} from '@components/Input';
import {Container, Form, HeaderList, NumberOfPlayers} from './styles';
import {PlayerCard} from '@components/PlayerCard';
import {ListEmpty} from '@components/ListEmpty';
import {Button} from '@components/Button';
import {Header} from '@components/Header';

export function Players() {
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState([
    'kleber',
    'Douglas',
    'Nesken',
    'Pablo',
    'Danilo',
    'Rodrigo',
    'Willian',
    'Elber',
    'Tulio',
  ]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title="Nome da turma"
        subtitle="Adicione a galera e separe os times"
      />
      <Form>
        <Input placeholder="Nome do participante" autoCorrect={false} />
        <ButtonIcon icon="add" />
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
      <FlatList
        data={players}
        keyExtractor={item => item}
        renderItem={({item}) => <PlayerCard name={item} onRemove={() => {}} />}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {paddingBottom: 100},
          players.length === 0 && {flex: 1},
        ]}
      />

      <Button title="Remover turma" type="SECONDARY" />
    </Container>
  );
}
