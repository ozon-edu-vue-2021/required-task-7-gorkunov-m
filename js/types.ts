export type PersonId = number;
export type PersonName = string;
export type Person = {
  id: PersonId;
  name: PersonName;
  friends: PersonId[];
};
export type UnknownPeople = PersonId[];
export type PopularPeople = PersonId[];
export type PeopleMap = Record<
  PersonId,
  {
    id: PersonId;
    name: PersonName;
    friends: PersonId[];
    unknownPeople: UnknownPeople;
  }
>;
export type PersonInfo = {
  id: PersonId;
  name: PersonName;
  friends: Person[];
  unknownPeople: Person[];
  popularPeople: Person[];
};
export type RatingPoints = number;
export type RatingList = Array<[RatingPoints, PersonId]>;
export type RatingMap = Map<PersonId, number>;
