import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
    async model() {
        await this.store.findAll('reading-session');
        return this.store.findAll('book');
    }
}
