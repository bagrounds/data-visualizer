/**
 *
 * @module chart
 */
;(function () {
  'use strict'
  /* global document */

  var React = require('react')
  var ReactDOM = require('react-dom')

  var BarChart = require('react-d3-basic').BarChart
  var LineChart= require('react-d3-basic').LineChart

  var CHART_TYPES = {
    line: LineChart,
    bar: BarChart
  }

  module.exports = chart

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
   * @param {String} options.type line or bar (default)
   *
   * @param {Function} callback handle results
   */
  function chart (options, callback) {
    var error = invalidOptions(options)

    if (error) {
      callback(error)
      return
    }

    if (!options.type) {
      options.type = 'bar'
    }

    var xScale = 'ordinal'
    var yTicks = [10]

    function width () {
      if (options.width) {
        return options.width
      }

      var parent = document.getElementById(options.parentDiv)

      var width = parent.offsetWidth

      return width
    }

    function height () {
      return options.height
        ? options.height
        : undefined
    }
    // var height = 400

    ReactDOM.render(React.createElement(CHART_TYPES[options.type], {
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
      x: function (d) {
        return d[options.xValueId]
      },
      xScale: xScale,
      yTicks: yTicks
    }), document.getElementById(options.parentDiv))

    callback()
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
  function invalidOptions (options) {
    var requiredOptions = [
      'data',
      'width',
      'height',
      'xValueId',
      'yValueId',
      'parentDiv'
    ]

    var error

    requiredOptions.forEach(function (option) {
      if (!options[option]) {
        var message = 'option: ' + option + ' missing!'
        error = new Error(message)
      }
    })

    return error
  }
})()
