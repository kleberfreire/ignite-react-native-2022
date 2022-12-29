import {playersGetByGroup} from '@storage/player/playersGetByGroup';

export async function playersGetByGroupAndTeam(group: string, team: string) {
  try {
    const playersStored = await playersGetByGroup(group);
    const players = playersStored.filter(player => player.team === team);
    return players;
  } catch (error) {
    throw error;
  }
}
