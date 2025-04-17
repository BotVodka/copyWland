// ==UserScript==
// @name         Wland文本复制解锁
// @namespace    https://github.com/BotVodka/copyWland
// @version      1.0
// @description  解除文澜德Wland的文本复制限制
// @author       BotVodka, DeepSeek-r1
// @match        https://old.hellowland.com/*
// @icon         https://old.hellowland.com/favicon.ico
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // 移除所有元素的复制拦截
    const removeCopyRestriction = () => {
        document.querySelectorAll('*').forEach(el => {
            el.oncopy = null;
            el.removeAttribute('oncopy');
        });
    };

    // 启用文本选择
    const enableSelection = () => {
        const style = document.createElement('style');
        style.textContent = `
            .WText, [name="WText"], body {
                user-select: auto !important;
                -webkit-user-select: auto !important;
                -moz-user-select: text !important;
            }
        `;
        document.head.appendChild(style);
    };

    // 解除右键限制
    const enableContextMenu = () => {
        document.addEventListener('contextmenu', e => {
            e.stopPropagation();
        }, true);
    };

    // 初始化执行
    setTimeout(() => {
        removeCopyRestriction();
        enableSelection();
        enableContextMenu();
    }, 500);

    // 持续监控新增元素（针对动态加载内容）
    new MutationObserver(() => {
        removeCopyRestriction();
    }).observe(document, {
        subtree: true,
        childList: true
    });
})();
