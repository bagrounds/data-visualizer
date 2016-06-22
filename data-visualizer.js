/**
 * Visualize data
 *
 * @module data-visualizer
 */
;(function () {
  'use strict'

  /* imports */
  var typeCheck = require('type-check').typeCheck
  var barChart = require('./js/bar-chart')

  /* exports */
  module.exports = visualize

  /**
   *
   * @function visualize
   *
   * @param {Object} options all function parameters
   * @param {Function} callback handle results
   */
  function visualize (options, callback) {
    var error = invalidOptions(options)

    if (error) {
      callback(error)
    }

    barChart(options, callback)
  }

  /**
   * Validate options
   *
   * @param {Object} options that were passed to visualize
   * @return {Error} if options are invalid
   */
  function invalidOptions (options) {
    if (!typeCheck('Object', options)) {
      var message = 'options should be an object'
      return new Error(message)
    }

    return null
  }
})()
