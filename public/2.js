(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Tags.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Tags.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      data: {
        tagName: ""
      },
      addModal: false,
      editModal: false,
      isAdding: false,
      isEditing: false,
      tags: [],
      editData: {
        tagName: ""
      },
      index: -1,
      isDeleing: false,
      showDeleteModal: false,
      deleteItem: {},
      deletingIndex: -1,
      websiteSettings: []
    };
  },
  methods: {
    addTag: function addTag() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this.data.tagName.trim() == "")) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", _this.e("El nombre es requerido"));

              case 2:
                _context.next = 4;
                return _this.callApi("post", "api/create_tag", _this.data);

              case 4:
                res = _context.sent;

                if (res.status === 201) {
                  _this.s("Tag añadido de forma exitosa");

                  _this.addModal = false;
                  _this.data.tagName = "";
                } else {
                  if (res.status == 422) {
                    if (res.data.errors.tagName) {
                      _this.e(res.data.errors.tagName[0]);
                    }
                  } else {
                    _this.swr();
                  }
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    editTag: function editTag() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_this2.editData.tagName.trim() == "")) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", _this2.e("El nombre es requerido"));

              case 2:
                _context2.next = 4;
                return _this2.callApi("put", "api/edit_tag", _this2.editData);

              case 4:
                res = _context2.sent;

                if (res.status === 200) {
                  _this2.s("Tag actualizado de forma exitosa");

                  _this2.editModal = false;
                  _this2.data.tagName = "";
                } else {
                  if (res.status == 422) {
                    if (res.data.errors.tagName) {
                      _this2.e(res.data.errors.tagName[0]);
                    }
                  } else {
                    _this2.swr();
                  }
                }

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    showModalEdit: function showModalEdit(tag) {
      this.editData = tag;
      this.editModal = true;
    },
    deleteTag: function deleteTag() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // Vue.set(tag, "isDeleting", true);
                _this3.isDeleing = true;
                _context3.next = 3;
                return _this3.callApi("delete", "api/delete_tag", _this3.deleteItem);

              case 3:
                res = _context3.sent;

                if (res.status === 200) {
                  _this3.tags.splice(_this3.deletingIndex, 1);

                  _this3.s("El tag ha sido borrado de forma exitosa");
                } else {
                  _this3.swr();
                }

                _this3.isDeleing = false;
                _this3.showDeleteModal = false;

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    showDeletingModal: function showDeletingModal(tag, i) {
      /* const deleteModalObj = {
        showDeleteModal :true,
        deleteUrl: 'api/delete_tag',
        data: tag,
        deletingIndex: i,
        isDeleted: false
      }
      this.$store.commit('setDeletingModalObj', deleteModalObj)
      console.log('Metodo delete llamado') */
      this.deleteItem = tag;
      this.deletingIndex = i;
      this.showDeleteModal = true;
    }
  },
  created: function created() {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
      var res;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _this4.callApi("get", "api/get_tag");

            case 2:
              res = _context4.sent;

              if (res.status == 200) {
                _this4.tags = res.data.tags;
              } else {
                _this4.swr();
              }

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Tags.vue?vue&type=template&id=82cf4190&":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Tags.vue?vue&type=template&id=82cf4190& ***!
  \**************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "content" }, [
    _c(
      "div",
      { staticClass: "container-fluid" },
      [
        _c(
          "div",
          {
            staticClass:
              "\n        _1adminOverveiw_table_recent\n        _box_shadow\n        _border_radious\n        _mar_b30\n        _p20\n      "
          },
          [
            _c(
              "p",
              { staticClass: "_title0" },
              [
                _vm._v("\n        Tags Recientes\n        "),
                _c(
                  "Button",
                  {
                    on: {
                      click: function($event) {
                        _vm.addModal = true
                      }
                    }
                  },
                  [
                    _vm._v("Agregar "),
                    _c("i", { staticClass: "ml-3 lni lni-circle-plus" })
                  ]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "_overflow _table_div" }, [
              _c(
                "table",
                { staticClass: "_table" },
                [
                  _vm._m(0),
                  _vm._v(" "),
                  _vm._l(_vm.tags, function(tag, i) {
                    return _c("tr", { key: tag }, [
                      _c("td", [_vm._v(_vm._s(i + 1))]),
                      _vm._v(" "),
                      _c("td", { staticClass: "_table_name" }, [
                        _vm._v(
                          "\n              " +
                            _vm._s(tag.tagName) +
                            "\n            "
                        )
                      ]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(tag.created_at))]),
                      _vm._v(" "),
                      _c(
                        "td",
                        [
                          _c(
                            "Button",
                            {
                              attrs: { type: "info", size: "small" },
                              on: {
                                click: function($event) {
                                  return _vm.showModalEdit(tag)
                                }
                              }
                            },
                            [_vm._v("Editar")]
                          ),
                          _vm._v(" "),
                          _c(
                            "Button",
                            {
                              attrs: {
                                type: "error",
                                size: "small",
                                loading: tag.isDeleting
                              },
                              on: {
                                click: function($event) {
                                  return _vm.showDeletingModal(tag, i)
                                }
                              }
                            },
                            [_vm._v("Eliminar")]
                          )
                        ],
                        1
                      )
                    ])
                  })
                ],
                2
              )
            ])
          ]
        ),
        _vm._v(" "),
        _c(
          "Modal",
          {
            attrs: {
              title: "Añadir Nuevo Tag",
              "mask-closable": false,
              closable: false
            },
            model: {
              value: _vm.addModal,
              callback: function($$v) {
                _vm.addModal = $$v
              },
              expression: "addModal"
            }
          },
          [
            _c("Input", {
              staticStyle: { width: "100%" },
              attrs: { placeholder: "Ingrese algo" },
              model: {
                value: _vm.data.tagName,
                callback: function($$v) {
                  _vm.$set(_vm.data, "tagName", $$v)
                },
                expression: "data.tagName"
              }
            }),
            _vm._v(" "),
            _c(
              "div",
              { attrs: { slot: "footer" }, slot: "footer" },
              [
                _c(
                  "Button",
                  {
                    attrs: { type: "default" },
                    on: {
                      click: function($event) {
                        _vm.addModal = false
                      }
                    }
                  },
                  [_vm._v("Cancelar")]
                ),
                _vm._v(" "),
                _c(
                  "Button",
                  {
                    attrs: {
                      type: "primary",
                      disabled: _vm.isAdding,
                      loading: _vm.isAdding
                    },
                    on: { click: _vm.addTag }
                  },
                  [_vm._v(_vm._s(_vm.isAdding ? "Añadiendo .." : "Añadir"))]
                )
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "Modal",
          {
            attrs: {
              title: "Editar  Tag",
              "mask-closable": false,
              closable: false
            },
            model: {
              value: _vm.editModal,
              callback: function($$v) {
                _vm.editModal = $$v
              },
              expression: "editModal"
            }
          },
          [
            _c("Input", {
              staticStyle: { width: "100%" },
              attrs: { placeholder: "Ingrese algo" },
              model: {
                value: _vm.editData.tagName,
                callback: function($$v) {
                  _vm.$set(_vm.editData, "tagName", $$v)
                },
                expression: "editData.tagName"
              }
            }),
            _vm._v(" "),
            _c(
              "div",
              { attrs: { slot: "footer" }, slot: "footer" },
              [
                _c(
                  "Button",
                  {
                    attrs: { type: "default" },
                    on: {
                      click: function($event) {
                        _vm.editModal = false
                      }
                    }
                  },
                  [_vm._v("Cancelar")]
                ),
                _vm._v(" "),
                _c(
                  "Button",
                  {
                    attrs: {
                      type: "primary",
                      disabled: _vm.isEditing,
                      loading: _vm.isEditing
                    },
                    on: { click: _vm.editTag }
                  },
                  [_vm._v(_vm._s(_vm.isEditing ? "Editando .." : "Editar"))]
                )
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "Modal",
          {
            attrs: { width: "360" },
            model: {
              value: _vm.showDeleteModal,
              callback: function($$v) {
                _vm.showDeleteModal = $$v
              },
              expression: "showDeleteModal"
            }
          },
          [
            _c(
              "p",
              {
                staticStyle: { color: "#f60", "text-align": "center" },
                attrs: { slot: "header" },
                slot: "header"
              },
              [
                _c("Icon", { attrs: { type: "ios-information-circle" } }),
                _vm._v(" "),
                _c("span", [_vm._v("Eliminar Tag")])
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticStyle: { "text-align": "center" } }, [
              _c("p", [
                _vm._v(
                  "\n         ¿Estas seguro de querer eliminar este tag?\n        "
                )
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              { attrs: { slot: "footer" }, slot: "footer" },
              [
                _c(
                  "Button",
                  {
                    attrs: {
                      type: "error",
                      size: "large",
                      long: "",
                      loading: _vm.isDeleing,
                      disabled: _vm.isDeleing
                    },
                    on: { click: _vm.deleteTag }
                  },
                  [_vm._v("Delete")]
                )
              ],
              1
            )
          ]
        ),
        _vm._v(" "),
        _c("Page", { attrs: { total: 100 } })
      ],
      1
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("tr", [
      _c("th", [_vm._v("ID")]),
      _vm._v(" "),
      _c("th", [_vm._v("Nombre")]),
      _vm._v(" "),
      _c("th", [_vm._v("Fecha Creación")]),
      _vm._v(" "),
      _c("th", [_vm._v("Acciones")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/Tags.vue":
/*!*************************************!*\
  !*** ./resources/js/views/Tags.vue ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Tags_vue_vue_type_template_id_82cf4190___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tags.vue?vue&type=template&id=82cf4190& */ "./resources/js/views/Tags.vue?vue&type=template&id=82cf4190&");
/* harmony import */ var _Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tags.vue?vue&type=script&lang=js& */ "./resources/js/views/Tags.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Tags_vue_vue_type_template_id_82cf4190___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Tags_vue_vue_type_template_id_82cf4190___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Tags.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Tags.vue?vue&type=script&lang=js&":
/*!**************************************************************!*\
  !*** ./resources/js/views/Tags.vue?vue&type=script&lang=js& ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Tags.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Tags.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Tags.vue?vue&type=template&id=82cf4190&":
/*!********************************************************************!*\
  !*** ./resources/js/views/Tags.vue?vue&type=template&id=82cf4190& ***!
  \********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_template_id_82cf4190___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Tags.vue?vue&type=template&id=82cf4190& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Tags.vue?vue&type=template&id=82cf4190&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_template_id_82cf4190___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_template_id_82cf4190___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);