import Ember from 'ember';

export default Ember.Controller.extend({

  chartOptions: {
    chart: {
      type: 'line'
    },
    xAxis: {
      type: 'datetime',
      minTickInterval: 1000 * 60 * 60 * 24, // daily
      dateTimeLabelFormats: {
        day: '%e %b'
      }
    },
    title: {
      text: 'Details'
    }
  },

  chartData: function() {
    var _this = this;
    var _model = this.get('model');
    var series = [];
    var playerIds = _this
        .get('model')
        .map(function(x) {
          return x.get('playerId');
        })
        .uniq();

    //iterate players
    playerIds.forEach(function(playerId) {
      var data = _model.filter(function(x) {
        return x.get('playerId') === playerId;
      });

      if (data.length) {
        var seriesObj = {
          name: data.get('firstObject.firstnames') + ' ' + data.get('firstObject.surname'),
          data: []
        };

        data.forEach(function(d) {
          seriesObj.data.push({
            x: new Date(d.get('date')),
            y: d.get('rating')
          });
        })
      }

      series.push(seriesObj);
    });

    return series;
  }.property('model')

});
