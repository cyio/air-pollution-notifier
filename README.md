# air-pollution-notifier (空气污染提醒)

## 功能
定时检查空气质量，污染达到指定条件时，发送微信提醒

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
配置说明

  * stationCode  离你最近的监测点编码，[全国空气监测点列表](http://beijingair.sinaapp.com/china_sites.html)
  * serverChanKey  需要你配置 [Server酱](http://sc.ftqq.com/3.version)，并提到专属 key
  * pm25InKey  AQI查询服务，key 获取页面：[PM25.in | PM2.5及空气质量监测数据开放API](http://pm25.in/api_doc)

```
{
  "stationCode": "1012A",
  "serverChanKey": "",
  "pm25InKey": "",
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

持久运行（需另行配置 pm2 或类似工具）
```
pm2 start index.js --watch --name 'air-pollution-notifier'
```
