const fs = require('fs');
const cheerio = require('cheerio');

// 读取HTML文件
fs.readFile('./test.html', 'utf8', (err, htmlData) => {
  if (err) {
    console.error('Error reading the HTML file:', err);
    return;
  }

  // 使用cheerio加载HTML内容
  const $ = cheerio.load(htmlData);

  // 查找所有的ytd-playlist-panel-video-renderer元素
  const videos = [];
  const urls = [];    // 用于存储URL的数组
  $('#playlist-items').each((index, element) => {
    const $element = $(element);
    const image = $element.find('img').attr('src');
    let url = $element.find('#wc-endpoint').attr('href');
    const title = $element.find('#video-title').text().trim().replace(/\s+/g, ' ').replace(/\n/g, '');
    let timeParts = $element.find('.badge-shape-wiz__text').text().split(':');
    const timeInSeconds = parseInt(timeParts[0], 10) * 60 + parseInt(timeParts[1], 10);

    // 确保URL是完整的
    if (!url.startsWith('http')) {
      url = `https://youtube.com${url}`;
    }

    // 将提取的信息添加到videos数组
    videos.push({
      image,
      url,
      title,
      time: timeInSeconds
    });

    urls.push(url);
  });

  // 将提取的信息保存到JSON文件
  fs.writeFile('output.json', JSON.stringify(videos, null, 2), (err) => {
    if (err) {
      console.error('Error writing the JSON file:', err);
    } else {
      console.log('JSON file has been saved.');
    }
  });
  
  // 将所有URL保存到txt文件，每个URL一行
  fs.writeFile('urls.txt', urls.join('\n'), (err) => {
    if (err) {
      console.error('Error writing the URLs file:', err);
    } else {
      console.log('URLs file has been saved.');
    }
  });
});
