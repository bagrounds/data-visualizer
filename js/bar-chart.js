/**
 *
 * @module chart
 */
(function () {
  'use strict';

  var d3 = require('d3');
  var React = require('react');
  var ReactDOM = require('react-dom');
  var moment = require('moment');
  var _ = require('lodash');

  "use strict";

  var BarChart = require('react-d3-basic').BarChart;

  module.exports = chart;

  /**
   * Plots a bar chart
   *
   * @function plotBars
   *
   * @alias chart
   *
   * @param {Object} options all function parameters
   * @param {Array<Object>} options.data properly formatted dataSet
   * @param {Number} options.width chart width
   * @param {Number} options.height chart height
   * @param {String} options.xValueId field name for x axis value
   * @param {String} options.xLabel x axis label
   * @param {String} options.yValueId field name for y axis value
   * @param {String} options.yLabel y axis label
   * @param {String} options.title chart title
   * @param {String} options.parentDiv where to render the chart
   *
   * @param {Function} callback handle results
   */
  function chart(options, callback){

    console.log('chart options: ' + JSON.stringify(options))

    var error = invalidOptions(options);

    if( error ){

      callback(error);
      return;
    }

    var xScale = 'ordinal';
    var yTicks = [10];


    function width(){

      if( options.width ){
        return options.width
      }

      var parent = document.getElementById(options.parentDiv);

      var width = parent.offsetWidth;

      return width;
    }

    function height() {
      return options.height ?
        options.height :
        undefined
    }
    //var height = 400;

    ReactDOM.render(React.createElement(BarChart, {

      title: options.title,
      data: options.data,
      width: width(),
      height: height(),
      margins: {
        top: 20,
        bottom: 200,
        left: 80,
        right: 10
      },
      chartSeries: [
        {
          field: options.yValueId,
          name: options.yLabel
        }
      ],
      x: function(d) {
        return d[options.xValueId];
      },
      xScale: xScale,
      yTicks: yTicks,
    }), document.getElementById(options.parentDiv));

    callback();
  }

  /**
   *
   * TODO: actually check stuff
   *
   * @param {Object} options contains all function parameters
   * @param {Array<Object>} options.data properly formatted dataSet
   * @param {Number} options.width chart width
   * @param {Number} options.height chart height
   * @param {String} options.xValueId field name for x axis value
   * @param {String} options.xLabel x axis label
   * @param {String} options.yValueId field name for y axis value
   * @param {String} options.yLabel y axis label
   * @param {String} options.title chart title
   * @param {String} options.parentDiv where to render the chart
   *
   * @returns {Error|Boolean} an error if problems, or false
   */
  function invalidOptions(options){

    var data = options.data;

    var width = options.width;

    var height = options.height;

    var xValueId = options.xValueId;

    var xLabel = options.xLabel;

    var yValueId = options.yValueId;

    var yLabel = options.yLabel;

    var title = options.title;

    var parentDiv = options.parentDiv;

    return false;
  }


})();
