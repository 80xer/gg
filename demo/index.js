(function () {
  'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _typeof$1(obj) {
    if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
      _typeof$1 = function _typeof$1(obj) {
        return _typeof(obj);
      };
    } else {
      _typeof$1 = function _typeof$1(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
      };
    }

    return _typeof$1(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty$1(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread$1(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty$1(target, key, source[key]);
      });
    }

    return target;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }
  /* eslint-disable prefer-rest-params */

  /* eslint-disable func-names */

  /* eslint-disable camelcase */


  function addClass(el, className) {
    className.split(' ').forEach(function (cn) {
      el.classList.add(cn);
      return el;
    });
  }

  function hasClass(el, className) {
    if (!el.classList) return false;
    return el.classList.contains(className);
  }

  function removeClass(el, className) {
    className.split(' ').forEach(function (cn) {
      el.classList.remove(cn);
    });
  }

  function hasClassInParents(el, className) {
    var elm = el;

    while (elm) {
      if (hasClass(elm, className)) {
        return elm;
      }

      elm = elm.parentNode;
    }

    return false;
  }

  function getDistance(x1, y1, x2, y2) {
    var xv = x2 - x1;
    var yv = y2 - y1;
    xv *= xv;
    yv *= yv;
    return Math.sqrt(xv + yv);
  }

  var BorderLine =
  /*#__PURE__*/
  function () {
    function BorderLine() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          type = _ref.type;

      _classCallCheck(this, BorderLine);

      this.createBorderLine(type);
    }

    _createClass(BorderLine, [{
      key: "createBorderLine",
      value: function createBorderLine(type) {
        var line = document.createElement('div');
        addClass(line, 'gg-border-line');
        if (type) addClass(line, "gg-border-line-".concat(type));
        this.$line = line;
        return line;
      }
    }]);

    return BorderLine;
  }();

  var props = function props() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var target = options.target,
        data = options.data,
        columns = options.columns;

    function validTarget(tgt) {
      return tgt && _typeof$1(tgt) === 'object';
    }

    function validData(dt) {
      return dt && Array.isArray(dt) && dt.length > 0 && _typeof$1(dt[0]) === 'object';
    }

    function validColumns(cols) {
      return cols && Array.isArray(cols) && cols.length > 0 && _typeof$1(cols[0]) === 'object';
    } // target


    if (!validTarget(target)) {
      console.error('target must be dom object');
      return false;
    } // data


    if (!validData(data)) {
      console.error('data must be array of object type');
      return false;
    } // columns


    if (!validColumns(columns)) {
      console.error('columns must be array of object type');
      return false;
    }

    return true;
  };
  /* eslint-disable no-unused-vars */

  /* eslint-disable class-methods-use-this */


  var ColGroup =
  /*#__PURE__*/
  function () {
    function ColGroup(props) {
      _classCallCheck(this, ColGroup);

      props.columnClassName = props.columnClassName || 'data-column-name';
      this.props = props;
      this.$el = this.createColGroup();
      this.setWidthOfColumns();
    }

    _createClass(ColGroup, [{
      key: "createColGroup",
      value: function createColGroup() {
        var colgroup = document.createElement('colgroup');
        var _this$props = this.props,
            columns = _this$props.columns,
            columnClassName = _this$props.columnClassName;
        columns.forEach(function (column) {
          var col = document.createElement('col');
          col.setAttribute(columnClassName, column.field);
          col.textContent = column.title;
          colgroup.appendChild(col);
        });
        return colgroup;
      }
    }, {
      key: "scrollBarWidth",
      value: function scrollBarWidth() {
        var hasScroll = this.props.hasScroll;
        if (hasScroll) return 14;
        return 0;
      }
    }, {
      key: "setWidthOfColumns",
      value: function setWidthOfColumns() {
        var _this$props2 = this.props,
            target = _this$props2.target,
            columns = _this$props2.columns,
            data = _this$props2.data;
        if (!target) throw new Error('required target, in colgroup');
        var positionInfo = target.getBoundingClientRect();
        var targetWidth = positionInfo.width;
        if (this.props.otherSide) targetWidth -= parseInt(this.props.otherSide.$side.style.width, 10);
        var scrollBarWidth = this.scrollBarWidth();
        var widthColumns = ColGroup.calculateWidthOfColumns(targetWidth - scrollBarWidth, columns);
        var cols = this.$el.querySelectorAll('col');
        cols.forEach(function (col, i) {
          col.setAttribute('width', widthColumns[i]);
        });
      }
    }], [{
      key: "calculateWidthOfColumns",
      value: function calculateWidthOfColumns(totalWidth, columns) {
        var columnsWithWidth = columns.filter(function (column) {
          return column.width;
        });
        var countColumns = columns.length - columnsWithWidth.length;
        var totalWithoutWidth = columnsWithWidth.reduce(function (total, col) {
          return total - col.width;
        }, totalWidth);
        var result = [];

        for (var i = 0; i < columns.length; i += 1) {
          if (columns[i].width) {
            result.push(columns[i].width);
          } else {
            // if (j === countColumns - 1 && width * countColumns < totalWithoutWidth) {
            //   result.push(width + (totalWithoutWidth - width * countColumns));
            // } else {
            //   result.push(width);
            // }
            result.push(120);
          }
        } // 테이블의 우측 보더라인과 정확히 겹치기 위해 마지막 컬럼의 너비를 1px 줄인다.


        result[result.length - 1] -= 1;
        return result;
      }
    }]);

    return ColGroup;
  }();

  var Head =
  /*#__PURE__*/
  function () {
    function Head(props) {
      _classCallCheck(this, Head);

      this.props = props;
      this.resizableColumnWidth = false;
      this.startPointX = 0;
      this.vectorPointX = 0;
      this.createHeadArea();
    }

    _createClass(Head, [{
      key: "createHeadArea",
      value: function createHeadArea() {
        var area = document.createElement('div');
        addClass(area, 'gg-head-area');
        var container = this.createTableContainer();
        area.appendChild(container);

        if (this.props.scroll.y === false) {
          area.style.overflowY = 'hidden';
        }

        this.$area = area;
        return area;
      }
    }, {
      key: "createTableContainer",
      value: function createTableContainer() {
        var container = document.createElement('div');
        addClass(container, 'gg-head-table-container');
        this.container = container;
        var table = this.createTable();
        container.appendChild(table);
        return container;
      }
    }, {
      key: "appendColResizer",
      value: function appendColResizer() {
        var resizerContainer = this.createColResizer();
        resizerContainer.style.height = "".concat(this.height + 2, "px");
        resizerContainer.style.marginTop = "-".concat(this.height + 2, "px");
        this.resizerContainer = resizerContainer;
        this.resizers = this.resizerContainer.querySelectorAll('.gg-resizer');
        this.container.appendChild(resizerContainer);
      }
    }, {
      key: "createColResizer",
      value: function createColResizer() {
        var _this = this;

        var resizer = document.createElement('div');
        addClass(resizer, 'gg-col-resize-container');
        var leftPos = 0;
        var cols = this.colgroup.$el.querySelectorAll('col');
        cols.forEach(function (cg, i) {
          // if (i < cols.length - 1) {
          var col = document.createElement('div');
          addClass(col, 'gg-resizer');
          col.dataset.colIndex = i;
          leftPos += parseInt(cg.width || 0, 10) || 0;
          col.style.left = "".concat(leftPos - 3, "px");
          col.style.height = "".concat(_this.height + 2, "px");
          resizer.appendChild(col); // }
        });
        return resizer;
      }
    }, {
      key: "createTable",
      value: function createTable() {
        var table = document.createElement('table');
        var tbody = this.createTbody();
        var colgroup = this.createColGroup();
        table.appendChild(colgroup.$el);
        table.appendChild(tbody);
        this.table = table;
        return table;
      }
    }, {
      key: "createColGroup",
      value: function createColGroup() {
        var _this$props = this.props,
            target = _this$props.target,
            targetHeight = _this$props.height;
        var hasScroll = targetHeight < this.bodyHeight;
        var colgroup = new ColGroup(_objectSpread$1({
          hasScroll: hasScroll
        }, this.props));
        this.colgroup = colgroup;
        return colgroup;
      }
    }, {
      key: "createSortable",
      value: function createSortable(th, column) {
        if (column.field === 'gg-index' || column.sortable === false) {
          th.innerHTML = column.title;
        } else {
          th.innerHTML = "<button class=\"sort-button\" data-sortable=\"".concat(column.field, "\">").concat(column.title, "</button>");
        }

        return th;
      }
    }, {
      key: "createTbody",
      value: function createTbody() {
        var _this2 = this;

        var tbody = document.createElement('tbody');
        var _this$props2 = this.props,
            columns = _this$props2.columns,
            data = _this$props2.data;
        var tr = document.createElement('tr');
        var fontSize = getComputedStyle(this.props.target)['font-size'];
        var height = parseInt(fontSize, 10) + 20;
        this.bodyHeight = data.length * height;
        columns.forEach(function (column) {
          var th = document.createElement('th');
          th.setAttribute('data-column-name', column.field);
          th.setAttribute('height', "".concat(height, "px"));
          th.style.lineHeight = fontSize;
          tr.appendChild(_this2.createSortable(th, column));
        });
        tbody.appendChild(tr);
        this.tbody = tbody; // height + padding + border

        this.height = height + 2 + 1;
        return tbody;
      }
    }]);

    return Head;
  }(); // import { getValue } from './utils';


  function sortAscending(data, field) {
    data.sort(function (a, b) {
      var aValue = a[field]; // getValue(a, field);

      var bValue = b[field]; // getValue(b, field);

      if (!aValue) return 1;
      if (!bValue) return -1;
      if (aValue > bValue) return 1;
      return -1;
    });
    return data;
  }

  function sortDescending(data, field) {
    data.sort(function (a, b) {
      var aValue = a[field]; // getValue(a, field);

      var bValue = b[field]; // getValue(b, field);

      if (!aValue) return 1;
      if (!bValue) return -1;
      if (aValue > bValue) return -1;
      return 1;
    });
    return data;
  }

  function sortInit(data) {
    data.sort(function (a, b) {
      if (a['gg-origin-index'] > b['gg-origin-index']) return 1;
      return -1;
    });
    return data;
  }

  function sort(data, field, direction) {
    if (direction === 'ascending') {
      return sortAscending(data, field);
    }

    if (direction === 'descending') {
      return sortDescending(data, field);
    }

    return sortInit(data);
  } // const Clusterize = require('clusterize.js');
  // require('intersection-observer');


  var Body =
  /*#__PURE__*/
  function () {
    function Body(props) {
      _classCallCheck(this, Body);

      this.props = props;
      this.virtualPageCount = this.props.virtualPageCount || 8;

      if (this.virtualPageCount > 4) {
        this.virtualScrollTrg = parseInt(this.virtualPageCount / 4, 10);
      } else {
        this.virtualScrollTrg = 1;
      }

      this.fontSize = getComputedStyle(this.props.target)['font-size'];
      this.cellHeight = parseInt(this.fontSize, 10) + 16;
      this.bodyAreaHeight = this.props.data.length * this.cellHeight;
      this.createBodyArea();
      this.setEventHandler();
    }

    _createClass(Body, [{
      key: "createBodyArea",
      value: function createBodyArea() {
        var bodyHeight = this.props.bodyHeight;
        var area = document.createElement('div');
        addClass(area, 'gg-body-area');
        area.style.height = "".concat(bodyHeight, "px");

        if (this.props.scroll.y === false) {
          area.style.overflowY = 'hidden';
        }

        var selectionLayer = this.createSelectionLayer();
        var container = this.createTableContainer();
        var focusLayer = this.createFocusLayer();
        area.appendChild(selectionLayer);
        area.appendChild(container);
        area.appendChild(focusLayer);
        this.$area = area;
        return area;
      }
    }, {
      key: "createTableContainer",
      value: function createTableContainer() {
        var _this$props = this.props,
            bodyHeight = _this$props.bodyHeight,
            data = _this$props.data,
            cellHeight = _this$props.cellHeight;
        var container = document.createElement('div');
        container.style.height = "".concat(cellHeight * data.length, "px");
        addClass(container, 'gg-body-table-container');
        this.container = container;
        var table = this.createTable();
        container.appendChild(table);
        return container;
      }
    }, {
      key: "createTable",
      value: function createTable() {
        var _this$props2 = this.props,
            data = _this$props2.data,
            pagination = _this$props2.pagination,
            cellHeight = _this$props2.cellHeight;
        var table = document.createElement('table');
        var colgroup = this.createColGroup();
        var tbody = this.createTbody();
        var container = this.container;
        this.setTbody(this.getTrArray(data, pagination.perPage, pagination.pageIdx));
        table.appendChild(colgroup.$el);
        table.appendChild(tbody); // table.style.height = `${cellHeight * data.length}px`;

        this.table = table;
        return table;
      }
    }, {
      key: "sortBody",
      value: function sortBody(fields, direction) {
        if (!direction) {
          direction = 'ascending';
        } else if (direction === 'ascending') {
          direction = 'descending';
        } else if (direction === 'descending') {
          direction = undefined;
        }

        var data = sort(this.props.data, fields, direction);
        var pagination = this.props.pagination;
        this.updateTbody(this.getTrArray(data, pagination.perPage, pagination.pageIdx));
        return direction;
      }
    }, {
      key: "setTbody",
      value: function setTbody(data) {
        var tbody = this.tbody;
        tbody.innerHTML = data;
      }
    }, {
      key: "updateTbody",
      value: function updateTbody(data) {
        var tbody = this.tbody;
        tbody.innerHTML = data;
      }
    }, {
      key: "getTrArray",
      value: function getTrArray(data) {
        var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : data.length;
        var pageIdx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var _this$props3 = this.props,
            columns = _this$props3.columns,
            virtualScrolling = _this$props3.virtualScrolling,
            bodyHeight = _this$props3.bodyHeight,
            cellHeight = _this$props3.cellHeight;
        var startIdx = (pageIdx - 1) * perPage;
        var endIdx = pageIdx * perPage - 1;
        var virtualPageCount = this.virtualPageCount;

        if (virtualScrolling) {
          var rowCountPerPage = parseInt(bodyHeight / cellHeight, 10);
          endIdx = rowCountPerPage * virtualPageCount;
          this.rowCountPerPage = rowCountPerPage;
        }

        this.tbody.style.height = "".concat((endIdx + 1) * cellHeight, "px");
        this.startTrIdx = startIdx;
        this.endTrIdx = endIdx;
        return this.createTrs(data, columns, startIdx, endIdx);
      }
    }, {
      key: "createTrs",
      value: function createTrs(data, columns, startIdx, endIdx) {
        var _this = this;

        var result = data.slice(startIdx, endIdx + 1).map(function (row, num) {
          var fixNum = startIdx + num;
          var className = "gg-row-".concat(fixNum % 2 ? 'odd' : 'even');

          var tds = _this.createTd(columns, row, fixNum);

          var style = "height:".concat(_this.cellHeight, "px;");
          return "<tr class=\"".concat(className, "\" style=\"").concat(style, "\" data-row-index=\"").concat(fixNum, "\">").concat(tds, "</tr>");
        });
        return result.join('');
      }
    }, {
      key: "changeDataTrs",
      value: function changeDataTrs(data, columns, startIdx, endIdx) {
        var _this2 = this;

        var trs = this.tbody.querySelectorAll('tr');
        data.slice(startIdx, endIdx + 1).forEach(function (row, num) {
          if (trs[num]) {
            trs[num].dataset.rowIndex = startIdx + num;
            var tds = trs[num].querySelectorAll('td');
            columns.forEach(function (column, cnum) {
              var div = tds[cnum].querySelector('div');
              var value = startIdx + num + 1;

              if (column.field !== 'gg-index') {
                value = _this2.getValue({
                  data: row,
                  field: column.field,
                  valueFunc: column.value,
                  template: column.cellTemplate
                });
              }

              div.innerHTML = value || '';
            });
          }
        });

        if (trs.length < endIdx + 1 - startIdx) {
          var result = this.createTrs(data, columns, startIdx + trs.length, endIdx);
          this.tbody.insertAdjacentHTML('beforeend', result);
        }
      }
    }, {
      key: "upVirtualScroll",
      value: function upVirtualScroll(scrollTop) {
        var _this$props4 = this.props,
            data = _this$props4.data,
            columns = _this$props4.columns;
        var trg = this.virtualScrollTrg;
        var startIdx = parseInt(scrollTop / this.cellHeight, 10) - 1;

        if (startIdx >= this.rowCountPerPage) {
          startIdx -= this.rowCountPerPage;
        }

        if (this.startTrIdx <= 0) return false;

        if (startIdx <= trg) {
          startIdx = 0;
        }

        var endIdx = startIdx + this.rowCountPerPage * this.virtualPageCount;
        var result = this.changeDataTrs(data, columns, startIdx, endIdx);
        this.startTrIdx = startIdx;
        this.endTrIdx = endIdx;
        return true;
      }
    }, {
      key: "downVirtualScroll",
      value: function downVirtualScroll(scrollTop) {
        var _this$props5 = this.props,
            data = _this$props5.data,
            columns = _this$props5.columns;
        var trg = this.virtualScrollTrg;
        var startIdx = parseInt(scrollTop / this.cellHeight, 10) - 1;

        if (startIdx >= this.rowCountPerPage) {
          startIdx -= this.rowCountPerPage;
        }

        var endIdx = startIdx + this.rowCountPerPage * this.virtualPageCount;
        if (this.endTrIdx >= data.length) return false;

        if (data.length - endIdx <= this.rowCountPerPage * trg) {
          endIdx = data.length;
        }

        var result = this.changeDataTrs(data, columns, startIdx, endIdx);
        this.startTrIdx = startIdx;
        this.endTrIdx = endIdx;
        return true;
      }
    }, {
      key: "changeTablePosition",
      value: function changeTablePosition(pos) {
        this.table.style.transform = "translateY(".concat(pos, "px)");
      }
    }, {
      key: "initVirtualScroll",
      value: function initVirtualScroll() {
        var data = this.props.data;
        this.$area.scrollTop = 0;
        this.changeTablePosition(0);
        this.setTbody(this.getTrArray(data, 1, 1));
      }
    }, {
      key: "createColGroup",
      value: function createColGroup() {
        var _this$props6 = this.props,
            target = _this$props6.target,
            targetHeight = _this$props6.height;
        var hasScroll = targetHeight < this.bodyAreaHeight;
        var colgroup = new ColGroup(_objectSpread$1({
          hasScroll: hasScroll
        }, this.props));
        this.colgroup = colgroup;
        this.cols = this.colgroup.$el.querySelectorAll('col');
        return colgroup;
      }
    }, {
      key: "getValue",
      value: function getValue(_ref) {
        var data = _ref.data,
            field = _ref.field,
            valueFunc = _ref.valueFunc,
            template = _ref.template;
        var value = data[field];

        if (valueFunc) {
          value = valueFunc(value);
        }

        if (template) {
          return template(value);
        }

        return value;
      }
    }, {
      key: "getCell",
      value: function getCell(_ref2) {
        var value = _ref2.value,
            data = _ref2.data,
            field = _ref2.field,
            valueFunc = _ref2.valueFunc,
            template = _ref2.template;
        var div = '';

        if (!value) {
          value = this.getValue({
            data: data,
            field: field,
            valueFunc: valueFunc,
            template: template
          });
        }

        if (value === 0) {
          div = "<div>".concat(value, "</div>");
        } else {
          div = "<div>".concat(value || '', "</div>");
        }

        return div;
      }
    }, {
      key: "createTbody",
      value: function createTbody() {
        var tbody = document.createElement('tbody');
        this.tbody = tbody;
        return tbody;
      }
    }, {
      key: "createTd",
      value: function createTd(columns, row, i) {
        var _this3 = this;

        var tds = '';
        columns.forEach(function (column, idx) {
          var td = '';
          var value = column.value;
          var cell = '';
          var dataSetColumnName = "data-column-name=\"".concat(column.field, "\"");
          var style = '';

          if (column.align) {
            style += "text-align:".concat(column.align, ";");
          }

          style += "line-height:".concat(_this3.fontSize, ";height:").concat(_this3.cellHeight, "px;width:").concat(_this3.cols[idx].width, "px;");

          if (column.field === 'gg-index') {
            value = i + 1;
            cell = _this3.getCell({
              value: value,
              valueFunc: column.value,
              template: column.cellTemplate
            });
          } else {
            cell = _this3.getCell({
              data: row,
              field: column.field,
              valueFunc: column.value,
              template: column.cellTemplate
            });
          }

          td = "<td class=\"gg-cell\" style=\"".concat(style, "\" ").concat(dataSetColumnName, ">").concat(cell, "</td>"); // td.appendChild(cell);

          tds += td;
        });
        return tds;
      }
    }, {
      key: "gotoPageOfBody",
      value: function gotoPageOfBody(idx) {
        this.updateTbody(this.getTrArray(this.props.data, this.props.pagination.perPage, idx));
      }
    }, {
      key: "getCellInfo",
      value: function getCellInfo(cell, cols) {
        var columnName = cell.dataset.columnName;
        var rowIndex = cell.parentNode.dataset.rowIndex * 1;
        var colIndex = 0;

        var left = _toConsumableArray(cols).slice(0).reduce(function (acc, col, i, arr) {
          if (col.dataset.columnName === columnName) {
            arr.splice(1);
            colIndex = i;
            return acc;
          } else {
            var w = parseInt(col.getAttribute('width'), 10);
            return acc + w;
          }
        }, 0);

        return {
          left: left,
          top: rowIndex * cell.offsetHeight,
          width: cell.offsetWidth,
          height: cell.offsetHeight,
          row: rowIndex,
          col: colIndex
        };
      }
    }, {
      key: "getCellElementByIndex",
      value: function getCellElementByIndex(_ref3) {
        var row = _ref3.row,
            col = _ref3.col;
        return this.tbody.querySelectorAll("[data-row-index=\"".concat(row, "\"] td"))[col];
      }
    }, {
      key: "createSelectionLayer",
      value: function createSelectionLayer() {
        this.selectionLayer = document.createElement('div');
        addClass(this.selectionLayer, 'gg-selection-layer');
        return this.selectionLayer;
      }
    }, {
      key: "createFocusLayer",
      value: function createFocusLayer() {
        this.focusLayer = document.createElement('div');
        addClass(this.focusLayer, 'gg-focus-layer');
        return this.focusLayer;
      }
    }, {
      key: "createFocusLine",
      value: function createFocusLine() {
        this.focusLayer.innerHTML = '';
        this.focusLayer.innerHTML += "<div class=\"gg-focus-line\"></div>";
        this.focusLayer.innerHTML += "<div class=\"gg-focus-line\"></div>";
        this.focusLayer.innerHTML += "<div class=\"gg-focus-line\"></div>";
        this.focusLayer.innerHTML += "<div class=\"gg-focus-line\"></div>";
      }
    }, {
      key: "resetFocusLayerPosition",
      value: function resetFocusLayerPosition(_ref4) {
        var _ref4$vectorPointX = _ref4.vectorPointX,
            vectorPointX = _ref4$vectorPointX === void 0 ? 0 : _ref4$vectorPointX;
        var focusLayer = this.focusLayer;
        var left = parseInt(focusLayer.childNodes[0].style.left, 10);
        var newLeft = left + vectorPointX;
        var leftOfRightLine = parseInt(focusLayer.childNodes[1].style.left, 10);
        focusLayer.childNodes[0].style.left = "".concat(newLeft, "px");
        focusLayer.childNodes[1].style.left = "".concat(leftOfRightLine + vectorPointX, "px");
        focusLayer.childNodes[2].style.left = "".concat(newLeft, "px");
        focusLayer.childNodes[3].style.left = "".concat(newLeft, "px");
      }
    }, {
      key: "resetFocusLayerSize",
      value: function resetFocusLayerSize(_ref5) {
        var _ref5$vectorPointX = _ref5.vectorPointX,
            vectorPointX = _ref5$vectorPointX === void 0 ? 0 : _ref5$vectorPointX;
        var focusLayer = this.focusLayer;
        var width = parseInt(focusLayer.childNodes[0].style.width, 10);
        var left = parseInt(focusLayer.childNodes[1].style.left, 10);
        focusLayer.childNodes[0].style.width = "".concat(width + vectorPointX, "px");
        focusLayer.childNodes[1].style.left = "".concat(left + vectorPointX, "px");
        focusLayer.childNodes[2].style.width = "".concat(width + vectorPointX, "px");
      }
    }, {
      key: "showFocusLayer",
      value: function showFocusLayer(_ref6) {
        var left = _ref6.left,
            top = _ref6.top,
            width = _ref6.width,
            height = _ref6.height;
        var focusLayer = this.focusLayer;

        if (this.focusLayer.childNodes.length !== 4) {
          this.createFocusLine();
        } // top


        focusLayer.childNodes[0].style.left = "".concat(left, "px");
        focusLayer.childNodes[0].style.top = "".concat(top, "px");
        focusLayer.childNodes[0].style.height = "1px";
        focusLayer.childNodes[0].style.width = "".concat(width, "px"); // right

        focusLayer.childNodes[1].style.left = "".concat(left + width, "px");
        focusLayer.childNodes[1].style.top = "".concat(top, "px");
        focusLayer.childNodes[1].style.height = "".concat(height, "px");
        focusLayer.childNodes[1].style.width = "1px"; // bottom

        focusLayer.childNodes[2].style.left = "".concat(left, "px");
        focusLayer.childNodes[2].style.top = "".concat(top + height, "px");
        focusLayer.childNodes[2].style.height = "1px";
        focusLayer.childNodes[2].style.width = "".concat(width, "px"); // left

        focusLayer.childNodes[3].style.left = "".concat(left, "px");
        focusLayer.childNodes[3].style.top = "".concat(top, "px");
        focusLayer.childNodes[3].style.height = "".concat(height, "px");
        focusLayer.childNodes[3].style.width = "1px";
        addClass(focusLayer, 'active');
      }
    }, {
      key: "hideFocusLayer",
      value: function hideFocusLayer() {
        removeClass(this.focusLayer, 'active');
      }
    }, {
      key: "startSelect",
      value: function startSelect(elm) {
        var event = new CustomEvent('startSelectEvt', {
          detail: {
            elm: elm
          }
        });
        this.tbody.dispatchEvent(event);
      }
    }, {
      key: "startSelectByRowColumn",
      value: function startSelectByRowColumn(_ref7) {
        var row = _ref7.row,
            col = _ref7.col;
        var elm = this.getCellElementByIndex({
          row: row,
          col: col
        });
        this.startSelect(elm);
      }
    }, {
      key: "selectCell",
      value: function selectCell(elm) {
        if (this.selectionStartCell && this.selectionEndCell !== elm) {
          var event = new CustomEvent('selectCellEvt', {
            detail: {
              elm: elm
            }
          });
          this.tbody.dispatchEvent(event);
        }
      }
    }, {
      key: "selectCellByRowColumn",
      value: function selectCellByRowColumn(_ref8) {
        var row = _ref8.row,
            col = _ref8.col;
        var elm = this.getCellElementByIndex({
          row: row,
          col: col
        });
        this.selectCell(elm);
      }
    }, {
      key: "resetSelectionLayerPosition",
      value: function resetSelectionLayerPosition(_ref9) {
        var vectorPointX = _ref9.vectorPointX;
        var selectionLayer = this.selectionLayer;
        var left = parseInt(selectionLayer.style.left, 10);
        selectionLayer.style.left = "".concat(left + vectorPointX, "px");
      }
    }, {
      key: "resetSelectionLayerSize",
      value: function resetSelectionLayerSize(_ref10) {
        var vectorPointX = _ref10.vectorPointX;
        var selectionLayer = this.selectionLayer;
        var width = parseInt(selectionLayer.style.width, 10);
        selectionLayer.style.width = "".concat(width + vectorPointX, "px");
      }
    }, {
      key: "setSelectionLayerPosition",
      value: function setSelectionLayerPosition(_ref11) {
        var left = _ref11.left,
            width = _ref11.width,
            top = _ref11.top,
            height = _ref11.height;
        var selectionLayer = this.selectionLayer;
        selectionLayer.style.top = "".concat(top, "px");
        selectionLayer.style.height = "".concat(height, "px");
        selectionLayer.style.left = "".concat(left, "px");
        selectionLayer.style.width = "".concat(width, "px");
      }
    }, {
      key: "setFocusIndex",
      value: function setFocusIndex(_ref12) {
        var row = _ref12.row,
            col = _ref12.col;
        this.focusIndex = {
          row: row,
          col: col
        };
      }
    }, {
      key: "setSelectionIndex",
      value: function setSelectionIndex(_ref13) {
        var sRow = _ref13.sRow,
            sCol = _ref13.sCol,
            eRow = _ref13.eRow,
            eCol = _ref13.eCol;
        this.selectionIndex = {
          sRow: sRow,
          sCol: sCol,
          eRow: eRow,
          eCol: eCol
        };
      }
    }, {
      key: "getSelectionData",
      value: function getSelectionData() {
        if (!this.selectionIndex) return [];
        var _this$selectionIndex = this.selectionIndex,
            sRow = _this$selectionIndex.sRow,
            sCol = _this$selectionIndex.sCol,
            eRow = _this$selectionIndex.eRow,
            eCol = _this$selectionIndex.eCol;
        var data = [];

        for (var i = sRow; i <= eRow; i++) {
          var row = [];

          for (var j = sCol; j <= eCol; j++) {
            var elm = this.getCellElementByIndex({
              row: i,
              col: j
            });
            row.push(elm.textContent);
          }

          data.push(row);
        }

        return data;
      }
    }, {
      key: "showSelection",
      value: function showSelection() {
        var cols = this.props.head.colgroup.$el.querySelectorAll('col');
        var selectionStartCell = this.selectionStartCell,
            selectionEndCell = this.selectionEndCell,
            selectionLayer = this.selectionLayer;
        var startCellInfo = this.getCellInfo(selectionStartCell, cols);
        var endCellInfo = this.getCellInfo(selectionEndCell, cols);
        var left, top, width, height, sRow, sCol, eRow, eCol;

        if (startCellInfo.left <= endCellInfo.left) {
          left = startCellInfo.left;
          width = endCellInfo.left - startCellInfo.left + endCellInfo.width;
          sCol = startCellInfo.col;
          eCol = endCellInfo.col;
        } else {
          left = endCellInfo.left;
          width = startCellInfo.left - endCellInfo.left + startCellInfo.width;
          sCol = endCellInfo.col;
          eCol = startCellInfo.col;
        }

        if (startCellInfo.top <= endCellInfo.top) {
          top = startCellInfo.top;
          height = endCellInfo.top - startCellInfo.top + endCellInfo.height;
          sRow = startCellInfo.row;
          eRow = endCellInfo.row;
        } else {
          top = endCellInfo.top;
          height = startCellInfo.top - endCellInfo.top + startCellInfo.height;
          sRow = endCellInfo.row;
          eRow = startCellInfo.row;
        }

        this.setSelectionLayerPosition({
          left: left,
          top: top,
          width: width,
          height: height
        });
        this.setSelectionIndex({
          sRow: sRow,
          sCol: sCol,
          eRow: eRow,
          eCol: eCol
        });
        addClass(selectionLayer, 'active');
      }
    }, {
      key: "hideSelectionLayer",
      value: function hideSelectionLayer() {
        this.selectionStartCell = null;
        this.selectionEndCell = null;
        removeClass(this.selectionLayer, 'active');
      }
    }, {
      key: "setEventHandler",
      value: function setEventHandler() {
        var _this4 = this;

        this.tbody.addEventListener('startSelectEvt', function (e) {
          _this4.selectionStartCell = e.detail.elm;
        });
        this.tbody.addEventListener('selectCellEvt', function (e) {
          _this4.selectionEndCell = e.detail.elm;

          _this4.showSelection();
        });
      }
    }, {
      key: "setFocusLayer",
      value: function setFocusLayer(elm) {
        var cols = this.props.head.colgroup.$el.querySelectorAll('col');

        var _this$getCellInfo = this.getCellInfo(elm, cols),
            left = _this$getCellInfo.left,
            top = _this$getCellInfo.top,
            width = _this$getCellInfo.width,
            height = _this$getCellInfo.height,
            row = _this$getCellInfo.row,
            col = _this$getCellInfo.col;

        this.showFocusLayer({
          left: left,
          top: top,
          width: width,
          height: height
        });
        this.setFocusIndex({
          row: row,
          col: col
        });
        this.setSelectionIndex({
          sRow: row,
          sCol: col,
          eRow: row,
          eCol: col
        });
        return {
          left: left,
          top: top,
          width: width,
          height: height,
          row: row,
          col: col
        };
      }
    }]);

    return Body;
  }();

  var Side =
  /*#__PURE__*/
  function () {
    function Side(props) {
      _classCallCheck(this, Side);

      this.props = props;
      var targetHeight = this.props.height;
      this.scroll = {
        x: false,
        y: false
      };
      var fontSize = getComputedStyle(this.props.target)['font-size'];
      var cellHeight = parseInt(fontSize, 10) + 16;
      this.cellHeight = cellHeight;

      if (targetHeight) {
        this.bodyHeight = targetHeight - 40; // head height 40px

        if (this.bodyHeight < this.props.pagination.perPage * cellHeight + this.getScrollAreaHeight()) {
          this.scroll.y = true;
        }
      } else {
        this.bodyHeight = this.props.pagination.perPage * cellHeight + this.getScrollAreaHeight();
      }

      this.createSide();
    }

    _createClass(Side, [{
      key: "setWidth",
      value: function setWidth(value) {
        this.$side.style.width = "".concat(value, "px");
        this.width = value;
      }
    }, {
      key: "setMarginLeft",
      value: function setMarginLeft(value) {
        this.$side.style.marginLeft = "".concat(value, "px");
        this.marginLeft = value;
      }
    }, {
      key: "getScrollAreaHeight",
      value: function getScrollAreaHeight() {
        if (this.props.scroll.x === false) {
          return 1;
        }

        return 16;
      }
    }, {
      key: "createHead",
      value: function createHead() {
        this.head = new Head(_objectSpread$1({}, this.props));
        this.head.appendColResizer();
        return this.head;
      }
    }, {
      key: "createGuideLine",
      value: function createGuideLine() {
        this.guideLine = document.createElement('div');
        addClass(this.guideLine, 'gg-guide-line');
        return this.guideLine;
      }
    }, {
      key: "createBody",
      value: function createBody() {
        this.body = new Body(_objectSpread$1({}, this.props, {
          bodyHeight: this.bodyHeight,
          cellHeight: this.cellHeight,
          head: this.head
        }));
        return this.body;
      }
    }, {
      key: "gotoPageOfBody",
      value: function gotoPageOfBody(idx) {
        this.body.gotoPage(idx);
      }
    }, {
      key: "createSide",
      value: function createSide() {
        var side = document.createElement('div');
        addClass(side, 'gg-side');
        this.$side = side;
        this.$side.appendChild(this.createHead().$area);
        this.$side.appendChild(this.createBody().$area);
        this.$side.appendChild(this.createGuideLine());
      }
    }, {
      key: "sortEventHandler",
      value: function sortEventHandler(lSide, rSide, callback) {
        var lSideHead = lSide.head;
        var rSideHead = rSide.head;
        var lSideBody = lSide.body;
        var rSideBody = rSide.body;
        this.head.$area.addEventListener('click', function (e) {
          if (e.target.hasAttribute('data-sortable')) {
            var direction = lSideBody.sortBody(e.target.dataset.sortable, e.target.dataset.sortdirection);
            rSideBody.sortBody(e.target.dataset.sortable, e.target.dataset.sortdirection);
            var sortedLcolumn = lSideHead.$area.querySelector('.sort-button[data-sortdirection]');
            if (sortedLcolumn) delete sortedLcolumn.dataset.sortdirection;
            var sortedRcolumn = rSideHead.$area.querySelector('.sort-button[data-sortdirection]');
            if (sortedRcolumn) delete sortedRcolumn.dataset.sortdirection;

            if (direction) {
              e.target.dataset.sortdirection = direction;
            } else {
              delete e.target.dataset.sortdirection;
            }

            callback();
          }
        });
      }
    }, {
      key: "scrollEventHandler",
      value: function scrollEventHandler(side) {
        var _this = this;

        var timeout;
        var cntHeight = parseInt(this.body.container.style.height, 10);
        var bScrollTop = 0;
        var cHeight = this.cellHeight;
        var rCount = this.body.rowCountPerPage;
        var trg = parseInt(this.body.virtualPageCount / 2, 10);

        var changePosition = function changePosition() {
          var tbodyHeight = getComputedStyle(_this.body.tbody)['height'];
          var scrollPos = _this.body.startTrIdx * cHeight;

          if (tbodyHeight + scrollPos >= cntHeight) {
            _this.body.changeTablePosition(cntHeight - tbodyHeight);

            side.body.changeTablePosition(cntHeight - tbodyHeight);
          } else {
            _this.body.changeTablePosition(scrollPos);

            side.body.changeTablePosition(scrollPos);
            _this.body.table.style.transform = 'translateY(' + scrollPos + 'px)';
            side.body.table.style.transform = 'translateY(' + scrollPos + 'px)';
          }
        };

        this.scrollListener = function (e) {
          clearTimeout(timeout);
          side.removeScrollEventHandler();
          var changed = false;
          var source = e.target;
          var headArea = _this.head.$area;
          var scrollTop = source.scrollTop;
          headArea.scrollTo(source.scrollLeft, 0);
          if (bScrollTop === scrollTop) return;
          side.body.$area.scrollTop = scrollTop;

          if (bScrollTop < scrollTop) {
            // down
            if (scrollTop >= cHeight * (_this.body.endTrIdx - rCount * trg)) {
              changed = _this.body.downVirtualScroll(scrollTop);
              side.body.downVirtualScroll(scrollTop);
            }
          } else {
            // up
            if (scrollTop <= cHeight * (_this.body.startTrIdx + rCount * trg)) {
              changed = _this.body.upVirtualScroll(scrollTop);
              side.body.upVirtualScroll(scrollTop);
            }
          }

          bScrollTop = scrollTop;
          if (changed) changePosition();
          timeout = setTimeout(function () {
            side.body.$area.addEventListener('scroll', side.scrollListener);
          }, 100);
        };

        this.removeScrollEventHandler();
        this.body.$area.addEventListener('scroll', this.scrollListener);
      }
    }, {
      key: "removeScrollEventHandler",
      value: function removeScrollEventHandler() {
        this.body.$area.removeEventListener('scroll', this.scrollListener);
      }
    }, {
      key: "resizeMouseDown",
      value: function resizeMouseDown(target, startPointX) {
        var head = this.head,
            body = this.body;
        var isResizer = hasClass(target, 'gg-resizer');

        if (isResizer && !head.resizableColumnWidth) {
          head.resizeTarget = target;
          head.headCols = head.colgroup.$el.querySelectorAll('col');
          head.bodyCols = body.colgroup.$el.querySelectorAll('col');
          head.resizeColIdx = parseInt(head.resizeTarget.dataset.colIndex, 0);
          head.resizableColumnWidth = true;
          head.startColLeft = [].map.call(head.resizerContainer.querySelectorAll('.gg-resizer'), function (rs) {
            return parseInt(rs.style.left, 10);
          });
          head.startColWidth = parseInt(head.headCols[target.dataset.colIndex].getAttribute('width'), 10);
          head.startPointX = startPointX;
          return head.startColLeft[head.resizeColIdx] + 3;
        }
      }
    }, {
      key: "resizeClear",
      value: function resizeClear() {
        var head = this.head;
        head.resizableColumnWidth = false;
        head.startColWidth = 0;
        head.startColLeft = [];
        head.resizeTarget = null;
        this.setWidth(parseInt(this.$side.style.width, 10));
      }
    }, {
      key: "moveGuideLine",
      value: function moveGuideLine(pointX, rSide) {
        var head = this.head;

        if (head.resizableColumnWidth) {
          var vectorPointX = pointX - head.startPointX;
          var resizeColIdx = head.resizeColIdx; // 가이드 위치

          return vectorPointX + head.startColLeft[resizeColIdx] + 3;
        }
      }
    }, {
      key: "resizeColumns",
      value: function resizeColumns(pointX, rSide) {
        var head = this.head;

        if (head.resizableColumnWidth) {
          var vectorPointX = pointX - head.startPointX;
          var resizeColIdx = head.resizeColIdx; // 리사이저 위치

          this.resizeColumnsWithVectorPointX(vectorPointX, resizeColIdx, rSide);
        }
      }
    }, {
      key: "resizeColumnsWithVectorPointX",
      value: function resizeColumnsWithVectorPointX(vectorPointX, resizeColIdx, rSide) {
        var head = this.head,
            $side = this.$side,
            width = this.width;
        var headCols = head.headCols,
            bodyCols = head.bodyCols;
        var newWidth = head.startColWidth + vectorPointX;
        if (newWidth <= 0) return;
        head.resizers.forEach(function (rs, i) {
          if (i >= resizeColIdx) {
            rs.style.left = "".concat(head.startColLeft[i] + vectorPointX, "px");
          }
        });

        if (rSide) {
          $side.style.width = "".concat(width + vectorPointX, "px");
          rSide.setMarginLeft(parseInt($side.style.width, 10));
        } // 헤더 컬럼


        headCols[resizeColIdx].setAttribute('width', newWidth); // 본문 컬럼

        bodyCols[resizeColIdx].setAttribute('width', newWidth);

        if (this.body.focusIndex) {
          if (this.body.focusIndex.col > resizeColIdx) {
            this.body.resetFocusLayerPosition({
              vectorPointX: vectorPointX
            });
          } else if (this.body.focusIndex.col === resizeColIdx) {
            this.body.resetFocusLayerSize({
              vectorPointX: vectorPointX
            });
          }
        }

        if (this.body.selectionIndex) {
          if (this.body.selectionIndex.sCol > resizeColIdx) {
            this.body.resetSelectionLayerPosition({
              vectorPointX: vectorPointX
            });
          } else if (this.body.selectionIndex.sCol <= resizeColIdx && this.body.selectionIndex.eCol >= resizeColIdx) {
            this.body.resetSelectionLayerSize({
              vectorPointX: vectorPointX
            });
          }
        }
      }
    }, {
      key: "autoFitWidth",
      value: function autoFitWidth(target, rSide) {
        var head = this.head,
            body = this.body;
        var colIndex = target.dataset.colIndex;
        var trs = body.table.querySelectorAll('tr');

        var scrollWidths = _toConsumableArray(trs).map(function (tr) {
          return tr.querySelectorAll('td')[colIndex].querySelector('div').scrollWidth;
        });

        var maxWidth = Math.max.apply(null, scrollWidths);
        head.headCols = head.colgroup.$el.querySelectorAll('col');
        head.bodyCols = body.colgroup.$el.querySelectorAll('col');
        var width = head.bodyCols[colIndex].getAttribute('width');
        head.startColWidth = parseInt(head.headCols[colIndex].getAttribute('width'), 10);
        head.startColLeft = [].map.call(head.resizerContainer.querySelectorAll('.gg-resizer'), function (rs) {
          return parseInt(rs.style.left, 10);
        });

        if (maxWidth > width) {
          this.resizeColumnsWithVectorPointX(maxWidth - width + 10, colIndex, rSide);
        }

        this.resizeClear();
      } // 부모 노드에서 tr찾아 반환.

    }, {
      key: "getTr",
      value: function getTr(src) {
        var parent = src.parentNode;

        while (true) {
          if (parent == null) {
            return src;
          }

          if (parent.nodeName === 'TR') {
            return parent;
          }

          parent = parent.parentNode;
        }
      }
    }, {
      key: "hoverEventHandler",
      value: function hoverEventHandler(side) {
        var _this2 = this;

        var changeBackgroundColorOfTr = function changeBackgroundColorOfTr(e) {
          var tgt = _this2.getTr(e.target);

          if (tgt.nodeName === 'TR') {
            if (hasClass(tgt, 'hover')) {
              if (side) removeClass(side.body.tbody.querySelectorAll('tr')[tgt.rowIndex], 'hover');
              removeClass(tgt, 'hover');
            } else {
              if (side) addClass(side.body.tbody.querySelectorAll('tr')[tgt.rowIndex], 'hover');
              addClass(tgt, 'hover');
            }
          }
        };

        this.body.$area.addEventListener('mouseover', changeBackgroundColorOfTr);
        this.body.$area.addEventListener('mouseout', changeBackgroundColorOfTr);
      }
    }, {
      key: "setFocusLayer",
      value: function setFocusLayer(elm) {
        this.body.setFocusLayer(elm);
      }
    }, {
      key: "unsetFocusLayer",
      value: function unsetFocusLayer() {
        this.body.hideFocusLayer();
      }
    }, {
      key: "unsetSelectionLayer",
      value: function unsetSelectionLayer() {
        this.body.hideSelectionLayer();
      }
    }, {
      key: "startSelectFromOtherSide",
      value: function startSelectFromOtherSide(elm) {
        var cols = this.head.colgroup.$el.querySelectorAll('col');

        if (this.props.side === 'left') {
          var row = elm.parentNode.dataset.rowIndex;
          var col = cols.length - 1;
          this.body.startSelectByRowColumn({
            row: row,
            col: col
          });
        } else {
          var _row = elm.parentNode.dataset.rowIndex;
          var _col = 0;
          this.body.startSelectByRowColumn({
            row: _row,
            col: _col
          });
        }
      }
    }, {
      key: "selectCellInOtherSide",
      value: function selectCellInOtherSide(elm) {
        var cols = this.head.colgroup.$el.querySelectorAll('col');

        if (this.props.side === 'left') {
          var row = elm.parentNode.dataset.rowIndex;
          var col = cols.length - 1;
          this.body.selectCellByRowColumn({
            row: row,
            col: col
          });
        } else {
          var _row2 = elm.parentNode.dataset.rowIndex;
          var _col2 = 0;
          this.body.selectCellByRowColumn({
            row: _row2,
            col: _col2
          });
        }
      }
    }]);

    return Side;
  }();

  var Pagination =
  /*#__PURE__*/
  function () {
    function Pagination(props) {
      _classCallCheck(this, Pagination);

      this.props = props;
      this.visiblePages = 5;
      this.$area = this.createPaginationArea();
      this.createPageButtonGroup();
      this.setEventHandler();
    }

    _createClass(Pagination, [{
      key: "createPaginationArea",
      value: function createPaginationArea() {
        var paginationArea = document.createElement('div');
        addClass(paginationArea, 'gg-pagination-area');
        return paginationArea;
      }
    }, {
      key: "createPageButtons",
      value: function createPageButtons(pageCount, pageIdx, area) {
        var buttonsHTML = '';
        var visibleIndex = this.getVisibleIndex(pageCount, this.visiblePages, pageIdx);
        this.visibleIndex = visibleIndex;
        this.pageIndex = pageIdx;
        visibleIndex.forEach(function (i) {
          var classNames = 'gg-page-btn';

          if (i === pageIdx) {
            classNames += ' gg-is-selected';
            buttonsHTML += "<span class=\"".concat(classNames, "\" data-page-index=").concat(i, ">").concat(i, "</span>");
          } else {
            buttonsHTML += "<a href=\"#\" class=\"".concat(classNames, "\" data-page-index=").concat(i, ">").concat(i, "</a>");
          }
        }); // 이전 페이지네이션 버튼

        if (visibleIndex[0] > 1) {
          buttonsHTML = "<a href=\"#\" class=\"gg-page-btn gg-prev-ellip\" data-page-goto=\"prev-ellip\"><span class=\"gg-ico-ellip\">...</span></a>".concat(buttonsHTML);
        } else {
          buttonsHTML = "<span class=\"gg-page-btn gg-prev-ellip gg-is-disabled\"><span class=\"gg-ico-ellip\">...</span><span class=\"gg-is-disabled-mask\"></span></span>".concat(buttonsHTML);
        } // 다음 페이지네이션 버튼


        if (visibleIndex[visibleIndex.length - 1] < pageCount) {
          buttonsHTML += '<a href="#" class="gg-page-btn gg-next-ellip" data-page-goto="next-ellip"><span class="gg-ico-ellip">...</span></a>';
        } else {
          buttonsHTML += '<span class="gg-page-btn gg-next-ellip gg-is-disabled"><span class="gg-ico-ellip">...</span><span class="gg-is-disabled-mask"></span></span>';
        }

        if (pageIdx === 1) {
          buttonsHTML = "<span class=\"gg-page-btn gg-is-disabled gg-first\"><span class=\"gg-ico-first\">first</span><span class=\"gg-is-disabled-mask\"></span></span><span class=\"gg-page-btn gg-is-disabled gg-prev\"><span class=\"gg-ico-prev\">prev</span><span class=\"gg-is-disabled-mask\"></span></span>".concat(buttonsHTML);
        } else {
          buttonsHTML = "<a href=\"#\" class=\"gg-page-btn gg-first\" data-page-goto=\"first\"><span class=\"gg-ico-first\">first</span></a><a href=\"#\" class=\"gg-page-btn gg-prev\" data-page-goto=\"prev\"><span class=\"gg-ico-prev\">prev</span></a>".concat(buttonsHTML);
        }

        if (pageIdx === pageCount) {
          buttonsHTML = "".concat(buttonsHTML, "<span class=\"gg-page-btn gg-is-disabled gg-next\"><span class=\"gg-ico-next\">next</span><span class=\"gg-is-disabled-mask\"></span></span><span class=\"gg-page-btn gg-is-disabled gg-last\"><span class=\"gg-ico-last\">last</span><span class=\"gg-is-disabled-mask\"></span></span>");
        } else {
          buttonsHTML = "".concat(buttonsHTML, "<a href=\"#\" class=\"gg-page-btn gg-next\" data-page-goto=\"next\"><span class=\"gg-ico-next\">next</span></a><a href=\"#\" class=\"gg-page-btn gg-last\" data-page-goto=\"last\"><span class=\"gg-ico-last\">last</span></a>");
        }

        area.innerHTML = buttonsHTML;
      }
    }, {
      key: "createPageButtonGroup",
      value: function createPageButtonGroup() {
        var _this$props = this.props,
            rowCount = _this$props.rowCount,
            perPage = _this$props.perPage,
            pageIdx = _this$props.pageIdx;
        var pageCount = rowCount % perPage === 0 ? rowCount / perPage : Math.ceil(rowCount / perPage);
        this.pageCount = pageCount;
        this.createPageButtons(pageCount, pageIdx, this.$area);
      }
    }, {
      key: "getVisibleIndex",
      value: function getVisibleIndex(pageCount, visibleCount, curIndex) {
        var start;
        var end;
        var stdMiddle = Math.floor(visibleCount / 2);
        start = curIndex - stdMiddle;
        end = curIndex + stdMiddle;

        if (start <= 0) {
          end += 1 - start;
          start += 1 - start;
        }

        if (end > pageCount) {
          start -= end - pageCount;
          end -= end - pageCount;
        }

        var result = [];

        for (var index = start; index <= end; index += 1) {
          result.push(index);
        }

        return result;
      }
    }, {
      key: "initPageButtons",
      value: function initPageButtons() {
        this.createPageButtons(this.pageCount, 1, this.$area);
      }
    }, {
      key: "detectPageButtonOnClick",
      value: function detectPageButtonOnClick(target) {
        var elm = target;

        while (elm) {
          if (hasClass(elm, 'gg-page-btn')) {
            return elm;
          }

          elm = elm.parentNode;
        }

        return false;
      }
    }, {
      key: "setEventHandler",
      value: function setEventHandler() {
        var _this = this;

        this.$area.addEventListener('click', function (e) {
          e.preventDefault();
          var target = hasClassInParents(e.target, 'gg-page-btn');

          if (target) {
            if (target.dataset.pageIndex) {
              _this.createPageButtons(_this.pageCount, parseInt(target.dataset.pageIndex, 10), _this.$area);

              _this.props.callback(target.dataset.pageIndex);
            } else {
              var pageGoto = target.dataset.pageGoto;
              var pageIndex = 1;

              if (pageGoto) {
                var middleIndex = Math.floor(_this.visibleIndex.length / 2);

                switch (pageGoto) {
                  case 'first':
                    pageIndex = 1;
                    break;

                  case 'prev':
                    pageIndex = _this.pageIndex - 1;
                    break;

                  case 'prev-ellip':
                    pageIndex = _this.visibleIndex[middleIndex] - _this.visiblePages;

                    if (pageIndex < 0) {
                      pageIndex = 1;
                    }

                    break;

                  case 'next-ellip':
                    pageIndex = _this.visibleIndex[middleIndex] + _this.visiblePages;

                    if (pageIndex > _this.pageCount) {
                      pageIndex = _this.pageCount;
                    }

                    break;

                  case 'next':
                    pageIndex = _this.pageIndex + 1;
                    break;

                  case 'last':
                    pageIndex = _this.pageCount;
                    break;

                  default:
                    break;
                }

                _this.createPageButtons(_this.pageCount, parseInt(pageIndex, 10), _this.$area);

                _this.props.callback(pageIndex);
              }
            }
          }
        });
      }
    }]);

    return Pagination;
  }();

  var defaultProps = {
    pagination: {
      view: false,
      pageIdx: 1,
      perPage: 1
    }
  };
  var defaultColumnProps = {
    sortable: true
  };

  var GG =
  /*#__PURE__*/
  function () {
    function GG(props$1) {
      _classCallCheck(this, GG);

      this.init(props$1);
      if (!props(this.props)) return;
      var target = this.props.target;
      addClass(target, 'gg');

      var _this$splitColumns = this.splitColumns(),
          lSideColumns = _this$splitColumns.lSideColumns,
          rSideColumns = _this$splitColumns.rSideColumns;

      this.lSideColumns = lSideColumns;
      this.rSideColumns = rSideColumns;
      this.createContainer();
      this.createLside();
      this.createRside();
      this.createBorderLine();
      this.setEventHandler();
      this.createPagination();
      this.createGuideLine();
      this.drawContainer();
    }

    _createClass(GG, [{
      key: "init",
      value: function init(props) {
        if (props && props.columns) props.columns = props.columns.map(function (col) {
          return _objectSpread$1({}, defaultColumnProps, col);
        });
        if (props && props.data) props.data = props.data.map(function (d, i) {
          return _objectSpread$1({}, d, {
            'gg-origin-index': i
          });
        });
        if (props && props.pagination) props.pagination = _objectSpread$1({}, defaultProps.pagination, props.pagination);

        if (props && props.pagination && props.virtualScrolling) {
          throw new Error('not set pagination with virtualScrolling');
        }

        this.props = _objectSpread$1({}, defaultProps, props);
      }
    }, {
      key: "createRside",
      value: function createRside() {
        var rSideColumns = this.rSideColumns;
        var rSideProps = Object.assign({}, this.props, {
          columns: rSideColumns,
          side: 'right'
        });
        this.rSide = new Side(_objectSpread$1({}, rSideProps, {
          otherSide: this.lSide
        })); // this.rSide.$side.style.marginLeft = this.lSide.$side.style.width;

        this.rSide.setMarginLeft(parseInt(this.lSide.$side.style.width, 10));
        addClass(this.rSide.$side, 'gg-rside');
        this.$container.appendChild(this.rSide.$side);
      }
    }, {
      key: "createLside",
      value: function createLside() {
        var lSideColumns = this.lSideColumns;
        var lSideProps = Object.assign({}, this.props, {
          columns: lSideColumns,
          side: 'left'
        });
        this.lSide = new Side(lSideProps);
        var lSideWidth = lSideColumns.reduce(function (sumWidth, col) {
          return col.width + sumWidth;
        }, 0); // if (this.props.scroll !== false) {
        //   const lSideBottomSpace = document.createElement('div');
        //   addClass(lSideBottomSpace, 'gg-lside-bottom-space');
        //   this.lSide.$side.appendChild(lSideBottomSpace);
        // }

        this.lSide.setWidth(lSideWidth);
        addClass(this.lSide.$side, 'gg-lside');
        this.$container.appendChild(this.lSide.$side);
      }
    }, {
      key: "splitColumns",
      value: function splitColumns() {
        var columns = this.props.columns;
        var i = columns.length - 1;

        for (; i >= 0; i -= 1) {
          if (columns[i].fixed) break;
        }

        var lSideColumns = columns.slice(0, i + 1);
        var rSideColumns = columns.slice(i + 1);
        return {
          lSideColumns: lSideColumns,
          rSideColumns: rSideColumns
        };
      }
    }, {
      key: "createBorderLine",
      value: function createBorderLine() {
        this.topLine = new BorderLine({
          type: 'top'
        });
        this.rightLine = new BorderLine({
          type: 'right'
        });
        this.bottomLine = new BorderLine({
          type: 'bottom'
        });
        this.leftLine = new BorderLine({
          type: 'left'
        });
        this.$container.appendChild(this.topLine.$line);
        this.$container.appendChild(this.rightLine.$line);
        this.$container.appendChild(this.bottomLine.$line);
        this.$container.appendChild(this.leftLine.$line);
      }
    }, {
      key: "createContainer",
      value: function createContainer() {
        var container = document.createElement('div');
        addClass(container, 'gg-container');
        this.$container = container;
      }
    }, {
      key: "getSideOfTarget",
      value: function getSideOfTarget(target) {
        var elm = target;

        while (elm) {
          if (hasClass(elm, 'gg-side')) {
            if (hasClass(elm, 'gg-lside')) {
              return 'lSide';
            }

            if (hasClass(elm, 'gg-rside')) {
              return 'rSide';
            }

            break;
          }

          elm = elm.parentNode;
        }

        return false;
      }
    }, {
      key: "otherSide",
      value: function otherSide(side) {
        if (side === 'lSide') return 'rSide';
        if (side === 'rSide') return 'lSide';
      }
    }, {
      key: "autoFitColumnWidth",
      value: function autoFitColumnWidth(target) {
        if (hasClass(target, 'gg-resizer')) {
          var resizingSide = this.getSideOfTarget(target);

          if (this.resizingSide === 'lSide') {
            this[resizingSide].autoFitWidth(target, this.rSide);
          } else {
            this[resizingSide].autoFitWidth(target);
          }

          this.resizingSide = false;
          removeClass(this.$container, 'disable-selection col-resizing');
          removeClass(this.guideLine, 'active');
        }
      }
    }, {
      key: "initResizeColumnWidth",
      value: function initResizeColumnWidth(_ref) {
        var target = _ref.target,
            clientX = _ref.clientX;

        if (hasClass(target, 'gg-resizer')) {
          this.resizingSide = this.getSideOfTarget(target);

          if (this.resizingSide) {
            if (this.resizingSide === 'rSide') {
              this.rSideMarginLeft = parseInt(this.rSide.$side.style.marginLeft, 10);
            } else {
              this.rSideMarginLeft = 0;
            }

            addClass(this.$container, 'disable-selection col-resizing');
            var guideLeft = this[this.resizingSide].resizeMouseDown(target, clientX) + this.rSideMarginLeft;
            this.guideLine.style.transform = "translateX(".concat(guideLeft, "px)"); // addClass(this.guideLine, 'active');
          }
        }
      }
    }, {
      key: "resizingColumnWidth",
      value: function resizingColumnWidth(clientX) {
        if (this.resizingSide) {
          var guideLeft = this[this.resizingSide].moveGuideLine(clientX) + this.rSideMarginLeft;
          this.guideLine.style.transform = "translateX(".concat(guideLeft, "px)");
          addClass(this.guideLine, 'active');
        }
      }
    }, {
      key: "resizedColumnWidth",
      value: function resizedColumnWidth(_ref2) {
        var target = _ref2.target,
            clientX = _ref2.clientX;

        if (this.resizingSide) {
          if (this.resizingSide === 'lSide') {
            this[this.resizingSide].resizeColumns(clientX, this.rSide);
          } else if (this.resizingSide === 'rSide') {
            this[this.resizingSide].resizeColumns(clientX);
          }

          this[this.resizingSide].resizeClear(target);
          this.resizingSide = false;
          removeClass(this.$container, 'disable-selection col-resizing');
          removeClass(this.guideLine, 'active');
        }
      }
    }, {
      key: "focusCell",
      value: function focusCell(_ref3) {
        var target = _ref3.target,
            clientX = _ref3.clientX,
            clientY = _ref3.clientY;
        var elm = hasClassInParents(target, 'gg-cell');

        if (elm) {
          this.unsetFocusLayer();
          this.unsetSelectionLayer();
          this.cursorPoint = {
            x: clientX,
            y: clientY
          };
          var side = this.getSideOfTarget(elm);
          this.focusedCell = elm;
          this[side].setFocusLayer(elm);
          if (!this[side].body.gridMouseDownWrapper) this[side].body.grid = this;
          addClass(this.$container, 'active-focus');
        }
      }
    }, {
      key: "selectCell",
      value: function selectCell(_ref4) {
        var target = _ref4.target,
            clientX = _ref4.clientX,
            clientY = _ref4.clientY;

        if (this.cursorPoint && this.cursorPoint.x && this.cursorPoint.y && this.focusedCell) {
          var dist = getDistance(this.cursorPoint.x, this.cursorPoint.y, clientX, clientY);

          if (dist > 10) {
            var elm = hasClassInParents(target, 'gg-cell');

            if (elm) {
              var side = this.getSideOfTarget(elm);
              var focusedSide = this.getSideOfTarget(this.focusedCell);

              if (side === focusedSide) {
                if (!this[side].body.selectionStartCell) this[side].body.startSelect(this.focusedCell);
                this[this.otherSide(side)].body.hideSelectionLayer();
                this[side].body.selectCell(elm);
              } else {
                if (!this[side].body.selectionStartCell) this[side].startSelectFromOtherSide(this.focusedCell);
                this[side].body.selectCell(elm);
                this[this.otherSide(side)].selectCellInOtherSide(elm);
              }
            }
          }
        }
      }
    }, {
      key: "selectedCell",
      value: function selectedCell() {
        if (this.cursorPoint) {
          this.cursorPoint = null;
        }
      }
    }, {
      key: "mouseDownWrapper",
      value: function mouseDownWrapper(_ref5) {
        var target = _ref5.target,
            clientX = _ref5.clientX,
            clientY = _ref5.clientY;
        this.initResizeColumnWidth({
          target: target,
          clientX: clientX
        });
        this.focusCell({
          target: target,
          clientX: clientX,
          clientY: clientY
        });
      }
    }, {
      key: "mouseEventHandler",
      value: function mouseEventHandler() {
        var _this = this;

        var target = this.props.target;
        target.addEventListener('dblclick', function (e) {
          _this.autoFitColumnWidth(e.target);
        });
        target.addEventListener('mousedown', function (e) {
          var target = e.target,
              clientX = e.clientX,
              clientY = e.clientY;

          _this.mouseDownWrapper({
            target: target,
            clientX: clientX,
            clientY: clientY
          });
        });
        target.addEventListener('mouseup', function (e) {
          _this.resizedColumnWidth({
            target: e.target,
            clientX: e.clientX
          });

          _this.selectedCell();
        });
        target.addEventListener('mousemove', function (e) {
          var target = e.target,
              clientX = e.clientX,
              clientY = e.clientY;

          _this.resizingColumnWidth(clientX);

          _this.selectCell({
            target: target,
            clientX: clientX,
            clientY: clientY
          });
        });
        var element = this.$container;

        var outsideClickListener = function outsideClickListener(e) {
          if (!element.contains(e.target) && hasClass(element, 'active-focus')) {
            removeClass(element, 'active-focus');
          }
        };

        document.addEventListener('click', outsideClickListener);
      }
    }, {
      key: "unsetFocusLayer",
      value: function unsetFocusLayer() {
        this.lSide.unsetFocusLayer();
        this.rSide.unsetFocusLayer();
      }
    }, {
      key: "unsetSelectionLayer",
      value: function unsetSelectionLayer() {
        this.lSide.unsetSelectionLayer();
        this.rSide.unsetSelectionLayer();
      }
    }, {
      key: "sortEventHandler",
      value: function sortEventHandler() {
        this.lSide.sortEventHandler(this.lSide, this.rSide, this.initSortStatus());
        this.rSide.sortEventHandler(this.lSide, this.rSide, this.initSortStatus());
      }
    }, {
      key: "scrollEventHandler",
      value: function scrollEventHandler() {
        this.lSide.scrollEventHandler(this.rSide);
        this.rSide.scrollEventHandler(this.lSide);
      }
    }, {
      key: "hoverEventHandler",
      value: function hoverEventHandler() {
        this.lSide.hoverEventHandler(this.rSide);
        this.rSide.hoverEventHandler(this.lSide);
      }
    }, {
      key: "setEventHandler",
      value: function setEventHandler() {
        this.sortEventHandler();
        this.scrollEventHandler(); // this.hoverEventHandler();

        this.mouseEventHandler();
        this.shortcutEventHandler();
      }
    }, {
      key: "drawContainer",
      value: function drawContainer() {
        var target = this.props.target;
        target.appendChild(this.$container);
      }
    }, {
      key: "paginationCallBack",
      value: function paginationCallBack() {
        var _this2 = this;

        return function (idx) {
          _this2.lSide.body.gotoPageOfBody(idx);

          _this2.rSide.body.gotoPageOfBody(idx);
        };
      }
    }, {
      key: "initSortStatus",
      value: function initSortStatus() {
        var _this3 = this;

        return function () {
          if (_this3.pagination) _this3.pagination.initPageButtons();

          if (_this3.props.virtualScrolling) {
            _this3.lSide.body.initVirtualScroll();

            _this3.rSide.body.initVirtualScroll();

            _this3.scrollEventHandler();
          }
        };
      }
    }, {
      key: "createPagination",
      value: function createPagination() {
        var _this$props = this.props,
            target = _this$props.target,
            pagination = _this$props.pagination;
        if (!pagination.view) return;
        this.pagination = new Pagination(_objectSpread$1({}, pagination, {
          rowCount: this.props.data.length,
          callback: this.paginationCallBack()
        }));
        target.appendChild(this.pagination.$area);
      }
    }, {
      key: "createGuideLine",
      value: function createGuideLine() {
        var handle = document.createElement('div');
        var height = parseInt(this.rSide.$side.querySelector('.gg-resizer').style.height, 10);
        handle.style.height = "".concat(height, "px");
        addClass(handle, 'handle');
        this.guideLine = document.createElement('div');
        this.guideLine.appendChild(handle);
        addClass(this.guideLine, 'gg-guide-line');
        this.$container.appendChild(this.guideLine);
      }
    }, {
      key: "combineContents",
      value: function combineContents(lContents, rContents) {
        return rContents.reduce(function (acc, curr, i, arr) {
          var row = lContents[i] ? [].concat(_toConsumableArray(lContents[i]), _toConsumableArray(curr)) : curr;
          acc += row.join('\t');

          if (i !== arr.length) {
            acc += '\n';
          }

          return acc;
        }, '');
      }
    }, {
      key: "copyFromSelection",
      value: function copyFromSelection(e) {
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 67) {
          if (hasClass(this.$container, 'active-focus')) {
            var lSideContents = this.lSide.body.getSelectionData();
            var rSideContents = this.rSide.body.getSelectionData();
            var contents = this.combineContents(lSideContents, rSideContents);
            var ta = document.createElement('textarea');
            this.props.target.appendChild(ta);
            ta.value = contents;
            ta.select();
            document.execCommand('copy');
            this.props.target.removeChild(ta);
          }
        }
      }
    }, {
      key: "shortcutEventHandler",
      value: function shortcutEventHandler() {
        window.addEventListener('keydown', this.copyFromSelection.bind(this));
      }
    }]);

    return GG;
  }();

  function gg(options) {
    return new GG(options);
  }

  var gg_umd = gg;

  var columns = [{
    title: 'IDX.',
    field: 'gg-origin-index'
  }, {
    title: 'NO.',
    field: 'gg-index'
  }, {
    title: 'ID',
    field: 'id',
    width: 40
  }, {
    title: '도시',
    field: 'city',
    width: 80,
    filter: true
  }, {
    title: '이름',
    field: 'name',
    width: 80,
    filter: true
  }, {
    title: '성별',
    field: 'gender',
    width: 60,
    filter: true,
    align: 'center'
  }, {
    title: '취미',
    field: 'hobby',
    value: function value(v) {
      return v.toUpperCase();
    },
    cellTemplate: function cellTemplate(v) {
      return "<p style=\"color:blue;\">".concat(v, "</p>");
    }
  }, {
    title: '별명',
    field: 'nickName',
    align: 'center'
  }, {
    title: '전화번호',
    field: 'phone',
    align: 'right',
    sortable: false
  }];

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var createData = function createData() {
    var len = 100;
    var data = [];
    var cities = ['서울', '인천', '평택', '수원', '부산', '포항', '울산', '부천', '속초', '영월', '오산', '통영', '제주', '서귀포'];
    var lastName = ['김', '이', '박', '최', '오', '정', '송', '권', '정', '한', '유'];
    var firstName1 = ['강', '유', '조', '수', '선', '홍', '동', '민', '유', '우', '철', '기', '본', '재', '시', '기', '주', '회', '지', '여'];
    var firstName2 = ['은', '대', '훈', '연', '규', '정', '성', '환', '자', '봉', '미', '진', '형', '쁨', '철', '준', '미', '섭', '현'];
    var gender = ['남', '여'];
    var hobbies = ['독서', '영화감상', '음악감상', '게임', '수영', '축구', '야구시청', '여행', '음주', '가무', '헬스', '다이어트', '달리기'];
    var nick1 = ['즐거운', '화난', '이상한', '기쁜', '목마른', '배부른', '뚱뚱한', '멍때리는', '성격급한', '차가운', '따뜻한', '커피광', '게임폐인', '영화광', '고지식한', '재미없는', '갑갑한', '답답한', '바보같은', '똘똘한', '천재적인', '짱', '짱나는', '짜치는'];
    var nick2 = ['아저씨', '아재', '오빠', '오라버니', '아지매', '아줌마', '누나', '검사', '변호사', '변태', '아이언맨', '놈', '녀석', '청년', '학생', '막대기', '비디오', '담배', '목소리', '눈빛', '신발', '가방', '티셔츠', '바지', '반바지', '청바지', '주방장', '프로그래머', '디자이너', '기획자', 'CEO'];

    function createName() {
      var ln = lastName[getRandomInt(0, lastName.length - 1)];
      var fn1 = firstName1[getRandomInt(0, firstName1.length - 1)];
      var fn2 = firstName2[getRandomInt(0, firstName2.length - 1)];
      return ln + fn1 + fn2;
    }

    function createNickName() {
      var n1 = nick1[getRandomInt(0, nick1.length - 1)];
      var n2 = nick2[getRandomInt(0, nick2.length - 1)];
      return "".concat(n1, " ").concat(n2);
    }

    function createPhoneNumber() {
      var n1 = getRandomInt(0, 9);
      var n2 = getRandomInt(0, 9);
      var n3 = getRandomInt(0, 9);
      var n4 = getRandomInt(0, 9);
      var n5 = getRandomInt(0, 9);
      var n6 = getRandomInt(0, 9);
      var n7 = getRandomInt(0, 9);
      var n8 = getRandomInt(0, 9);
      return "010-".concat(n1).concat(n2).concat(n3).concat(n4, "-").concat(n5).concat(n6).concat(n7).concat(n8);
    }

    for (var i = 0; i < len; i += 1) {
      data.push({
        id: i + 1,
        city: cities[getRandomInt(0, cities.length - 1)],
        name: createName(),
        nickName: createNickName(),
        gender: gender[getRandomInt(0, gender.length - 1)],
        hobby: hobbies[getRandomInt(0, hobbies.length - 1)],
        phone: createPhoneNumber()
      });
    }

    return data;
  };

  var data = createData();
  var props$1 = {
    columns: columns,
    data: data,
    // height: 800,
    scroll: {
      x: true,
      y: false
    },
    // pagination: false,
    pagination: {
      perPage: 20,
      pageIdx: 1,
      view: true
    }
  };

  var container = document.querySelector('#root');
  var container2 = document.querySelector('#root2');
  var container3 = document.querySelector('#root3');

  function paddy(num, padlen, padchar) {
    var padChar = typeof padchar !== 'undefined' ? padchar : '0';
    var pad = new Array(1 + padlen).join(padChar);
    return (pad + num).slice(-pad.length);
  }

  fetch('https://www.lawtalk.co.kr/api/user/lawyers').then(function (res) {
    return res.json();
  }).then(function (json) {
    var data = json.map(function (d) {
      var flatData = {
        name: d.lawyer.name,
        address: d.lawyer.address && d.lawyer.address.jibun,
        company: d.lawyer.company,
        username: d.username,
        email: d.email,
        virtualPhone: d.lawyer.virtualPhone,
        officePhone: d.lawyer.officePhone,
        createdAt: d.createdAt,
        agreementKin: d.lawyer.agreement && d.lawyer.agreement.kin,
        naverId: d.lawyer.naverId,
        role: d.role,
        activation: d.lawyer.flag.activation,
        isSendSchedule: d.lawyer.isSendSchedule,
        advice: d.lawyer.advice,
        phoneFee: d.lawyer.adviceFee.phone,
        visitingFee: d.lawyer.adviceFee.visiting,
        percentage: d.lawyer.writeRate.percentage,
        photoOriginal: d.lawyer.photoOriginal,
        newbie: d.lawyer.flag.newbie,
        profileEdit: d.lawyer._id
      };
      return flatData;
    });
    var columns = [{
      title: 'No',
      field: 'gg-index',
      align: 'center',
      width: 60,
      value: function value(v) {
        return v || 0;
      }
    }, {
      title: '이름',
      field: 'name',
      width: 60,
      fixed: true
    }, {
      title: '주소',
      field: 'address'
    }, {
      title: '사무소명',
      field: 'company'
    }, {
      title: '아이디',
      field: 'username',
      width: 120
    }, {
      title: '이메일주소',
      field: 'email'
    }, {
      title: '050번호',
      field: 'virtualPhone',
      width: 120
    }, {
      title: '사무소번호',
      field: 'officePhone',
      width: 120
    }, {
      title: '가입일',
      field: 'createdAt',
      width: 140,
      value: function value(v) {
        var dt = new Date(v);
        var year = dt.getFullYear();
        var month = paddy(dt.getMonth() + 1, 2);
        var date = paddy(dt.getDate(), 2);
        var hour = paddy(dt.getHours(), 2);
        var min = paddy(dt.getMinutes(), 2);
        var createdAt = "".concat(year, "-").concat(month, "-").concat(date, " ").concat(hour, ":").concat(min);
        return createdAt;
      }
    }, {
      title: '지식인',
      field: 'agreementKin',
      width: 65,
      value: function value(v) {
        return (!!v).toString().toUpperCase();
      }
    }, {
      title: '네이버ID',
      field: 'naverId',
      width: 100
    }, {
      title: '가입승인',
      field: 'role',
      width: 65,
      value: function value(v) {
        return v === 'lawyer' ? '완료' : '대기';
      }
    }, {
      title: '계정활성',
      field: 'activation',
      width: 65,
      value: function value(v) {
        return (!!v).toString().toUpperCase();
      }
    }, {
      title: 'SMS전송',
      field: 'isSendSchedule',
      width: 65,
      value: function value(v) {
        return (!!v).toString().toUpperCase();
      }
    }, {
      title: '유료상담',
      field: 'advice',
      width: 65,
      value: function value(v) {
        return (!!v).toString().toUpperCase();
      }
    }, {
      title: '전화상담',
      field: 'phoneFee',
      width: 60,
      value: function value(v) {
        return v || 0;
      }
    }, {
      title: '방문상담',
      field: 'visitingFee',
      width: 60,
      value: function value(v) {
        return v || 0;
      }
    }, {
      title: '작성률',
      field: 'percentage',
      width: 60,
      value: function value(v) {
        return "".concat(v, "%");
      }
    }, {
      title: '사진',
      field: 'photoOriginal',
      width: 65,
      value: function value(v) {
        var hasPicture = v.indexOf('uploads/') !== -1;
        return (!!hasPicture).toString().toUpperCase();
      }
    }, {
      title: '신규소개',
      field: 'newbie',
      width: 60,
      align: 'center',
      value: function value(v) {
        if (v === true) {
          return 'ON';
        }

        if (v === false) {
          return 'OFF';
        }

        return '-';
      }
    }, {
      title: '프로필수정',
      field: 'profileEdit',
      width: 90,
      align: 'center',
      sortable: false,
      cellTemplate: function cellTemplate(v) {
        return "<a href=\"".concat(v, "\" class=\"gotoProfileBtn\">\uC218\uC815\uD558\uAE30</a>");
      }
    }];
    var sGrid = gg_umd(_objectSpread({
      target: container
    }, props$1, {
      columns: columns,
      // columns: columns.slice(0, 4),
      // data: data.slice(0, 300),
      data: data,
      height: 400,
      scroll: {
        x: true,
        y: true
      },
      pagination: false,
      virtualScrolling: true,
      virtualPageCount: 3 // pagination: {
      //   perPage: 20,
      //   pageIdx: 1,
      //   view: true,
      // },

    }));
    var sGrid2 = gg_umd(_objectSpread({
      target: container2
    }, props$1, {
      columns: columns,
      // columns: columns.slice(0, 4),
      // data: data.slice(0, 300),
      data: data,
      height: 400,
      scroll: {
        x: true,
        y: true
      },
      pagination: false // virtualScrolling: true,
      // pagination: {
      //   perPage: 20,
      //   pageIdx: 1,
      //   view: true,
      // },

    }));
    var sGrid3 = gg_umd(_objectSpread({
      target: container3
    }, props$1, {
      columns: columns,
      // columns: columns.slice(0, 4),
      // data: data.slice(0, 300),
      data: data,
      height: 400,
      scroll: {
        x: true,
        y: false
      },
      // pagination: false,
      // virtualScrolling: true,
      pagination: {
        perPage: 20,
        pageIdx: 1,
        view: true
      }
    }));
  });

}());
