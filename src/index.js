import {addFont, insertStyles} from "./addstyles";

console.log('run example');

const fontPath = './example-font.otf';
const target = document.getElementById('btn');

target.addEventListener('click', () => {
    addFont(fontPath, 'example-font');
    insertStyles('h1 { font-family: "example-font" }');
});