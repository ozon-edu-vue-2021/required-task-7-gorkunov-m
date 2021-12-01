import { People } from './people';
import { detailsView } from './views/detailsView';
import { listView } from './views/listView';

import data from './data.json';

class Controller {
  private container: HTMLElement;
  private people: People;

  public init(container: HTMLElement) {
    this.container = container;
    this.people = new People(data);
    this.container.addEventListener('click', ({ target }) => {
      if (target instanceof HTMLElement) {
        if (target.dataset.personId) {
          this.renderDetailsView(Number(target.dataset.personId));
        }
        if (target.dataset.action === 'back') {
          this.renderListView();
        }
      }
    });
    this.renderListView();
  }

  private renderListView(): void {
    this.container.innerHTML = listView({
      people: this.people.getPeopleList(),
    });
  }

  private renderDetailsView(personId: number): void {
    this.container.innerHTML = detailsView({
      person: this.people.getPersonInfo(personId),
    });
  }
}

export const controller = new Controller();
