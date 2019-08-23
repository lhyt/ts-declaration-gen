(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ts-declaration-gen", [], factory);
	else if(typeof exports === 'object')
		exports["ts-declaration-gen"] = factory();
	else
		root["ts-declaration-gen"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {function transformSchema(o) {
	return Object.entries(o).reduce((res, [key, value]) => {
		res[key] = typeof value !== 'object' ? typeof value : transformSchema(value);
		return res;
	}, Array.isArray(o) ? [] : {});
}

function handleArrInMyStringify(type) {
	return type || 'null';
}

function myStringify(json, space = 2, step = 2) {
	const ret = Object.keys(json).reduce((res, cur, index) => {
		const isObj = typeof json[cur] !== 'object';
		const isArr = Array.isArray(json[cur]);
		const prefix = `${index ? '\n' : ''}${' '.repeat(space)}${cur}: `;
		if (isArr) {
			return res + `${prefix}${json[cur].reduce((curRes, curItem) => {
				return `${typeof curItem !== 'object' ? handleArrInMyStringify(curItem) : myStringify(curItem, space + step)}${curRes ? ' | ' : ''}${curRes}`;
			}, '')} [];`;
		}
		if (isArr && typeof json[cur][0] !== 'object') {
			return res + `${prefix}${handleArrInMyStringify(json[cur][0])}[];`;
		}
		return res + `${prefix}${isObj ? json[cur] : myStringify(isArr ? json[cur][0] : json[cur], space + step)}${isArr ? '[]' : ''};`;
	}, '');
	if (Array.isArray(json)) {
		return `${ret}[]`;
	}
	return `{
${ret}
${' '.repeat(space - 2)}}`;
}

function declarationGen(o) {
	return myStringify(transformSchema(o));
}

if (module) module.exports = declarationGen;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);
});