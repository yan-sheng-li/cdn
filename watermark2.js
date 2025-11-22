(function () {
    // ============ 获取 URL 参数 ============
    function getUrlParam(name) {
        const url = new URL(location.href);
        // 兼容直接引入的 script 标签上的参数
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const src = scripts[i].src;
            if (src && src.includes('watermark2.js')) {
                const u = new URL(src);
                if (u.searchParams.has(name)) {
                    return u.searchParams.get(name);
                }
            }
        }
        return null;
    }

    // ============ 配置项（支持动态覆盖） ============
    const urlOpacity = getUrlParam('opacity');
    const urlText = getUrlParam('text');
    const urlHideBar = getUrlParam('hidebar');

    const watermarkOpacity = urlOpacity !== null ? parseFloat(urlOpacity) : 0.20;
    const hideScrollingBar = urlHideBar === '1' || urlHideBar === 'true';

    // 支持换行：用 %0A 或 \n 编码换行
    let watermarkText = ['© 木子空间'];
    if (urlText) {
        try {
            const decoded = decodeURIComponent(urlText.replace(/\\n/g, '\n'));
            watermarkText = decoded.split('\n').filter(t => t.trim());
            if (watermarkText.length === 0) watermarkText = ['© 木子空间'];
        } catch (e) {
            console.warn('水印文字解析失败，使用默认值');
        }
    }

    // 底部滚动条配置（可通过 hidebar=1 隐藏）
    const scrollingBar = {
        content: '📢木子空间：项目定制 | 远程调试 | Bug审查修复 | 项目升级改造 | 问题探讨 （手机/微信: 17641244340）',
        height: '40px',
        backgroundColor: '#f8f9fa',
        textColor: '#0a61e4ff',
        fontSize: '16px',
        speed: '25s',
        repeat: 2
    };

    // ============ 创建水印 ============
    function createWatermark() {
        let container = document.getElementById('watermark-container');
        if (container) container.remove();

        container = document.createElement('div');
        container.id = 'watermark-container';
        container.style.cssText = `
            pointer-events: none;
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            z-index: 9999;
            opacity: ${watermarkOpacity};
            overflow: hidden;
        `;

        const singleStyle = `
            position: absolute;
            white-space: nowrap;
            transform: rotate(-45deg);
            font-size: 30px;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.15);
            user-select: none;
            line-height: 1.4;
        `;

        const step = 250;

        for (let x = -step; x < window.innerWidth + step; x += step) {
            for (let y = -step; y < window.innerHeight + step; y += step) {
                const div = document.createElement('div');
                div.style.cssText = singleStyle + `left:${x}px;top:${y}px;`;
                div.innerHTML = watermarkText.map(t => `<div>${t}</div>`).join('');
                container.appendChild(div);
            }
        }

        document.body.appendChild(container);
    }

    // ============ 创建底部滚动条 ============
    function createScrollingBar() {
        if (hideScrollingBar) return;

        let bar = document.getElementById('custom-scrolling-bar');
        if (bar) bar.remove();

        bar = document.createElement('div');
        bar.id = 'custom-scrolling-bar';
        bar.style.cssText = `
            position: fixed;
            bottom: 0; left: 0;
            width: 100%;
            height: ${scrollingBar.height};
            background: ${scrollingBar.backgroundColor};
            overflow: hidden;
            z-index: 9998;
            border-top: 1px solid #ddd;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
        `;

        const content = scrollingBar.content.repeat(scrollingBar.repeat + 1);
        const inner = document.createElement('div');
        inner.innerHTML = `<span style="display:inline-block;padding-left:100%;white-space:nowrap;">${content}</span>`;
        inner.style.cssText = `
            animation: scroll-left ${scrollingBar.speed} linear infinite;
            font-size: ${scrollingBar.fontSize};
            color: ${scrollingBar.textColor};
            line-height: ${scrollingBar.height};
            font-weight: 500;
        `;

        // 注入动画（只注入一次）
        if (!document.getElementById('watermark-scroll-style')) {
            const style = document.createElement('style');
            style.id = 'watermark-scroll-style';
            style.textContent = `
                @keyframes scroll-left {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
            `;
            document.head.appendChild(style);
        }

        bar.appendChild(inner);
        document.body.appendChild(bar);
    }

    // ============ 初始化 ============
    function init() {
        createWatermark();
        createScrollingBar();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 窗口变化重新生成水印（防抖）
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            createWatermark();
            if (!hideScrollingBar) createScrollingBar();
        }, 300);
    });

    // 防止被移除（MutationObserver）
    const observer = new MutationObserver(() => {
        if (!document.getElementById('watermark-container')) {
            createWatermark();
        }
        if (!hideScrollingBar && !document.getElementById('custom-scrolling-bar')) {
            createScrollingBar();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();