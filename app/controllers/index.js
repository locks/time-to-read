import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
    @tracked bookBeingTracked = null;
    @tracked currentStatus = "parado";
    @tracked _readingSession = null;


    @action
    startTracking(book) {
        this.bookBeingTracked = book;
    }

    @action
    registerStart(event) {
        event.preventDefault();
        this.currentStatus = "em leitura";
        this._readingSession = this.store.createRecord('reading-session', {
            startTime: new Date()
        });
    }

    @action
    async registerStop() {
        this._readingSession.set('stopTime', new Date());
    }

    @action
    async registerCancel() {
        await this._readingSession.destroyRecord();
        this._readingSession = null;
    }

    @action
    async registerSubmit() {
        await this._readingSession.save();
        let rel = await this.bookBeingTracked.get('sessions');
        rel.addObject(this._readingSession);
        await this.bookBeingTracked.save();

        this.bookBeingTracked = null;
        this._readingSession = null;
    }
}
