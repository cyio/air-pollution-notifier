# air-pollution-notifier (空气污染提醒)

## 安装
```shell
$ git clone https://github.com/cyio/air-pollution-notifier
$ npm install / yarn
```
## 配置
复制配置模板
```shell
$ cp config.json.template config.json
```
编辑配置
```json
{
  "stationCode": "1012A",  // [全国空气监测点列表](http://beijingair.sinaapp.com/china_sites.html)
  "serverChanKey": "",  // 使用 [Server酱](http://sc.ftqq.com/3.version) 支持微信接受消息
  "pm25InKey": "",  // [PM25.in | PM2.5及空气质量监测数据开放API](http://pm25.in/api_doc)
  "scheduleTime": {
    "days": [0, 1, 2, 3, 4, 5, 6],  // 一周七天，8/18/21点20分运行检测，
    "hours": [8, 18, 21],  // 对应本人上班前，下班前（戴口罩），睡觉前（关窗）
    "minutes": [20]
  },
  "conditions": {  // 任意一个指数超出给设定值，即发送通知
    "aqi": 150,
    "pm25": 1000,  // 1小时pm2.5， 要禁用某个指数，可将值设大，这样就不会触发
    "o3": 160  // 臭氧
  }
}
```
