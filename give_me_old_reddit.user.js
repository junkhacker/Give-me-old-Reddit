// ==UserScript==
// @name         Give me old Reddit, better Reddit
// @version      1.4
// @description  Converts reddit.com links to old.reddit.com links while breaking as little as possible. 
// @author       Junkhacker
// @match        ://*.reddit.com/*
// @icon         https://www.google.com/s2/favicons?domain=www.reddit.com
// @grant        GM_addStyle
// @run-at       document-start
// @license      MIT
// ==/UserScript==

GM_addStyle(`
    #sr-header-area .redesign-beta-optin {
        display: none !important;
    };
`)

function test(url){
    if(!!url.match(/^(|http(s?):\/\/)(new|chat)\.reddit.com(.*)/gim)){
    return false;}
    else if(!!url.match(/^(|http(s?):\/\/)(|www.)reddit.com(\/poll\/.*)/gim)){
    return false;}
    else if(!!url.match(/^(|http(s?):\/\/)(|www.)reddit.com(\/api\/.*)/gim)){
    return false;}
    else if(!!url.match(/^(|http(s?):\/\/)(|www.)reddit.com(\/gallery\/.*)/gim)){
    return false;}
    else if(!!url.match(/^(|http(s?):\/\/)(|www.)reddit.com(\/chat.*)/gim)){
    return false;}
    else if(!!url.match(/^(|http(s?):\/\/)(|www.)reddit.com(\/account\/sso\/.*)/gim)){
    return false;}
    else if(!!url.match(/^(|http(s?):\/\/)(|www.)reddit.com(\/.*|$)/gim)){
    return true;}
}

function getNewPagePlease(url){
    return 'https://old.reddit.com' + url.split('reddit.com').pop();
}

function betterReddit(){
    var links = Array.prototype.slice.call(document.links, 0);
    links.filter(function(link){
        if(test(link.href)){
            var greatNewLink = getNewPagePlease(link.href);
            if(link.hasAttribute('data-outbound-url')) link.setAttribute('data-outbound-url', greatNewLink);
            link.setAttribute('href', greatNewLink);
        }
    });
}

if(test(window.location.href)){window.location.assign(getNewPagePlease(window.location.href));}

window.onload = betterReddit;
setInterval(betterReddit, 50);
