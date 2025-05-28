(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('fs'), require('dotenv'), require('twilio')) :
    typeof define === 'function' && define.amd ? define(['fs', 'dotenv', 'twilio'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ShrekMessageBot = factory(global.fs, global.dotenv, global.twilio));
})(this, (function (fs, dotenv, twilio) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var fs__namespace = /*#__PURE__*/_interopNamespace(fs);
    var dotenv__namespace = /*#__PURE__*/_interopNamespace(dotenv);
    var twilio__namespace = /*#__PURE__*/_interopNamespace(twilio);

    class ScriptReader {
        constructor() {
        }
        Read(filepath) {
            let output = fs__namespace.readFileSync(filepath, "utf-8");
            return output;
        }
        SMSMessageSplit(data) {
            let output = {};
            let messageCount = 0;
            let messageLength = 0;
            let curData = "";
            let dataArray = data.split("\n");
            dataArray.forEach((element) => {
                let line = element.trim();
                if (line !== "") {
                    if ((messageLength + line.length) < 480) {
                        curData += line + "\n";
                        messageLength += line.length + 1;
                    }
                    else {
                        output[messageCount++] = curData;
                        messageLength = 0;
                        curData = line;
                        messageLength += line.length;
                    }
                }
                else {
                    curData += "\n";
                    messageLength += 1;
                }
            });
            output[messageCount++] = curData;
            return output;
        }
    }

    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.

    // resolves . and .. elements in a path array with directory names there
    // must be no slashes, empty elements, or device names (c:\) in the array
    // (so also no leading and trailing slashes - it does not distinguish
    // relative and absolute paths)
    function normalizeArray(parts, allowAboveRoot) {
      // if the path tries to go above the root, `up` ends up > 0
      var up = 0;
      for (var i = parts.length - 1; i >= 0; i--) {
        var last = parts[i];
        if (last === '.') {
          parts.splice(i, 1);
        } else if (last === '..') {
          parts.splice(i, 1);
          up++;
        } else if (up) {
          parts.splice(i, 1);
          up--;
        }
      }

      // if the path is allowed to go above the root, restore leading ..s
      if (allowAboveRoot) {
        for (; up--; up) {
          parts.unshift('..');
        }
      }

      return parts;
    }

    // path.normalize(path)
    // posix version
    function normalize(path) {
      var isPathAbsolute = isAbsolute(path),
          trailingSlash = substr(path, -1) === '/';

      // Normalize the path
      path = normalizeArray(filter(path.split('/'), function(p) {
        return !!p;
      }), !isPathAbsolute).join('/');

      if (!path && !isPathAbsolute) {
        path = '.';
      }
      if (path && trailingSlash) {
        path += '/';
      }

      return (isPathAbsolute ? '/' : '') + path;
    }
    // posix version
    function isAbsolute(path) {
      return path.charAt(0) === '/';
    }

    // posix version
    function join() {
      var paths = Array.prototype.slice.call(arguments, 0);
      return normalize(filter(paths, function(p, index) {
        if (typeof p !== 'string') {
          throw new TypeError('Arguments to path.join must be strings');
        }
        return p;
      }).join('/'));
    }
    function filter (xs, f) {
        if (xs.filter) return xs.filter(f);
        var res = [];
        for (var i = 0; i < xs.length; i++) {
            if (f(xs[i], i, xs)) res.push(xs[i]);
        }
        return res;
    }

    // String.prototype.substr - negative index don't work in IE8
    var substr = 'ab'.substr(-1) === 'b' ?
        function (str, start, len) { return str.substr(start, len) } :
        function (str, start, len) {
            if (start < 0) start = str.length + start;
            return str.substr(start, len);
        }
    ;

    dotenv__namespace.config();
    async function start() {
        // Twilio setup
        let accountSid = process.env.TWILIO_ACCOUNT_SID;
        let authToken = process.env.TWILIO_AUTH_TOKEN;
        var client = new twilio__namespace.Twilio(accountSid, authToken);
        // Script Reader setup
        let filePath = join(__dirname, "..", "assets", "shrek-script.md");
        let sr = new ScriptReader();
        let data = sr.Read(filePath);
        let messageArray = sr.SMSMessageSplit(data);
        let messageLength = Object.keys(messageArray).length;
        console.log(`Preparing to send ${messageLength} message parts.`);
        for (let i = 0; i < messageLength; i++) {
            console.log(`Sending message part ${i + 1} of ${messageLength}...`);
            try {
                const message = await client.messages.create({
                    body: messageArray[i],
                    to: process.env.TO_NUMBER,
                    from: process.env.FROM_NUMBER,
                });
                console.log(`Message part ${i + 1} sent successfully. SID: ${message.sid}`);
                // Add a delay only if it's not the last message part
                if (i < messageLength - 1) {
                    // Delay to respect API rate limits (e.g., 1 message per second for long codes)
                    // Adjust this value as needed based on your Twilio number type and limits.
                    const delayMilliseconds = 1100; // 1.1 seconds
                    console.log(`Waiting for ${delayMilliseconds / 1000} seconds before sending the next part...`);
                    await new Promise((resolve) => setTimeout(resolve, delayMilliseconds));
                }
            }
            catch (error) {
                console.error(`Failed to send message part ${i + 1}:`, error);
                // Optionally, you can decide to stop the process on error:
                // throw error;
                // Or add a longer delay and retry, or skip. For now, it logs and continues.
                console.log("Continuing with the next message part despite the error.");
            }
        }
        console.log("All message parts have been processed.");
    }
    var index = start();

    return index;

}));
