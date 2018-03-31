'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var cache = {};

var addStyles = {
    addFont: function addFont(src, styles) {
        var extensions = ['eot', 'woff', 'woff2', 'ttf', 'svg', 'otf'];
        var format = {
            eot: 'embedded-opentype',
            woff2: 'woff2',
            woff: 'woff',
            ttf: 'truetype',
            svg: 'svg',
            otf: 'opentype'
        };

        function getFamily(cssString) {
            if (!/:/.test(cssString)) return cssString;
            var res = /font(?:-family)?\s*:\s*"?([^;,"']*)"?/ig.exec(cssString);
            if (!res || !res[1]) return cssString;
            return res[1];
        }

        function getStyle(cssString) {
            if (!/:/.test(cssString)) return 'normal';
            var res = /font-style\s*:\s*"?([^;,"']*)"?/ig.exec(cssString);
            if (!res || !res[1]) return 'normal';
            return res[1];
        }

        function getWeight(cssString) {
            if (!/:/.test(cssString)) return 'normal';
            var res = /font-weight\s*:\s*"?([^;,"']*)"?/ig.exec(cssString);
            if (!res || !res[1]) return 'normal';
            return res[1];
        }

        function extname(str) {
            var slug = str.split(/\/|\\/).slice(-1)[0];
            var idx = slug.lastIndexOf('.');
            if (idx <= 0) return '';

            return slug.slice(idx);
        }

        var name = getFamily(styles);
        var ext = extname(src);
        var urls = [];

        if (Array.isArray(src)) {
            urls = src;
        }

        if (!format[ext.slice(1)]) {
            for (var i = 0; i < extensions.length; i++) {
                urls.push(src + '.' + extensions[i]);
            }
        } else {
            urls.push(src);
        }

        var srcStr = 'src: ';
        for (var _i = 0; _i < urls.length; _i++) {
            var url = urls[_i];
            var _ext = extname(url);
            var filepath = url.slice(0, -_ext.length);
            if (_ext === '.eot') {
                srcStr += 'url("' + (filepath + '.eot') + '");\n';
                srcStr += 'src: url("' + (filepath + '.eot?#iefix') + '") format("' + format.eot + '"),\n';
            } else {
                srcStr += 'url("' + (filepath + _ext) + '") format("' + format[_ext.slice(1)] + '"),\n';
            }
        }
        srcStr = srcStr.trim().slice(0, -1);

        var id = [name, getStyle(styles), getWeight(styles)].join('-');

        addStyles.insertStyles('\n            @font-face {\n                font-family: "' + name + '";\n                ' + srcStr + ';\n                ' + styles + '\n            }\n        ', { id: id });
    },
    insertStyles: function insertStyles(styles, options) {
        function createStyle(id) {
            var element = document.getElementById(id);

            if (element) return element;

            element = document.createElement('style');
            element.setAttribute('type', 'text/css');

            document.head.appendChild(element);

            return element;
        }

        var id = options && options.id || styles;
        var element = cache[id] = cache[id] || createStyle(id);

        if ('textContent' in element) {
            element.textContent = styles;
        } else {
            element.styleSheet.cssText = styles;
        }
    }
};

exports.default = addStyles;
var insertStyles = exports.insertStyles = addStyles.insertStyles;
var addFont = exports.addFont = addStyles.addFont;