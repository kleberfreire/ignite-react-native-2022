import {Alert} from 'react-native';
import {Button} from '@components/Button';
import {Header} from '@components/Header';
import {Highlight} from '@components/Highligth';
import {Input} from '@components/Input';
import {useNavigation} from '@react-navigation/native';
import {groupCreate} from '@storage/group/groupCreate';
import {AppError} from '@utils/AppErros';
import {useState} from 'react';

import {Container, Content, Icon} from './styles';

export function NewGroup() {
  const [group, setGroup] = useState('');
  const navigation = useNavigation();

  async function handleNew() {
    try {
      if (group.trim().length === 3) {
        return Alert.alert('Novo Grupo', 'Informe o nome da turma');
      }

      await groupCreate(group);
      navigation.navigate('players', {group});
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message);
      } else {
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo');
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova Turma"
          subtitle="Crie uma turma para adicionar pessoas"
        />
        <Input placeholder="Nome da Turma" onChangeText={setGroup} />
        <Button title="Criar" style={{marginTop: 20}} onPress={handleNew} />
      </Content>
    </Container>
  );
}
