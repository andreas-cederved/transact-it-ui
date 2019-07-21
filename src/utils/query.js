export function removeLeadingAndTrailingSlash(str) {
    return str.replace(/^\/+|\/+$/g, '');
}

export function fromQs(search = window.location.search) {
    return search
        .split('?')
        .pop()
        .split('&')
        .map(pair => pair.split('='))
        .reduce((obj, [key, value]) => ({...obj,  [key]: value }), {});
}