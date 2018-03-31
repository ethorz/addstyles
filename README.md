# addstyles [![unstable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

> Insert CSS styles into an HTML document and register new font-face for the current web page by URL.

Module use pure javascript code without dependents.

[![npm install addstyles](https://nodei.co/npm/add-font.png?mini=true)](https://npmjs.org/package/addstyles/)

## Usage
```js
import addStyles from 'addstyles'; // or import {insertStyles} from 'addstyles';

addStyles.insertStyles('h1 { font-size: 14px }')
//=> <head><style> h1 { ... }</style></head>
```

For add font-face to your page:
```js
import addStyles from 'addstyles'; // or import {addFont} from 'addstyles';

//Font URL w/o extension inserts eot, woff2, woff, ttf, svg and otf versions
addStyles.addFont('//cdn.jsdelivr.net/font-hack/2.020/fonts/eot/latin/hack-regular-latin-webfont',
                  `font-family: Hack; font-weight: normal;`)

//Font URL with extension inserts only target font file
addStyles.addFont('./wavefont.otf', 'wavefont');
```

## API

#### `insertStyles(styles, [options]) -> void`

#### `addFont(fontUrl, cssString|fontName)`
#### `addFont(fontUrlList, cssString|fontName)`

Attach font to the page, apply additional parameters, which are whether font name or @font-face properties, eg font-family: <x>; font-style: <y>; font-weight: <z>.
##### styles

Required. The string of styles to insert into the DOM.

##### options

###### id

Calling `insertStyles` with the same `options.id` multiple times will re-use the same `<style>` element each time.

## Related

* [insert-css](https://github.com/substack/insert-css)
* [google-fonts](https://github.com/hughsk/google-fonts) — easy-peasy google fonts by name.
* [webfontloader](https://github.com/typekit/webfontloader) — solution for all possible font include cases.