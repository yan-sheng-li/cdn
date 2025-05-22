## 随机头像
https://api.dicebear.com/7.x/avataaars/svg?seed=

## 获取天气数据
接口：http://t.weather.itboy.net/api/weather/city/101010100
参数：后面接城市代码
示例：
```json
{
  "message": "success感谢又拍云(upyun.com)提供CDN赞助",
  "status": 200,
  "date": "20250326",
  "time": "2025-03-26 21:52:24",
  "cityInfo": {
    "city": "北京市",
    "citykey": "101010100",
    "parent": "北京",
    "updateTime": "20:24"
  },
  "data": {
    "shidu": "8%",
    "pm25": 30,
    "pm10": 139,
    "quality": "良",
    "wendu": "11.7",
    "ganmao": "极少数敏感人群应减少户外活动",
    "forecast": [
      {
        "date": "26",
        "high": "高温 17℃",
        "low": "低温 8℃",
        "ymd": "2025-03-26",
        "week": "星期三",
        "sunrise": "06:07",
        "sunset": "18:32",
        "aqi": 96,
        "fx": "北风",
        "fl": "3级",
        "type": "阴",
        "notice": "不要被阴云遮挡住好心情"
      },
    ..............
```
