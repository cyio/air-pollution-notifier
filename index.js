const pm25 = require('pm25in'),
 axios = require('axios'),
 time = require("time"),
 querystring = require('querystring'),
 schedule = require('node-schedule'),
 config = require('./config.json');

let debug = 0

pm25.token = config.pm25InKey
time.tzset("Asia/Shanghai");
const now = new time.Date()

// 计划执行设置
let rule = new schedule.RecurrenceRule();
rule.dayOfWeek = config.scheduleTime.days;
rule.hour = config.scheduleTime.hours;
rule.minute = config.scheduleTime.minutes;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const app = {
  init() {
    this.checkAQI() // 立刻运行一次

    if (debug) {
      setInterval(this.checkAQI, 1000*60)
    }

    this.watcher()
  },
  checkAQI() {
    pm25.station_aqi({station_code: config.stationCode}, (err, data) => {
      if (err) throw err;
      const title = `空气质量为${data[0].quality} AQI为${data[0].aqi}, O3为${data[0].o3}`
      const body = `监测点为${data[0].area}${data[0].position_name}，数据来自国家环保部
          ${now.toLocaleString('zh-CN')}
        `
      console.log('Title: ', title)
      console.log('Body: ', body)
      if (data[0].aqi > config.conditions.aqi || data[0].o3 > config.conditions.o3 || data[0].pm2_5 > config.conditions.pm25) {
        this.severChan(title, body)
      }
    });
  },
  severChan(text, desp) {
    return axios.post(`http://sc.ftqq.com/${config.key}.send`,
      querystring.stringify({
        text: text,
        desp: desp
      }))
      .then((response) => {
        if (response.status < 400) {
          console.log('serverChan: send success')
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
  watcher() {
    return schedule.scheduleJob(rule, () => {
      this.checkAQI()
    })
  }
}

app.init()

