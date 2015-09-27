import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
    this.route('players');
    this.route('details');
    this.route('player', {
        path: 'player/:playerId'
    });
});

export default Router;
