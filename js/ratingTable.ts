import {
  PeopleMap,
  PersonId,
  PopularPeople,
  RatingList,
  RatingMap,
  RatingPoints
} from './types';

export class RatingTable {
  private table: RatingList = [];
  private map: RatingMap = new Map();

  public add(id: PersonId): void {
    if (!this.map.has(id)) {
      const index = this.table.length;

      this.map.set(id, index);
      this.table[index] = [0, id];
    }

    const index = this.map.get(id);
    const pointsIndex = 0;
    const points: RatingPoints = this.table[index][pointsIndex];

    this.table[index][pointsIndex] = points + 1;
  }

  public getPopularPeople(peopleMap: PeopleMap, limit = 3): PopularPeople {
    return [...this.table]
      .sort(([pointsA, personIdA], [pointsB, personIdB]) => {
        const personA = peopleMap[personIdA];
        const personB = peopleMap[personIdB];

        if (pointsA < pointsB) {
          return 1;
        }

        if (pointsA === pointsB) {
          return personA.name.localeCompare(personB.name);
        }

        return -1;
      })
      .slice(0, limit)
      .map(([points, id]) => id);
  }
}
