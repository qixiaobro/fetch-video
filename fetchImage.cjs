const axios = require('axios');
const fs = require('fs');
const path = require('path');
const https = require('https');

// 确保assets文件夹存在
const assetsDir = './assets';
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir);
}

axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false, // 如果你想要忽略证书验证错误，可以设置为 false
});



// 图片URL数组
const imageUrls = [
    // 将所有图片链接粘贴到这里
    "https://www.jufengliu.top/phaser/farm/assets/bg-spring.png",
    "https://www.jufengliu.top/phaser/farm/assets/tree1.png",
    "https://www.jufengliu.top/phaser/farm/assets/tree2.png",
    "https://www.jufengliu.top/phaser/farm/assets/tree3.png",
    "https://www.jufengliu.top/phaser/farm/assets/flower1.png",
    "https://www.jufengliu.top/phaser/farm/assets/flower2.png",
    "https://www.jufengliu.top/phaser/farm/assets/flower3.png",
    "https://www.jufengliu.top/phaser/farm/assets/flower4.png",
    "https://www.jufengliu.top/phaser/farm/assets/shallowGreen.png",
    "https://www.jufengliu.top/phaser/farm/assets/buy.png",
    "https://www.jufengliu.top/phaser/farm/assets/soil/1.png",
    "https://www.jufengliu.top/phaser/farm/assets/soil/2.png",
    "https://www.jufengliu.top/phaser/farm/assets/soil/3.png",
    "https://www.jufengliu.top/phaser/farm/assets/seed.png",
    "https://www.jufengliu.top/phaser/farm/assets/fade.png",
    "https://www.jufengliu.top/phaser/farm/assets/banana/1.png",
    "https://www.jufengliu.top/phaser/farm/assets/banana/2.png",
    "https://www.jufengliu.top/phaser/farm/assets/banana/3.png",
    "https://www.jufengliu.top/phaser/farm/assets/banana/4.png",
    "https://www.jufengliu.top/phaser/farm/assets/banana/5.png",
    "https://www.jufengliu.top/phaser/farm/assets/banana/6.png",
    "https://www.jufengliu.top/phaser/farm/assets/banana/icon.png",
    "https://www.jufengliu.top/phaser/farm/assets/cherry/1.png",
    "https://www.jufengliu.top/phaser/farm/assets/cherry/2.png",
    "https://www.jufengliu.top/phaser/farm/assets/cherry/3.png",
    "https://www.jufengliu.top/phaser/farm/assets/cherry/4.png",
    "https://www.jufengliu.top/phaser/farm/assets/cherry/5.png",
    "https://www.jufengliu.top/phaser/farm/assets/cherry/6.png",
    "https://www.jufengliu.top/phaser/farm/assets/cherry/icon.png",
    "https://www.jufengliu.top/phaser/farm/assets/corn/1.png",
    "https://www.jufengliu.top/phaser/farm/assets/corn/2.png",
    "https://www.jufengliu.top/phaser/farm/assets/corn/3.png",
    "https://www.jufengliu.top/phaser/farm/assets/corn/4.png",
    "https://www.jufengliu.top/phaser/farm/assets/corn/5.png",
    "https://www.jufengliu.top/phaser/farm/assets/corn/icon.png",
    "https://www.jufengliu.top/phaser/farm/assets/eggplant/1.png",
    "https://www.jufengliu.top/phaser/farm/assets/eggplant/2.png",
    "https://www.jufengliu.top/phaser/farm/assets/eggplant/3.png",
    "https://www.jufengliu.top/phaser/farm/assets/eggplant/4.png",
    "https://www.jufengliu.top/phaser/farm/assets/eggplant/5.png",
    "https://www.jufengliu.top/phaser/farm/assets/eggplant/icon.png",
    "https://www.jufengliu.top/phaser/farm/assets/huradish/1.png",
    "https://www.jufengliu.top/phaser/farm/assets/huradish/2.png",
    "https://www.jufengliu.top/phaser/farm/assets/huradish/3.png",
    "https://www.jufengliu.top/phaser/farm/assets/huradish/4.png",
    "https://www.jufengliu.top/phaser/farm/assets/huradish/icon.png",
    "https://www.jufengliu.top/phaser/farm/assets/peach/1.png",
    "https://www.jufengliu.top/phaser/farm/assets/peach/2.png",
    "https://www.jufengliu.top/phaser/farm/assets/peach/3.png",
    "https://www.jufengliu.top/phaser/farm/assets/peach/4.png",
    "https://www.jufengliu.top/phaser/farm/assets/peach/5.png",
    "https://www.jufengliu.top/phaser/farm/assets/peach/icon.png",
    "https://www.jufengliu.top/phaser/farm/assets/peas/1.png",
    "https://www.jufengliu.top/phaser/farm/assets/peas/2.png",
    "https://www.jufengliu.top/phaser/farm/assets/peas/3.png",
    "https://www.jufengliu.top/phaser/farm/assets/peas/4.png",
    "https://www.jufengliu.top/phaser/farm/assets/peas/5.png",
    "https://www.jufengliu.top/phaser/farm/assets/peas/icon.png",
    "https://www.jufengliu.top/phaser/farm/assets/pepper/1.png",
    "https://www.jufengliu.top/phaser/farm/assets/pepper/2.png",
    "https://www.jufengliu.top/phaser/farm/assets/pepper/3.png",
    "https://www.jufengliu.top/phaser/farm/assets/pepper/4.png",
    "https://www.jufengliu.top/phaser/farm/assets/pepper/5.png",
    "https://www.jufengliu.top/phaser/farm/assets/pepper/icon.png",
    "https://www.jufengliu.top/phaser/farm/assets/pineapple/1.png",
    "https://www.jufengliu.top/phaser/farm/assets/pineapple/2.png",
    "https://www.jufengliu.top/phaser/farm/assets/pineapple/3.png",
    "https://www.jufengliu.top/phaser/farm/assets/pineapple/4.png",
    "https://www.jufengliu.top/phaser/farm/assets/pineapple/5.png",
    "https://www.jufengliu.top/phaser/farm/assets/pineapple/6.png",
    "https://www.jufengliu.top/phaser/farm/assets/pineapple/icon.png",
    "https://www.jufengliu.top/phaser/farm/assets/potato/1.png",
    "https://www.jufengliu.top/phaser/farm/assets/potato/2.png",
    "https://www.jufengliu.top/phaser/farm/assets/potato/3.png",
    "https://www.jufengliu.top/phaser/farm/assets/potato/4.png",
    "https://www.jufengliu.top/phaser/farm/assets/potato/5.png",
    "https://www.jufengliu.top/phaser/farm/assets/potato/icon.png",
    "https://www.jufengliu.top/phaser/farm/assets/pumpkin/1.png",
    "https://www.jufengliu.top/phaser/farm/assets/pumpkin/2.png",
    "https://www.jufengliu.top/phaser/farm/assets/pumpkin/3.png",
    "https://www.jufengliu.top/phaser/farm/assets/pumpkin/4.png",
    "https://www.jufengliu.top/phaser/farm/assets/pumpkin/5.png",
    "https://www.jufengliu.top/phaser/farm/assets/pumpkin/icon.png",
    "https://www.jufengliu.top/phaser/farm/assets/radish/1.png",
    "https://www.jufengliu.top/phaser/farm/assets/radish/2.png",
    "https://www.jufengliu.top/phaser/farm/assets/radish/3.png",
    "https://www.jufengliu.top/phaser/farm/assets/radish/4.png",
    "https://www.jufengliu.top/phaser/farm/assets/radish/icon.png",
    "https://www.jufengliu.top/phaser/farm/assets/strawberry/1.png",
    "https://www.jufengliu.top/phaser/farm/assets/strawberry/2.png",
    "https://www.jufengliu.top/phaser/farm/assets/strawberry/3.png",
    "https://www.jufengliu.top/phaser/farm/assets/strawberry/4.png",
    "https://www.jufengliu.top/phaser/farm/assets/strawberry/5.png",
    "https://www.jufengliu.top/phaser/farm/assets/strawberry/icon.png",
    "https://www.jufengliu.top/phaser/farm/assets/tomato/1.png",
    "https://www.jufengliu.top/phaser/farm/assets/tomato/2.png",
    "https://www.jufengliu.top/phaser/farm/assets/tomato/3.png",
    "https://www.jufengliu.top/phaser/farm/assets/tomato/4.png",
    "https://www.jufengliu.top/phaser/farm/assets/tomato/5.png",
    "https://www.jufengliu.top/phaser/farm/assets/tomato/icon.png",
    "https://www.jufengliu.top/phaser/farm/assets/watermelon/1.png",
    "https://www.jufengliu.top/phaser/farm/assets/watermelon/2.png",
    "https://www.jufengliu.top/phaser/farm/assets/watermelon/3.png",
    "https://www.jufengliu.top/phaser/farm/assets/watermelon/4.png",
    "https://www.jufengliu.top/phaser/farm/assets/watermelon/5.png",
    "https://www.jufengliu.top/phaser/farm/assets/watermelon/icon.png",
    "https://www.jufengliu.top/phaser/farm/assets/seed.png",
    "https://www.jufengliu.top/phaser/farm/assets/soil/1.png",
    "https://www.jufengliu.top/phaser/farm/assets/soil/2.png",
    "https://www.jufengliu.top/phaser/farm/assets/soil/3.png",
    "https://www.jufengliu.top/phaser/farm/assets/soil/4.png",
    "https://www.jufengliu.top/phaser/farm/assets/soil/5.png",
    "https://www.jufengliu.top/phaser/farm/assets/progress.png",
    "https://www.jufengliu.top/phaser/farm/assets/progress2.png",
    "https://www.jufengliu.top/phaser/farm/assets/extension.png",
    "https://www.jufengliu.top/phaser/farm/assets/store.png",
    "https://www.jufengliu.top/phaser/farm/assets/warehouse.png",
    "https://www.jufengliu.top/phaser/farm/assets/sow.png",
    "https://www.jufengliu.top/phaser/farm/assets/harvest.png",
    "https://www.jufengliu.top/phaser/farm/assets/shovel.png",
    "https://www.jufengliu.top/phaser/farm/assets/watering.png",
    "https://www.jufengliu.top/phaser/farm/assets/gray.png",
    "https://www.jufengliu.top/phaser/farm/assets/white.png",
    "https://www.jufengliu.top/phaser/farm/assets/bg_gray.png",
    "https://www.jufengliu.top/phaser/farm/assets/grasstile.png",
    "https://www.jufengliu.top/phaser/farm/assets/icon_jia.png",
    "https://www.jufengliu.top/phaser/farm/assets/icon_jian.png",
    "https://www.jufengliu.top/phaser/farm/assets/icon_x.png",
    "https://www.jufengliu.top/phaser/farm/assets/icon_buy.png",
    "https://www.jufengliu.top/phaser/farm/assets/icon_sale.png",
    "https://www.jufengliu.top/phaser/farm/assets/water.png",
    "https://www.jufengliu.top/phaser/farm/assets/loading.png",
    "https://www.jufengliu.top/phaser/farm/assets/seed.ico",
    "https://www.jufengliu.top/phaser/farm/assets/watering.ico",
    "https://www.jufengliu.top/phaser/farm/assets/shovel.ico",
    "https://www.jufengliu.top/phaser/farm/assets/extension.ico",
    "https://www.jufengliu.top/phaser/farm/assets/harvest.ico",
];


// 根据URL创建保存路径
function getSavePath(url) {
    // 获取URL的路径部分，并去掉末尾的文件名
    const urlPath = new URL(url).pathname;
    const folderPath = urlPath.substring(0, urlPath.lastIndexOf('/'));
    // 将路径转换为文件夹路径
    const dirName = folderPath.replace(/\//g, path.sep);
    // 构造完整的保存路径
    return path.join(assetsDir, dirName);
}

// 异步函数用于下载单个图片并保存到对应的子文件夹
async function downloadImage(url) {
    const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream'
    });

    const filename = path.basename(url); // 从URL中提取文件名
    const saveTo = getSavePath(url); // 获取保存路径
    if (!fs.existsSync(saveTo)) {
        fs.mkdirSync(saveTo, { recursive: true }); // 如果子文件夹不存在，则创建
    }

    const writer = fs.createWriteStream(path.join(saveTo, filename));

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

// 遍历图片URL数组并下载
async function downloadAllImages() {
    const downloadPromises = imageUrls.map(url => downloadImage(url));

    try {
        await Promise.all(downloadPromises);
        console.log('所有图片下载完成，保存在相应的子文件夹中。');
    } catch (error) {
        console.error('下载图片时发生错误：', error);
    }
}

downloadAllImages();
