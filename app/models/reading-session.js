import Model, { attr } from '@ember-data/model';
import differenceInSeconds from 'date-fns/differenceInSeconds';

export default class ReadingSessionModel extends Model {
    @attr('date') startTime;
    @attr('date') stopTime;

    @attr startPage;
    @attr stopPage;

    get totalTime() {
        return differenceInSeconds(this.stopTime, this.startTime);
    }

    get totalPages() {
        return this.stopPage - this.startPage;
    }

    get timePerPage() {
        return (this.totalPages / (this.totalTime / 60 / 60)).toFixed();
    }
}
