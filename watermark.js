(function () {
    // 设置水印文本内容，可以设置为两行或更多
    const watermarkText = ['© 木子空间'];  // 水印内容数组，第一行和第二行文字

    // 设置水印透明度（值越小透明度越高）
    const watermarkOpacity = 0.40;

    // 设置右下角悬浮图片、链接的配置
    const floatingImage = {
        src: 'http://cdn.qiniu.liyansheng.top/img/graphic-4005286_640.png',  // 图片的 URL
        alt: 'Logo',  // 图片的替代文字
        width: '120px',  // 图片宽度
        height: '120px',  // 图片高度
        link: 'https://www.liyansheng.top',  // 点击图片或链接跳转的目标 URL
        linkText: '前往🚀木子空间'  // 链接文本
    };

    // 创建水印
    function createWatermark() {
        // 创建水印容器，用来包裹水印元素
        const watermarkContainer = document.createElement('div');
        watermarkContainer.style.pointerEvents = 'none';  // 确保水印不影响页面上的点击事件
        watermarkContainer.style.position = 'fixed';  // 固定定位，使其覆盖整个页面
        watermarkContainer.style.top = '0';  // 设置水印容器从顶部开始
        watermarkContainer.style.left = '0';  // 设置水印容器从左侧开始
        watermarkContainer.style.width = '100%';  // 水印容器的宽度占满整个页面
        watermarkContainer.style.height = '100%';  // 水印容器的高度占满整个页面
        watermarkContainer.style.zIndex = '9999';  // 设置较高的 z-index 保证水印位于页面最上层
        watermarkContainer.style.opacity = watermarkOpacity;  // 应用透明度
        watermarkContainer.style.overflow = 'hidden';  // 防止水印超出页面范围

        // 创建水印样式元素
        const watermarkStyle = document.createElement('div');
        watermarkStyle.style.position = 'absolute';  // 水印文字的绝对定位
        watermarkStyle.style.whiteSpace = 'nowrap';  // 保证水印文字不换行
        watermarkStyle.style.transform = 'rotate(-45deg)';  // 设置水印的旋转角度
        watermarkStyle.style.fontSize = '30px';  // 设置水印文字大小
        watermarkStyle.style.color = 'rgba(0, 0, 0, 0.15)';  // 设置水印文字颜色并带有透明度
        watermarkStyle.style.userSelect = 'none';  // 防止水印文字被选中

        // 填充页面，创建多个水印并按网格分布
        for (let i = 0; i < window.innerWidth; i += 300) {  // 设置水印横向间隔，每个水印之间150px
            for (let j = 0; j < window.innerHeight; j += 300) {  // 设置水印纵向间隔，每个水印之间150px
                const watermarkClone = watermarkStyle.cloneNode();  // 克隆水印样式
                watermarkClone.style.left = `${i}px`;  // 设置水印在页面中的水平位置
                watermarkClone.style.top = `${j}px`;  // 设置水印在页面中的垂直位置

                // 创建多行水印文本
                watermarkClone.innerHTML = watermarkText.map(line => `<div>${line}</div>`).join(''); // 将数组转换为HTML的多行文本

                watermarkContainer.appendChild(watermarkClone);  // 将克隆的水印加入容器
            }
        }

        // 将水印容器添加到页面的body中
        document.body.appendChild(watermarkContainer);

        // 创建右下角悬浮图片、文字和链接
        const floatingContainer = document.createElement('div');
        floatingContainer.style.position = 'fixed';  // 固定定位
        floatingContainer.style.bottom = '120px';  // 距离底部 120px，避免完全靠近右下角
        floatingContainer.style.right = '20px';  // 距离右侧 20px
        floatingContainer.style.zIndex = '10000';  // 确保悬浮元素位于最上层
        floatingContainer.style.textAlign = 'center';  // 文字居中对齐
        floatingContainer.style.cursor = 'pointer';  // 鼠标悬停时显示为指针样式

        // 创建图片元素
        const img = document.createElement('img');
        img.src = floatingImage.src;  // 设置图片的 URL
        img.alt = floatingImage.alt;  // 设置图片的替代文字
        img.style.width = floatingImage.width;  // 设置图片宽度
        img.style.height = floatingImage.height;  // 设置图片高度
        img.style.display = 'block';  // 使图片成为块级元素，保证文字在下面

        // 创建链接元素
        const link = document.createElement('a');
        link.href = floatingImage.link;  // 设置链接目标地址
        link.textContent = floatingImage.linkText;  // 设置链接文本
        link.style.fontSize = '14px';  // 设置链接文字大小
        link.style.color = '#007bff';  // 设置链接文字颜色
        link.style.textDecoration = 'none';  // 去掉默认的下划线
        link.style.marginTop = '5px';  // 链接与文字之间的间距

        // 将图片、文字和链接添加到悬浮容器中
        floatingContainer.appendChild(img);
        floatingContainer.appendChild(link);

        // 将悬浮容器添加到页面的body中
        document.body.appendChild(floatingContainer);

        // 创建广告容器
        const adContainer = document.createElement('div');
        adContainer.style.position = 'fixed';  // 固定定位
        adContainer.style.bottom = '70px';  // 距离底部 70px，避免与浮动元素重叠
        adContainer.style.right = '20px';  // 距离右侧 20px
        adContainer.style.zIndex = '10000';  // 确保广告位于最上层
        adContainer.style.backgroundColor = '#ff8c00';  // 设置广告的背景颜色（橙色）
        adContainer.style.padding = '10px 20px';  // 给广告容器添加一些内边距
        adContainer.style.borderRadius = '8px';  // 边角圆滑
        adContainer.style.color = '#fff';  // 文字颜色为白色
        adContainer.style.fontSize = '16px';  // 设置字体大小
        adContainer.style.cursor = 'pointer';  // 鼠标悬停时显示为指针样式
        adContainer.textContent = '项目定制&远程调试';  // 广告内容

        // 点击广告时跳转到指定链接
        adContainer.addEventListener('click', () => {
            window.location.href = 'https://www.liyansheng.top/blog/remote_help/';  // 替换成你广告的目标链接
        });

        // 将广告容器添加到页面的body中
        document.body.appendChild(adContainer);
    }

    // 页面加载完成后调用 createWatermark 方法
    window.addEventListener('DOMContentLoaded', createWatermark);
})();



