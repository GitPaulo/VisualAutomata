function sleep(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

const typeSizes = {
    "undefined": () => 0,
    "boolean": () => 4,
    "number": () => 8,
    "string": item => 2 * item.length,
    "object": item => !item ? 0 : Object
        .keys(item)
        .reduce((total, key) => sizeOf(key) + sizeOf(item[key]) + total, 0)
};

function sizeOf(value) {
    return typeSizes[typeof value](value);
}