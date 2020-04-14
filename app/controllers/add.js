import Controller from "@ember/controller";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";

export default class AddController extends Controller {
  @service store;
  @tracked isSubmitting = false;

  @action
  async addBook(event) {
    event.preventDefault();

    this.isSubmitting = true;
    let {
      name: { value: name },
      goodreads: { value: goodreads },
    } = event.target;

    await this.store
      .createRecord("book", {
        name,
        goodreads,
      })
      .save();
    await this.transitionToRoute("/");
    this.isSubmitting = false;
  }
}
