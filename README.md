# karma-watch-glob-workaround

This script implements a workaround to the issue documented [here](https://github.com/karma-runner/karma/issues/1087).

It describes an issue where
1. the file list contains globbwing patterns which resolve to contain some duplicates
1. one of these files are changed
1. karma watch triggers
1. karma loads a cached version of the changed file, **ignoring the changes**
1. karma runs the tests **as if no changes happened**

## How it works

The idea of the workaround absolve karma of the globbing responsibility,
ie. the list sent to karma is a list of files rather than a list of patterns to glob.

In the [example](reproduce/working.config.js), we will be passing
* app/scripts/abc/def/script.js
* app/scripts/abc/def/script.js
* test/spec.js

instead of
* app/scripts/abc/\*\*/\*.js
* app/\*\*/\*.js
* test/spec.js

It turns out the de-dupe is not required here at all.

## Usage

```javascript
files: require('karma-watch-glob-workaround')([
  'app/scripts/abc/**/*.js',
  'app/**/*.js',
  'test/spec.js'
])
```

# Reproducing the problem

Start from the `reproduce` directory and install dependencies.

`cd reproduce && npm install`

broken.config.js is what a typical Karma config looks like with this problem so start karma with it

`./node_modules/.bin/karma start broken.config.js`

Once karma settles down you should be able to see something like this at the bottom

`Chrome 54.0.2840 (Mac OS X 10.12.1) LOG: 'abc'`

Edit the file `app/scripts/abc/def/script.js` and watch karma rerun

eg. `sed -i -e 's/abc/def/' app/scripts/abc/def/script.js`

Notice that abc is still logged...

---

Repeat the same with working.config.js and this issue should be solved!

---

Oddly however, [another example](reproduce/working2.config.js) with only a single recursive glob works without this workaround
