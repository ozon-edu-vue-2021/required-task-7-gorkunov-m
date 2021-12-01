import { PersonInfo } from '../types';

export const detailsView = function (props: { person: PersonInfo }) {
  const getPersonsList = (persons) => {
    return persons
      .map((person) => `<li><i class="fa fa-male"></i><span>${person.name}</span></li>`)
      .join('');
  };

  return `
    <div class="details-view">
      <div data-action="back" class="back"></div>
      <div class="background"></div>
      <div>
        <ul>
          <li class="people-title">Друзья</li>
          ${getPersonsList(props.person.friends)}
          <li class="people-title">Не в друзьях</li>
          ${getPersonsList(props.person.unknownPeople)}
          <li class="people-title">Популярные люди</li>
          ${getPersonsList(props.person.popularPeople)}
        </ul>
      </div>
    </div>
  `;
};
