import {TouchableOpacityProps} from 'react-native';
import {ButtonIconTypeStyleProps, Container, Icon} from './styles';
import {MaterialIconsIconsTypes} from './types/MaterialIconsIconsTypes';

type Props = TouchableOpacityProps & {
  icon: MaterialIconsIconsTypes;
  type?: ButtonIconTypeStyleProps;
};

export function ButtonIcon({type = 'PRIMARY', icon, ...rest}: Props) {
  return (
    <Container>
      <Icon type={type} name={icon} {...rest} />
    </Container>
  );
}
