/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./components/OrientationNotice.tsx":
/*!******************************************!*\
  !*** ./components/OrientationNotice.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ OrientationNotice)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction OrientationNotice() {\n    const [landscape, setLandscape] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const check = ()=>{\n            if (true) return;\n            const w = window.innerWidth, h = window.innerHeight;\n            setLandscape(w > h && Math.min(w, h) < 1024);\n        };\n        check();\n        window.addEventListener(\"resize\", check);\n        window.addEventListener(\"orientationchange\", check);\n        return ()=>{\n            window.removeEventListener(\"resize\", check);\n            window.removeEventListener(\"orientationchange\", check);\n        };\n    }, []);\n    if (!landscape) return null;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 text-white p-8 text-center\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"text-2xl font-semibold mb-2\",\n                    children: \"Rotate your device\"\n                }, void 0, false, {\n                    fileName: \"/Users/roderickharris-wright/Desktop/V2/Downtime V2 2/components/OrientationNotice.tsx\",\n                    lineNumber: 24,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"opacity-80\",\n                    children: \"For the best experience, use portrait mode.\"\n                }, void 0, false, {\n                    fileName: \"/Users/roderickharris-wright/Desktop/V2/Downtime V2 2/components/OrientationNotice.tsx\",\n                    lineNumber: 25,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/roderickharris-wright/Desktop/V2/Downtime V2 2/components/OrientationNotice.tsx\",\n            lineNumber: 23,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/roderickharris-wright/Desktop/V2/Downtime V2 2/components/OrientationNotice.tsx\",\n        lineNumber: 22,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL09yaWVudGF0aW9uTm90aWNlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDNEM7QUFFN0IsU0FBU0U7SUFDdEIsTUFBTSxDQUFDQyxXQUFXQyxhQUFhLEdBQUdILCtDQUFRQSxDQUFDO0lBQzNDRCxnREFBU0EsQ0FBQztRQUNSLE1BQU1LLFFBQVE7WUFDWixJQUFJLElBQTZCLEVBQUU7WUFDbkMsTUFBTUMsSUFBSUMsT0FBT0MsVUFBVSxFQUFFQyxJQUFJRixPQUFPRyxXQUFXO1lBQ25ETixhQUFhRSxJQUFJRyxLQUFLRSxLQUFLQyxHQUFHLENBQUNOLEdBQUVHLEtBQUs7UUFDeEM7UUFDQUo7UUFDQUUsT0FBT00sZ0JBQWdCLENBQUMsVUFBVVI7UUFDbENFLE9BQU9NLGdCQUFnQixDQUFDLHFCQUFxQlI7UUFDN0MsT0FBTztZQUNMRSxPQUFPTyxtQkFBbUIsQ0FBQyxVQUFVVDtZQUNyQ0UsT0FBT08sbUJBQW1CLENBQUMscUJBQXFCVDtRQUNsRDtJQUNGLEdBQUcsRUFBRTtJQUNMLElBQUksQ0FBQ0YsV0FBVyxPQUFPO0lBQ3ZCLHFCQUNFLDhEQUFDWTtRQUFJQyxXQUFVO2tCQUNiLDRFQUFDRDs7OEJBQ0MsOERBQUNBO29CQUFJQyxXQUFVOzhCQUE4Qjs7Ozs7OzhCQUM3Qyw4REFBQ0Q7b0JBQUlDLFdBQVU7OEJBQWE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSXBDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHdvLXRhcC1kaXNjb3ZlcnkvLi9jb21wb25lbnRzL09yaWVudGF0aW9uTm90aWNlLnRzeD8xZjEzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBPcmllbnRhdGlvbk5vdGljZSgpIHtcbiAgY29uc3QgW2xhbmRzY2FwZSwgc2V0TGFuZHNjYXBlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBjaGVjayA9ICgpID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG4gICAgICBjb25zdCB3ID0gd2luZG93LmlubmVyV2lkdGgsIGggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICBzZXRMYW5kc2NhcGUodyA+IGggJiYgTWF0aC5taW4odyxoKSA8IDEwMjQpO1xuICAgIH07XG4gICAgY2hlY2soKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBjaGVjayk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCBjaGVjayk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGNoZWNrKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgY2hlY2spO1xuICAgIH07XG4gIH0sIFtdKTtcbiAgaWYgKCFsYW5kc2NhcGUpIHJldHVybiBudWxsO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LVs5OTk5XSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1ibGFjay84NSB0ZXh0LXdoaXRlIHAtOCB0ZXh0LWNlbnRlclwiPlxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LXNlbWlib2xkIG1iLTJcIj5Sb3RhdGUgeW91ciBkZXZpY2U8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvcGFjaXR5LTgwXCI+Rm9yIHRoZSBiZXN0IGV4cGVyaWVuY2UsIHVzZSBwb3J0cmFpdCBtb2RlLjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJPcmllbnRhdGlvbk5vdGljZSIsImxhbmRzY2FwZSIsInNldExhbmRzY2FwZSIsImNoZWNrIiwidyIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJoIiwiaW5uZXJIZWlnaHQiLCJNYXRoIiwibWluIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkaXYiLCJjbGFzc05hbWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/OrientationNotice.tsx\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_font_google_target_css_path_pages_app_tsx_import_Plus_Jakarta_Sans_arguments_subsets_latin_variableName_jakarta___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/font/google/target.css?{\"path\":\"pages/_app.tsx\",\"import\":\"Plus_Jakarta_Sans\",\"arguments\":[{\"subsets\":[\"latin\"]}],\"variableName\":\"jakarta\"} */ \"./node_modules/next/font/google/target.css?{\\\"path\\\":\\\"pages/_app.tsx\\\",\\\"import\\\":\\\"Plus_Jakarta_Sans\\\",\\\"arguments\\\":[{\\\"subsets\\\":[\\\"latin\\\"]}],\\\"variableName\\\":\\\"jakarta\\\"}\");\n/* harmony import */ var next_font_google_target_css_path_pages_app_tsx_import_Plus_Jakarta_Sans_arguments_subsets_latin_variableName_jakarta___WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_font_google_target_css_path_pages_app_tsx_import_Plus_Jakarta_Sans_arguments_subsets_latin_variableName_jakarta___WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _components_OrientationNotice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/OrientationNotice */ \"./components/OrientationNotice.tsx\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _styles_components_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/components.css */ \"./styles/components.css\");\n/* harmony import */ var _styles_components_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_components_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! leaflet/dist/leaflet.css */ \"./node_modules/leaflet/dist/leaflet.css\");\n/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _styles_edge_fade_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/.edge-fade.css */ \"./styles/.edge-fade.css\");\n/* harmony import */ var _styles_edge_fade_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_edge_fade_css__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\n\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (next_font_google_target_css_path_pages_app_tsx_import_Plus_Jakarta_Sans_arguments_subsets_latin_variableName_jakarta___WEBPACK_IMPORTED_MODULE_6___default().className),\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"/Users/roderickharris-wright/Desktop/V2/Downtime V2 2/pages/_app.tsx\",\n            lineNumber: 14,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/roderickharris-wright/Desktop/V2/Downtime V2 2/pages/_app.tsx\",\n        lineNumber: 13,\n        columnNumber: 5\n    }, this);\n}\n{}/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_OrientationNotice__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {}, void 0, false, {\n    fileName: \"/Users/roderickharris-wright/Desktop/V2/Downtime V2 2/pages/_app.tsx\",\n    lineNumber: 20,\n    columnNumber: 1\n}, undefined);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRTUE7QUFSeUQ7QUFFaEM7QUFDRztBQUNBO0FBRUE7QUFJbkIsU0FBU0UsSUFBSSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBWTtJQUM1RCxxQkFDRSw4REFBQ0M7UUFBSUMsV0FBV04sd0tBQWlCO2tCQUMvQiw0RUFBQ0c7WUFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7OztBQUc5QjtBQUVBLENBQW1DLGVBQ25DLDhEQUFDSCxxRUFBaUJBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHdvLXRhcC1kaXNjb3ZlcnkvLi9wYWdlcy9fYXBwLnRzeD8yZmJlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPcmllbnRhdGlvbk5vdGljZSBmcm9tIFwiQC9jb21wb25lbnRzL09yaWVudGF0aW9uTm90aWNlXCI7XG5pbXBvcnQgdHlwZSB7IEFwcFByb3BzIH0gZnJvbSBcIm5leHQvYXBwXCI7XG5pbXBvcnQgXCIuLi9zdHlsZXMvZ2xvYmFscy5jc3NcIjtcbmltcG9ydCBcIi4uL3N0eWxlcy9jb21wb25lbnRzLmNzc1wiO1xuaW1wb3J0IFwibGVhZmxldC9kaXN0L2xlYWZsZXQuY3NzXCI7XG5pbXBvcnQgeyBQbHVzX0pha2FydGFfU2FucyB9IGZyb20gXCJuZXh0L2ZvbnQvZ29vZ2xlXCI7XG5pbXBvcnQgXCIuLi9zdHlsZXMvLmVkZ2UtZmFkZS5jc3NcIjtcblxuY29uc3QgamFrYXJ0YSA9IFBsdXNfSmFrYXJ0YV9TYW5zKHsgc3Vic2V0czogW1wibGF0aW5cIl0gfSk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2pha2FydGEuY2xhc3NOYW1lfT5cbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuey8qIE9yaWVudGF0aW9uIGd1YXJkIGZvciBtb2JpbGUgKi99XG48T3JpZW50YXRpb25Ob3RpY2UgLz5cbiJdLCJuYW1lcyI6WyJqYWthcnRhIiwiT3JpZW50YXRpb25Ob3RpY2UiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJkaXYiLCJjbGFzc05hbWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/.edge-fade.css":
/*!*******************************!*\
  !*** ./styles/.edge-fade.css ***!
  \*******************************/
/***/ (() => {



/***/ }),

/***/ "./styles/components.css":
/*!*******************************!*\
  !*** ./styles/components.css ***!
  \*******************************/
/***/ (() => {



/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/leaflet"], () => (__webpack_exec__("./pages/_app.tsx")));
module.exports = __webpack_exports__;

})();