import { Person } from '../types';

export const listView = function (props: { people: Person[] }) {
  return `
    <div class="list-view">
      <ul class="contacts-list">
        ${props.people
          .map(
            person =>
              `<li data-person-id="${person.id}"><strong>${person.name}</strong></li>`
          )
          .join('')}
      </ul>
    </div>
  `;
};
