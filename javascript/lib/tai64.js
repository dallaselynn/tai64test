'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TAI64 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (C) HL2 group
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * All rights reserved
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * contact@hl2.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * All information contained herein is, and remains the property of
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * HL2 group and its suppliers, if any. The intellectual and technical
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * concepts contained herein are proprietary to HL2 group and its suppliers
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * and may be covered by foreign patents, patents in process, and are
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * protected by trade secret or copyright law. Dissemination of this
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * information or reproduction of this material is strictly forbidden unless
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * prior written permission is obtained from HL2 group.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _long = require('long');

var _long2 = _interopRequireDefault(_long);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _leapseconds = require('./leapseconds');

var _leapseconds2 = _interopRequireDefault(_leapseconds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TAI64_UNIX_EPOCH = _long2.default.MAX_VALUE.shiftRight(1).add(1);

var longs = new WeakMap();

/**
 * {@link TAI64} implementation.
 *
 * @see http://cr.yp.to/libtai/tai64.html
 * @version 0.1.0
 */

var TAI64 = function () {
  _createClass(TAI64, null, [{
    key: 'now',

    /**
     * Return current time as {@link TAI64}. This method is based on
     * current UNIX timestamp.
     *
     * @returns {TAI64} current {@link TAI64} time.
     */
    value: function now() {
      var timestamp = Math.floor(Date.now() / 1000);
      return TAI64.unix(timestamp);
    }

    /**
     * Return an instance of {@link TAI64} corresponding to given UNIX timestamp in seconds.
     *
     * @param {Number} timestamp UNIX timestamp in seconds.
     * @returns {TAI64} instance of {@link TAI64} corresponding to given UNIX timestamp in seconds.
     */

  }, {
    key: 'unix',
    value: function unix(timestamp) {
      var long = TAI64_UNIX_EPOCH.add(timestamp + (0, _leapseconds2.default)(timestamp));
      return new TAI64(long);
    }

    /**
     * Return an instance of {@link TAI64} corresponding to given {@link Long}.
     *
     * @param {Long} long long.
     * @returns {TAI64} instance of {@link TAI64} corresponding to given {@link Long}.
     */

  }, {
    key: 'fromLong',
    value: function fromLong(long) {
      return new TAI64(long);
    }

    /**
     * Return an instance of {@link TAI64} corresponding to given {@link String}.
     *
     * @param {String} string textual representation of {@link TAI64}.
     * @param {Number} radix radix in which the text is written (2-36), defaults to 16.
     * @returns {TAI64} instance of {@link TAI64} corresponding to given {@link String}.
     */

  }, {
    key: 'fromString',
    value: function fromString(string) {
      var radix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;

      var long = _long2.default.fromString(string, false, radix);
      return new TAI64(long);
    }

    /**
     * Construct an instance of {@link TAI64} backed by the given {@link Long}.
     *
     * @param {Long} long {@link Long} instance.
     * @access private
     */

  }]);

  function TAI64(long) {
    _classCallCheck(this, TAI64);

    longs.set(this, long);
  }

  /**
   * Return if current {@link TAI64} is equals to given {@link TAI64}.
   *
   * @param {TAI64} other {@link TAI64} to compare with.
   * @returns {boolean} true if equals, false otherwise.
   */


  _createClass(TAI64, [{
    key: 'equals',
    value: function equals(other) {
      return longs.get(this).eq(longs.get(other));
    }

    /**
     * Return if current {@link TAI64} is before given {@link TAI64}.
     *
     * @param {TAI64} other {@link TAI64} to compare with.
     * @returns {boolean} true if before, false otherwise.
     */

  }, {
    key: 'before',
    value: function before(other) {
      return longs.get(this).lt(longs.get(other));
    }

    /**
     * Return if current {@link TAI64} is after given {@link TAI64}.
     *
     * @param {TAI64} other {@link TAI64} to compare with.
     * @returns {Boolean} true if after, false otherwise.
     */

  }, {
    key: 'after',
    value: function after(other) {
      return longs.get(this).gt(longs.get(other));
    }

    /**
     * Return new instance of {@link TAI64} with given seconds added.
     *
     * @param {Number} seconds seconds to add.
     * @returns {TAI64} new instance of {@link TAI64} with given seconds added.
     */

  }, {
    key: 'add',
    value: function add(seconds) {
      var long = longs.get(this).add(seconds);

      return new TAI64(long);
    }

    /**
     * Return new instance of {@link TAI64} with given seconds subtracted.
     *
     * @param {Number} seconds seconds to subtrack.
     * @returns {TAI64} new instance of {@link TAI64} with given seconds subtracted.
     */

  }, {
    key: 'subtract',
    value: function subtract(seconds) {
      var long = longs.get(this).subtract(seconds);

      return new TAI64(long);
    }

    /**
     * Return {@link Long} representation of current {@link TAI64}.
     *
     * @returns {Long} {@link Long} instance.
     */

  }, {
    key: 'toLong',
    value: function toLong() {
      return longs.get(this);
    }

    /**
     * Return {@link String} representation of current {@link TAI64} written in given radix.
     *
     * @param {Number} radix radix (2-36), defaults to 16.
     * @returns {String} {@link String} instance written in given radix.
     */

  }, {
    key: 'toString',
    value: function toString() {
      var radix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;

      return longs.get(this).toString(radix);
    }

    /**
     * Return {@link timestamp} representation of current {@link TAI64}.
     *
     * @returns {Number} timestamp UNIX timestamp in seconds.
     */

  }, {
    key: 'toUnix',
    value: function toUnix() {
      var long = longs.get(this);
      var timestamp = long.subtract(TAI64_UNIX_EPOCH).toInt();
      return timestamp - (0, _leapseconds2.default)(timestamp);
    }

    /**
     * Return {@link moment} representation of current {@link TAI64}.
     *
     * @returns {moment} {@link moment} instance.
     */

  }, {
    key: 'toMoment',
    value: function toMoment() {
      return _moment2.default.unix(this.toUnix());
    }
  }]);

  return TAI64;
}();

exports.TAI64 = TAI64;
exports.default = TAI64;