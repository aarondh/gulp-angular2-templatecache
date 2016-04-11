var es = require('event-stream');
var path = require('path');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var header = require('gulp-header');
var footer = require('gulp-footer');
var htmlJsStr = require('js-string-escape');

/**
 * "constants"
 */

var TEMPLATE_HEADER = 'import { Injectable } from "angular2/core";\r\nimport { <%= module %> } from "<%= modulePath %>";\r\n@Injectable()\r\nexport class Templates{\r\nconstructor(templateCache: <%= module %>) {';
var TEMPLATE_BODY = 'templateCache.put("<%= url %>","<%= contents %>");';
var TEMPLATE_FOOTER = '}}';

var DEFAULT_FILENAME = 'templates.ts';
var DEFAULT_MODULE = 'TemplateCache';
var DEFAULT_MODULE_PATH = '/scripts/app/TemplateCache';
/**
 * Add files to templateCache.
 */

function templateCacheFiles(root, base, templateBody, transformUrl) {

  return function templateCacheFile(file, callback) {
    if (file.processedByTemplateCache) {
      return callback(null, file);
    }

    var template = templateBody || TEMPLATE_BODY;
    var url;

    file.path = path.normalize(file.path);

    /**
     * Rewrite url
     */

    if (typeof base === 'function') {
      url = path.join(root, base(file));
    } else {
      url = path.join(root, file.path.replace(base || file.base, ''));
    }

    if (root === '.' || root.indexOf('./') === 0) {
      url = './' + url;
    }

    if (typeof transformUrl === 'function') {
      url = transformUrl(url);
    }

    /**
     * Normalize url (win only)
     */

    if (process.platform === 'win32') {
      url = url.replace(/\\/g, '/');
    }

    /**
     * Create buffer
     */

    file.contents = new Buffer(gutil.template(template, {
      url: url,
      contents: htmlJsStr(file.contents),
      file: file
    }));

    file.processedByTemplateCache = true;

    callback(null, file);

  };

}

/**
 * templateCache a stream of files.
 */

function templateCacheStream(root, base, templateBody, transformUrl) {

  /**
   * Set relative base
   */

  if (typeof base !== 'function' && base && base.substr(-1) !== path.sep) {
    base += path.sep;
  }

  /**
   * templateCache files
   */

  return es.map(templateCacheFiles(root, base, templateBody, transformUrl));

}

/**
 * Concatenates and registers AngularJS templates in the $templateCache.
 *
 * @param {string} [filename='templates.js']
 * @param {object} [options]
 */

function templateCache(filename, options) {

  /**
   * Prepare options
   */

  if (typeof filename === 'string') {
    options = options || {};
  } else {
    options = filename || {};
    filename = options.filename || DEFAULT_FILENAME;
  }

  /**
   * Prepare header / footer
   */

  var templateHeader = options.templateHeader || TEMPLATE_HEADER;
  var templateFooter = options.templateFooter || TEMPLATE_FOOTER;

  /**
   * Build templateCache
   */

  return es.pipeline(
    templateCacheStream(options.root || '', options.base, options.templateBody, options.transformUrl),
    concat(filename),
    header(templateHeader, {
      module: options.module || DEFAULT_MODULE,
      modulePath: options.module || DEFAULT_MODULE_PATH
    }),
    footer(templateFooter, {
      module: options.module || DEFAULT_MODULE,
      modulePath: options.module || DEFAULT_MODULE_PATH
    })
  );

}


/**
 * Expose templateCache
 */

module.exports = templateCache;
