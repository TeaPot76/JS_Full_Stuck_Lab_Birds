const PubSub = require('../helpers/pub_sub.js')
const Sightings = require('../models/sightings.js')

const SightingFormView = function (form) {
  this.form = form;
};

SightingFormView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', (evt) => {
    this.handleSubmit(evt);
  });
};

SightingFormView.prototype.handleSubmit = function (evt) {
  evt.preventDefault();
  const sightings = new Sightings()
  console.log('sightings', sightings)
  const object = this.createObject(evt)
  console.log(object, "object")
  sightings.create(object)

}

SightingFormView.prototype.createObject = function(evt) {
  const view = {
    species: evt.target.species.value,
    location: evt.target.location.value,
    date: evt.target.date.value
     }
     return view;
}

module.exports = SightingFormView;
