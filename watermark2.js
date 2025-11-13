(function () {
    // 设置水印文本内容，可以设置为两行或更多
    const watermarkText = ['© 木子空间'];  // 水印内容数组，第一行和第二行文字

    // 设置水印透明度（值越小透明度越高）
    const watermarkOpacity = 0.20;

    // 底部横向滚动内容条配置
    const scrollingBar = {
        content: '📢木子空间：项目定制 | 远程调试 | Bug审查修复 | 项目升级改造 | 问题探讨 （手机/微信: 17641244340）',  // 滚动文本内容（可重复以增强效果）
        height: '40px',  // 条高度
        backgroundColor: '#f8f9fa',  // 背景色
        textColor: '#0a61e4ff',  // 文字颜色
        fontSize: '16px',  // 字体大小
        speed: '20s',  // 滚动速度（越小越快）
        repeat: 1  // 内容重复次数（为了无缝滚动）
    };

    // 创建水印（优化：使用CSS动画或更高效的DOM生成，避免过度循环）
    function createWatermark() {
        // 创建水印容器，用来包裹水印元素
        const watermarkContainer = document.createElement('div');
        watermarkContainer.id = 'watermark-container';  // 添加ID，便于后续管理
        watermarkContainer.style.cssText = `
            pointer-events: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            opacity: ${watermarkOpacity};
            overflow: hidden;
        `;

        // 创建单个水印样式（优化：使用CSS变量和模板）
        const singleWatermarkStyle = `
            position: absolute;
            white-space: nowrap;
            transform: rotate(-45deg);
            font-size: 30px;
            color: rgba(0, 0, 0, 0.15);
            user-select: none;
        `;

        // 计算网格步长（优化：动态计算以更好地覆盖视口，避免固定步长导致边缘空白）
        const stepX = 250;  // 横向步长（优化为更密以覆盖更好）
        const stepY = 250;  // 纵向步长

        // 生成水印网格（限制循环次数，避免性能问题）
        for (let i = -stepX; i < window.innerWidth + stepX; i += stepX) {
            for (let j = -stepY; j < window.innerHeight + stepY; j += stepY) {
                const watermarkClone = document.createElement('div');
                watermarkClone.style.cssText = singleWatermarkStyle + `left: ${i}px; top: ${j}px;`;
                watermarkClone.innerHTML = watermarkText.map(line => `<div>${line}</div>`).join('');
                watermarkContainer.appendChild(watermarkClone);
            }
        }

        document.body.appendChild(watermarkContainer);

        // 监听窗口大小变化，重新生成水印（优化：添加resize事件处理响应式）
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const existing = document.getElementById('watermark-container');
                if (existing) existing.remove();
                createWatermark();  // 递归调用，但仅在resize时
            }, 250);  // 防抖
        });
    }

    // 创建底部横向滚动内容条
    function createScrollingBar() {
        const scrollContainer = document.createElement('div');
        scrollContainer.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: ${scrollingBar.height};
            background-color: ${scrollingBar.backgroundColor};
            overflow: hidden;
            z-index: 9998;  // 略低于水印
            border-top: 1px solid #ddd;  // 添加上边框分隔
        `;

        const scrollInner = document.createElement('div');
        const repeatedContent = scrollingBar.content.repeat(scrollingBar.repeat);  // 重复内容以实现无缝滚动
        scrollInner.innerHTML = `<span style="white-space: nowrap; display: inline-block; padding-left: 100%;">${repeatedContent}</span>`;  // 初始偏移以启动滚动

        scrollInner.style.cssText = `
            animation: scroll-left ${scrollingBar.speed} linear infinite;
            font-size: ${scrollingBar.fontSize};
            color: ${scrollingBar.textColor};
            line-height: ${scrollingBar.height};
        `;

        // 添加CSS动画（优化：内联样式定义动画，避免全局污染）
        if (!document.getElementById('scroll-animation-style')) {  // 避免重复添加样式
            const styleSheet = document.createElement('style');
            styleSheet.id = 'scroll-animation-style';
            styleSheet.textContent = `
                @keyframes scroll-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); }
                }
            `;
            document.head.appendChild(styleSheet);
        }

        scrollContainer.appendChild(scrollInner);
        document.body.appendChild(scrollContainer);
    }

    // 页面加载完成后调用所有创建函数（优化：分离函数，便于维护）
    window.addEventListener('DOMContentLoaded', () => {
        createWatermark();
        createScrollingBar();
    });

    // 额外优化：防止脚本被移除或禁用（可选，添加MutationObserver监控body变化）
    const observer = new MutationObserver(() => {
        if (!document.getElementById('watermark-container')) {
            createWatermark();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();