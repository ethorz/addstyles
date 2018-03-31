const cache = {};

export default {
    addFont: (src, styles) => {
        let extensions = ['eot', 'woff', 'woff2', 'ttf', 'svg', 'otf'];
        let format = {
            eot: 'embedded-opentype',
            woff2: 'woff2',
            woff: 'woff',
            ttf: 'truetype',
            svg: 'svg',
            otf: 'opentype'
        };

        function getFamily(cssString) {
            if (!/:/.test(cssString)) return cssString;
            let res = /font(?:-family)?\s*:\s*"?([^;,"']*)"?/ig.exec(cssString);
            if (!res || !res[1]) return cssString;
            return res[1];
        }

        function getStyle(cssString) {
            if (!/:/.test(cssString)) return 'normal';
            let res = /font-style\s*:\s*"?([^;,"']*)"?/ig.exec(cssString);
            if (!res || !res[1]) return 'normal';
            return res[1];
        }

        function getWeight(cssString) {
            if (!/:/.test(cssString)) return 'normal';
            let res = /font-weight\s*:\s*"?([^;,"']*)"?/ig.exec(cssString);
            if (!res || !res[1]) return 'normal';
            return res[1];
        }

        function extname(str) {
            const slug = str.split(/\/|\\/).slice(-1)[0];
            const idx = slug.lastIndexOf('.');
            if (idx <= 0) return '';

            return slug.slice(idx);
        }

        let name = getFamily(styles);
        let ext = extname(src);
        let urls = [];

        if (Array.isArray(src)) {
            urls = src;
        }

        if (!format[ext.slice(1)]) {
            for (let i = 0; i < extensions.length; i++) {
                urls.push(src + '.' + extensions[i]);
            }
        }
        else {
            urls.push(src);
        }

        let srcStr = 'src: ';
        for (let i = 0; i < urls.length; i++) {
            let url = urls[i];
            let ext = extname(url);
            let filepath = url.slice(0, -ext.length);
            if (ext === '.eot') {
                srcStr += `url("${filepath + '.eot'}");\n`;
                srcStr += `src: url("${filepath + '.eot?#iefix'}") format("${format.eot}"),\n`;
            } else {
                srcStr += `url("${filepath + ext}") format("${format[ext.slice(1)]}"),\n`;
            }
        }
        srcStr = srcStr.trim().slice(0, -1);

        let id = [name, getStyle(styles), getWeight(styles)].join('-');

        this.insertStyles(`
            @font-face {
                font-family: "${name}";
                ${srcStr};
                ${styles}
            }
        `, {id: id});
    },
    insertStyles: (styles, options) => {
        function createStyle(id) {
            let element = document.getElementById(id);

            if (element) return element;

            element = document.createElement('style');
            element.setAttribute('type', 'text/css');

            document.head.appendChild(element);

            return element
        }

        const id = (options && options.id) || styles;
        const element = cache[id] = (cache[id] || createStyle(id));

        if ('textContent' in element) {
            element.textContent = styles
        } else {
            element.styleSheet.cssText = styles
        }
    }
}