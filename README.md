# gulp-angular2-templatecache

[![License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://npmjs.org/package/gulp-angular2-templatecache)
[![NPM version](http://img.shields.io/npm/v/gulp-angular-templatecache.svg?style=flat)](https://npmjs.org/package/gulp-angular2-templatecache)
[![NPM version](http://img.shields.io/npm/dm/gulp-angular-templatecache.svg?style=flat)](https://npmjs.org/package/gulp-angular2-templatecache)
[![Build Status](http://img.shields.io/travis/miickel/gulp-angular-templatecache.svg?style=flat)](http://travis-ci.org/miickel/gulp-angular-templatecache)
[![Dependency Status](http://img.shields.io/gemnasium/miickel/gulp-angular-templatecache.svg?style=flat)](https://gemnasium.com/miickel/gulp-angular-templatecache)

> Concatenates and registers Angular2 templates for the angular2-templatecache package.

<a href="#install">Install</a> |
<a href="#example">Example</a> |
<a href="#api">API</a> |
[Releases](https://github.com/aarondh/gulp-angular2-templatecache/releases) |
<a href="#license">License</a>

----


## Install

Install with [npm](https://npmjs.org/package/gulp-angular2-templatecache)

```
npm install gulp-angular2-templatecache --save-dev
```


## Example

**gulpfile.js**

> Concatenate the contents of all .html-files in the templates directory and save to ./templates.ts_ (default filename).

```js
var templateCache = require('gulp-angular2-templatecache');

gulp.task('default', function () {
  return gulp.src('templates/**/*.html')
    .pipe(templateCache())
    .pipe(gulp.dest('public'));
});
```

**Result (_public/templates.ts_)**

> Sample output (prettified).

```js
import { Injectable } from "angular2/core";
import { TemplateCache } from "angular2-templatecache/templatecache";
export class Templates {
  constructor( templateCache: TemplateCache ) {
    templateCache.put("template1.html",
      // template1.html content (escaped)
    );
    templateCache.put("template2.html",
      // template2.html content (escaped)
    );
    // etc.
  }
]);

```

Include this file in your app and add modify your bootstrap call as follows:
```js
import {bootstrap}    from 'angular2/platform/browser'
import { Templates } from 'app/templates'; //<-- The file generated by gulp-angular2-templatecache
import { TEMPLATE_CACHE_PROVIDER, } from 'angular2-templatecache/templatecache';
  bootstrap( YourAppComponent, [TEMPLATE_CACHE_PROVIDER, Templates])
```

__Note:__ if you use Visual Studio on Windows, you might encounter this error message: `ASPNETCOMPILER : error ASPRUNTIME: The specified path, file name, or both are too long. The fully qualified file name must be less than 260 characters, and the directory name must be less than 248 characters.`


## API

gulp-angular2-templatecache([filename](https://github.com/miickel/gulp-angular-templatecache#filename---string-filenametemplatesjs), [options](https://github.com/miickel/gulp-angular-templatecache#options))

---- 

### filename - {string} [filename='templates.ts']

> Name to use when concatenating.

### options

#### root - {string}

> Prefix for template URLs.

#### module - {string} [module='TemplateCache']

> Name of Angular2 caching module to be injected.

#### modulePath - {string} [module='angular2-templatecache/templatecache']

> path to the caching module to be injected.

#### base {string | function} [base=file.base]

> Override file base path.

#### transformUrl {function}

> Transform the generated URL before it's put into the template cache module.

```js
transformUrl: function(url) {
	return url.replace(/\.tpl\.html$/, '.html')
}
```

#### templateHeader {string} [templateHeader=see below]

> Override template header.

```js
var TEMPLATE_HEADER = 'import{Injectable} from 'angular2/core';import {<%= module %>} from '<%= modulePath %>';@Injectable()class Templates { constructor( templateCache: <%= module %>) {';
```

#### templateBody {string} [templateBody=see below]

> Override template body.

```js
var TEMPLATE_BODY = 'templateCache.put("<%= url %>","<%= contents %>");';
```

#### templateFooter {string} [templateFooter=see below]

> Override template footer.

```js
var TEMPLATE_FOOTER = '}}';
```


## Changes

> This plugin uses Semantic Versioning 2.0.0

### 1.0.0 and newer

See [Releases](https://github.com/aarondh/gulp-angular2-templatecache/releases)


## License

The MIT License (MIT)

Copyright (c) 2014 [Mickel](http://mickel.me)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![Analytics](https://ga-beacon.appspot.com/UA-46880034-1/gulp-angular-templatecache/readme?pixel)](https://github.com/igrigorik/ga-beacon)
