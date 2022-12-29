import {groupGetAll} from '@storage/group/groupsGetAll';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PLAYER_COLLECTION, GROUP_COLLECTION} from '@storage/storageConfig';

export async function groupRemoveByName(groupDeleted: string) {
  try {
    const storageGroups = await groupGetAll();
    const groups = storageGroups.filter(item => item !== groupDeleted);
    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));

    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`);
  } catch (error) {
    throw error;
  }
}
