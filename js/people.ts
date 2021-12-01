import { RatingTable } from './ratingTable';
import { PeopleMap, Person, PersonId, PersonInfo, UnknownPeople } from './types';

type HandlePersonArgs = {
  friendsSet: Set<PersonId>;
  index: number;
  limit: number;
  unknownPeople: UnknownPeople;
};

type HandlePersonReturn = {
  unknownPeople: UnknownPeople;
};

export class People {
  private people: Person[] = [];
  private peopleMap: PeopleMap = null;
  private popularPeople: PersonId[] = [];
  private ratingTable = new RatingTable();

  constructor(people: Person[]) {
    this.people = people;
    this.peopleMap = this.getPeopleMap();
    this.popularPeople = this.ratingTable.getPopularPeople(this.peopleMap);
  }

  private getPeopleMap(): PeopleMap {
    return this.people.reduce<PeopleMap>((peopleMap, person) => {
      const { unknownPeople } = this.handlePerson(person);
      const updatedPerson = { ...person, unknownPeople };

      return { ...peopleMap, [updatedPerson.id]: updatedPerson };
    }, {});
  }

  private handlePerson(person: Person, args?: HandlePersonArgs): HandlePersonReturn {
    const {
      friendsSet = new Set(person.friends),
      index = 0,
      limit = 3,
      unknownPeople = [],
    } = args || {};

    if (unknownPeople.length === limit) {
      return { unknownPeople };
    }

    const friendId = person.friends[index];

    if (friendId) {
      this.ratingTable.add(friendId);
    }

    const currentPersonId = person.id;
    const personId = this.people[index].id;

    if (personId !== currentPersonId && !friendsSet.has(personId)) {
      unknownPeople.push(personId);
    }

    return this.handlePerson(person, {
      friendsSet,
      index: index + 1,
      limit,
      unknownPeople,
    });
  }

  public getPersonInfo(personId: PersonId): PersonInfo {
    const person = this.peopleMap[personId];

    return {
      id: person.id,
      name: person.name,
      friends: person.friends.map((personId) => this.peopleMap[personId]),
      unknownPeople: person.unknownPeople.map((personId) => this.peopleMap[personId]),
      popularPeople: this.popularPeople.map((personId) => this.peopleMap[personId]),
    };
  }

  public getPeopleList(): Person[] {
    return this.people;
  }
}
