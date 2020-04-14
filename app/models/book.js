import Model, { attr, hasMany } from '@ember-data/model';

export default class BookModel extends Model {
    @hasMany('reading-session', { async: false }) sessions;

    @attr name;
    @attr goodreads;

    get totalReadingTime() {
        return this.get('sessions').map(s => s.totalTime).reduce((sum, i) => sum+i, 0);
    }
}
