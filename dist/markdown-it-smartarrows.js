/*! markdown-it-smartarrows 1.0.1-1 https://github.com//GerHobbelt/markdown-it-smartarrows @license MIT */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.markdownitSmartArrows = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
 * Copyright Adam Pritchard 2015
 * MIT License : http://adampritchard.mit-license.org/
 */

'use strict';
/*jshint node:true*/

/*
Based largely on the markdown-it typographer m-dash/n-dash replacements.
https://github.com/markdown-it/markdown-it/blob/cc8714584282209853fd14e3e0dfb20dfd9c289b/lib/rules_core/replacements.js
*/

var ARROWS_RE = /--|==/;

function doReplacementsInToken(inlineTokens) {
  var i, token;

  for (i = inlineTokens.length - 1; i >= 0; i--) {
    token = inlineTokens[i];
    if (token.type === 'text') {
      if (ARROWS_RE.test(token.content)) {
        token.content = token.content
          // The order of these is important -- avoid premature match
          .replace(/(^|[^<])<-->([^>]|$)/mg, '$1\u2194$2')
          .replace(/(^|[^-])-->([^>]|$)/mg, '$1\u2192$2')
          .replace(/(^|[^<])<--([^-]|$)/mg, '$1\u2190$2')
          .replace(/(^|[^<])<==>([^>]|$)/mg, '$1\u21d4$2')
          .replace(/(^|[^=])==>([^>]|$)/mg, '$1\u21d2$2')
          .replace(/(^|[^<])<==([^=]|$)/mg, '$1\u21d0$2');
      }
    }
  }
}

function smartArrows(state) {
  for (var blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {

    if (state.tokens[blkIdx].type !== 'inline') { continue; }

    if (ARROWS_RE.test(state.tokens[blkIdx].content)) {
      doReplacementsInToken(state.tokens[blkIdx].children);
    }
  }
}

module.exports = function smartArrows_plugin(md, scheme) {
  // Smart arrows must come before the built-in m-dash and n-dash support
  md.core.ruler.before('replacements', 'smartArrows', smartArrows);
};

},{}]},{},[1])(1)
});
