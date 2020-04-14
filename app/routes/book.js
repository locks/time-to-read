import Route from '@ember/routing/route';

export default class BookRoute extends Route {
    model({ book_id }) {
        return this.store.findRecord('book', book_id);
    } 
}
