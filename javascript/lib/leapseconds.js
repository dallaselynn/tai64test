"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
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

/**
 * This is a list of all leap seconds added since 1972 since the unix epoch.
 * It is derived from http://www.ietf.org/timezones/data/leap-seconds.list
 *
 * Subtract 2208988800 to convert from NTP datetime to unix seconds.
 *
 * @access private
 */
var leapSeconds = [63072000, 78796800, 94694400, 126230400, 157766400, 189302400, 220924800, 252460800, 283996800, 315532800, 362793600, 394329600, 425865600, 489024000, 567993600, 631152000, 662688000, 709948800, 741484800, 773020800, 820454400, 867715200, 915148800, 1136073600, 1230768000, 1341100800, 1435708800, 1483228800];

/**
 * Return leap seconds for given UNIX timestamp in seconds.
 *
 * @param {Number} timestamp UNIX timestamp in seconds.
 * @returns {Number} leap seconds for given UNIX timestamp in seconds.
 */
var getLeapSeconds = function getLeapSeconds(timestamp) {
  var seconds = 0;
  for (var i = 0; i < leapSeconds.length; i += 1) {
    if (timestamp < leapSeconds[i]) {
      break;
    }
    seconds += i === 0 ? 10 : 1;
  }
  return seconds;
};

exports.default = getLeapSeconds;