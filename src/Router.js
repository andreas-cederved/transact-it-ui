import React, { useEffect, useState } from 'react';
import { fromQs, removeLeadingAndTrailingSlash } from './utils/query';

export default ({ onRouteChange, routes, ...props }) => {
    const [{ Page, query, params }, setState] = useState({});

    useEffect(() => {
        // only one instance of router atm. If we want more, we need to handle events differently
        window.onpopstate = () => {
            // on browser back
            setPage(window.location.href);
        };

        //initial view
        setPage(window.location.href);

        document.body.addEventListener('click', e => {
            const a = traverse(e.target, 'A');
            if (a && !a.classList.contains('link')) {
                e.preventDefault();
                navigate(a.href);
            }
        });
    }, []);

    function navigate(link, replaceState) {
        if (replaceState) {
            window.history.replaceState(null, null, link);
            return;
        }

        setPage(link);
        window.history.pushState(null, null, link);
        window.scrollTo(0, 0);
    }

    function setPage(link) {
        setTimeout(() => {
            // allow state changes to take effect
            setState(route(routes, link));
        }, 0);
        onRouteChange && onRouteChange(link);
    }

    return Page ? (
        <Page
            {...props}
            {...{ query, params }}
            navigate={(link, replace) => navigate(link, replace)}
        />
    ) : null;
};

function route(routes, link) {
    const [path, query] = link.split('?');
    const queryObj = fromQs(query);

    const { Page, params } = handlePath(
        routes,
        path.replace(window.location.origin, '')
    );

    return { Page, params, query: queryObj };
}

function handlePath(routes, path) {
    const [route, ...params] = removeLeadingAndTrailingSlash(path).split('/');
    const Page = routes[route] || routes['/'];

    if (!Page) {
        throw new Error('missing route');
    }

    if (typeof Page === 'object') {
        return handlePath(Page, params.join('/'));
    }

    return { Page, params };
}

function traverse(node, tag) {
    if (node.tagName === tag) return node;
    if (node.tagName === 'BODY') return;
    if (node.parentElement) return traverse(node.parentElement, tag);
}