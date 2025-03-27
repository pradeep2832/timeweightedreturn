// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"5mTjm":[function(require,module,exports,__globalThis) {
var HMR_HOST = null;
var HMR_PORT = 3001;
var HMR_SERVER_PORT = 3001;
var HMR_SECURE = false;
var HMR_ENV_HASH = "c4396e152e992b90";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "cbe527c8d797a4ab";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            if (err.message) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"5maSx":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _reactDom = require("react-dom");
var _reactDomDefault = parcelHelpers.interopDefault(_reactDom);
var _material = require("@mui/material");
var _cssBaseline = require("@mui/material/CssBaseline");
var _cssBaselineDefault = parcelHelpers.interopDefault(_cssBaseline);
var _app = require("./components/App");
var _appDefault = parcelHelpers.interopDefault(_app);
const theme = (0, _material.createTheme)({
    palette: {
        mode: 'dark'
    }
});
(0, _reactDomDefault.default).render(/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _reactDefault.default).StrictMode, {
    children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.ThemeProvider), {
        theme: theme,
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _cssBaselineDefault.default), {}, void 0, false, {
                fileName: "src/frontend/index.js",
                lineNumber: 16,
                columnNumber: 13
            }, undefined),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _appDefault.default), {}, void 0, false, {
                fileName: "src/frontend/index.js",
                lineNumber: 17,
                columnNumber: 13
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "src/frontend/index.js",
        lineNumber: 15,
        columnNumber: 9
    }, undefined)
}, void 0, false, {
    fileName: "src/frontend/index.js",
    lineNumber: 14,
    columnNumber: 5
}, undefined), document.getElementById('root'));

},{"react/jsx-dev-runtime":"react/jsx-dev-runtime","react":"react","react-dom":"react-dom","@mui/material":"@mui/material","@mui/material/CssBaseline":"@mui/material/CssBaseline","./components/App":"k6f4L","@parcel/transformer-js/src/esmodule-helpers.js":"7tKpY"}],"k6f4L":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _material = require("@mui/material");
var _reactJsonView = require("react-json-view");
var _reactJsonViewDefault = parcelHelpers.interopDefault(_reactJsonView);
var _portfolioExample = require("../../examples/portfolio-example");
const sampleInput = {
    client: {
        name: 'John Doe',
        email: 'john@example.com',
        accountNumber: 'ACC123'
    },
    securities: [
        {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            classification: 'STOCK',
            initialValue: 150,
            quantity: 10
        },
        {
            symbol: 'MSFT',
            name: 'Microsoft Corporation',
            classification: 'STOCK',
            initialValue: 280,
            quantity: 5
        },
        {
            symbol: 'AGG',
            name: 'iShares Core U.S. Aggregate Bond ETF',
            classification: 'BOND',
            initialValue: 100,
            quantity: 20
        }
    ],
    spendingFunds: [
        {
            name: 'Emergency Fund',
            lowerLimit: 10000,
            upperLimit: 20000,
            currentBalance: 15000
        },
        {
            name: 'Monthly Expenses',
            lowerLimit: 5000,
            upperLimit: 10000,
            currentBalance: 7500
        }
    ],
    transactions: [
        {
            type: 'DEPOSIT',
            date: '2023-01-01',
            amount: 5000
        },
        {
            type: 'BUY',
            date: '2023-02-15',
            securityId: 'AAPL',
            quantity: 5,
            price: 155
        }
    ]
};
function App() {
    const [input, setInput] = (0, _react.useState)(sampleInput);
    const [output, setOutput] = (0, _react.useState)(null);
    const [loading, setLoading] = (0, _react.useState)(false);
    const [error, setError] = (0, _react.useState)(null);
    const calculatePerformance = async ()=>{
        setLoading(true);
        setError(null);
        try {
            const result = await (0, _portfolioExample.portfolioExample)(input);
            setOutput(result);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Container), {
        maxWidth: "xl",
        sx: {
            mt: 4,
            mb: 4
        },
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Typography), {
                variant: "h4",
                gutterBottom: true,
                children: "Portfolio Performance Calculator"
            }, void 0, false, {
                fileName: "src/frontend/components/App.js",
                lineNumber: 86,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Grid), {
                container: true,
                spacing: 3,
                children: [
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Grid), {
                        item: true,
                        xs: 12,
                        md: 6,
                        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Paper), {
                            sx: {
                                p: 2,
                                height: '80vh',
                                overflow: 'auto'
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Typography), {
                                    variant: "h6",
                                    gutterBottom: true,
                                    children: "Input Configuration"
                                }, void 0, false, {
                                    fileName: "src/frontend/components/App.js",
                                    lineNumber: 93,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _reactJsonViewDefault.default), {
                                    src: input,
                                    name: false,
                                    theme: "monokai",
                                    enableClipboard: false,
                                    onEdit: (edit)=>setInput(edit.updated_src),
                                    onAdd: (add)=>setInput(add.updated_src),
                                    onDelete: (del)=>setInput(del.updated_src)
                                }, void 0, false, {
                                    fileName: "src/frontend/components/App.js",
                                    lineNumber: 96,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Box), {
                                    sx: {
                                        mt: 2
                                    },
                                    children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Button), {
                                        variant: "contained",
                                        onClick: calculatePerformance,
                                        disabled: loading,
                                        children: "Calculate Performance"
                                    }, void 0, false, {
                                        fileName: "src/frontend/components/App.js",
                                        lineNumber: 106,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "src/frontend/components/App.js",
                                    lineNumber: 105,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/frontend/components/App.js",
                            lineNumber: 92,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "src/frontend/components/App.js",
                        lineNumber: 91,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Grid), {
                        item: true,
                        xs: 12,
                        md: 6,
                        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Paper), {
                            sx: {
                                p: 2,
                                height: '80vh',
                                overflow: 'auto'
                            },
                            children: [
                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Typography), {
                                    variant: "h6",
                                    gutterBottom: true,
                                    children: "Results and Analysis"
                                }, void 0, false, {
                                    fileName: "src/frontend/components/App.js",
                                    lineNumber: 120,
                                    columnNumber: 25
                                }, this),
                                loading && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Typography), {
                                    children: "Calculating..."
                                }, void 0, false, {
                                    fileName: "src/frontend/components/App.js",
                                    lineNumber: 124,
                                    columnNumber: 29
                                }, this),
                                error && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Typography), {
                                    color: "error",
                                    children: error
                                }, void 0, false, {
                                    fileName: "src/frontend/components/App.js",
                                    lineNumber: 127,
                                    columnNumber: 29
                                }, this),
                                output && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Box), {
                                    children: [
                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Typography), {
                                            variant: "h6",
                                            children: "Portfolio Performance"
                                        }, void 0, false, {
                                            fileName: "src/frontend/components/App.js",
                                            lineNumber: 131,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Box), {
                                            sx: {
                                                mb: 2
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Typography), {
                                                    children: [
                                                        "Time-Weighted Return: ",
                                                        (output.timeWeightedReturn * 100).toFixed(2),
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/frontend/components/App.js",
                                                    lineNumber: 133,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Typography), {
                                                    children: [
                                                        "Annualized Return: ",
                                                        (output.annualizedReturn * 100).toFixed(2),
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/frontend/components/App.js",
                                                    lineNumber: 136,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/frontend/components/App.js",
                                            lineNumber: 132,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Typography), {
                                            variant: "h6",
                                            children: "Spending Funds Status"
                                        }, void 0, false, {
                                            fileName: "src/frontend/components/App.js",
                                            lineNumber: 141,
                                            columnNumber: 33
                                        }, this),
                                        output.spendingFunds.map((fund, index)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Box), {
                                                sx: {
                                                    mb: 2
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Typography), {
                                                        variant: "subtitle1",
                                                        children: fund.name
                                                    }, void 0, false, {
                                                        fileName: "src/frontend/components/App.js",
                                                        lineNumber: 144,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Typography), {
                                                        children: [
                                                            "Current Balance: $",
                                                            fund.currentBalance.toLocaleString()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/frontend/components/App.js",
                                                        lineNumber: 145,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Typography), {
                                                        children: [
                                                            "Limits: $",
                                                            fund.lowerLimit.toLocaleString(),
                                                            " - $",
                                                            fund.upperLimit.toLocaleString()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/frontend/components/App.js",
                                                        lineNumber: 148,
                                                        columnNumber: 41
                                                    }, this),
                                                    fund.needsRebalancing && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Typography), {
                                                        color: "warning.main",
                                                        children: "Needs Rebalancing"
                                                    }, void 0, false, {
                                                        fileName: "src/frontend/components/App.js",
                                                        lineNumber: 152,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, index, true, {
                                                fileName: "src/frontend/components/App.js",
                                                lineNumber: 143,
                                                columnNumber: 37
                                            }, this)),
                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _material.Typography), {
                                            variant: "h6",
                                            children: "Transaction Analysis"
                                        }, void 0, false, {
                                            fileName: "src/frontend/components/App.js",
                                            lineNumber: 159,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _reactJsonViewDefault.default), {
                                            src: output.transactions,
                                            name: false,
                                            theme: "monokai",
                                            collapsed: 1
                                        }, void 0, false, {
                                            fileName: "src/frontend/components/App.js",
                                            lineNumber: 160,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/frontend/components/App.js",
                                    lineNumber: 130,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/frontend/components/App.js",
                            lineNumber: 119,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "src/frontend/components/App.js",
                        lineNumber: 118,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/frontend/components/App.js",
                lineNumber: 89,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/frontend/components/App.js",
        lineNumber: 85,
        columnNumber: 9
    }, this);
}
exports.default = App;

},{"react/jsx-dev-runtime":"react/jsx-dev-runtime","react":"react","@mui/material":"@mui/material","react-json-view":"react-json-view","../../examples/portfolio-example":"24hwi","@parcel/transformer-js/src/esmodule-helpers.js":"7tKpY"}],"24hwi":[function(require,module,exports,__globalThis) {
const axios = require("b09bfa5ce4c735f5");
const API_BASE_URL = 'http://localhost:3000/api';
async function portfolioExample(input) {
    try {
        // Create a client
        const clientResponse = await axios.post(`${API_BASE_URL}/clients`, input.client);
        const client = clientResponse.data;
        console.log('Created client:', client);
        // Add securities
        for (const security of input.securities){
            const securityResponse = await axios.post(`${API_BASE_URL}/clients/${client.id}/securities`, security);
            console.log('Added security:', securityResponse.data);
        }
        // Add spending funds
        for (const fund of input.spendingFunds){
            const fundResponse = await axios.post(`${API_BASE_URL}/clients/${client.id}/spending-funds`, fund);
            console.log('Added spending fund:', fundResponse.data);
        }
        // Add transactions
        for (const transaction of input.transactions){
            const transactionResponse = await axios.post(`${API_BASE_URL}/clients/${client.id}/transactions`, transaction);
            console.log('Added transaction:', transactionResponse.data);
        }
        // Calculate performance
        const performanceResponse = await axios.get(`${API_BASE_URL}/clients/${client.id}/performance`, {
            params: {
                startDate: '2023-01-01',
                endDate: '2023-12-31'
            }
        });
        // Get spending fund status
        const spendingFundsResponse = await axios.get(`${API_BASE_URL}/clients/${client.id}/spending-funds`);
        return {
            timeWeightedReturn: performanceResponse.data.timeWeightedReturn,
            annualizedReturn: performanceResponse.data.annualizedReturn,
            spendingFunds: spendingFundsResponse.data,
            transactions: input.transactions.map((t, index)=>({
                    ...t,
                    id: `T${index + 1}`,
                    date: new Date(t.date).toISOString(),
                    explanation: getTransactionExplanation(t)
                }))
        };
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        throw error;
    }
}
function getTransactionExplanation(transaction) {
    switch(transaction.type){
        case 'DEPOSIT':
            return `Initial deposit of $${transaction.amount}`;
        case 'BUY':
            return `Bought ${transaction.quantity} shares of ${transaction.securityId} at $${transaction.price} per share`;
        case 'SELL':
            return `Sold ${transaction.quantity} shares of ${transaction.securityId} at $${transaction.price} per share`;
        case 'DIVIDEND':
            return `Received dividend of $${transaction.amount} from ${transaction.securityId}`;
        case 'SPENDING_FUND_DEPOSIT':
            return `Deposited $${transaction.amount} to ${transaction.spendingFundId}`;
        case 'SPENDING_FUND_WITHDRAWAL':
            return `Withdrew $${Math.abs(transaction.amount)} from ${transaction.spendingFundId}`;
        case 'REBALANCE_UP':
            return `Rebalanced ${transaction.spendingFundId} up by $${transaction.amount}`;
        case 'REBALANCE_DOWN':
            return `Rebalanced ${transaction.spendingFundId} down by $${Math.abs(transaction.amount)}`;
        default:
            return 'Transaction executed';
    }
}
module.exports = {
    portfolioExample
};

},{"b09bfa5ce4c735f5":"axios"}],"7tKpY":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["5mTjm","5maSx"], "5maSx", "parcelRequire23f2")

//# sourceMappingURL=frontend.d797a4ab.js.map
