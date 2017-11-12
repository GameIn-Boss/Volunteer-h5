/* global wx:false, qq:false */

export function parseTimeStringToDateString(timeString) {
  const dateString = timeString.split(' ')[0];
  return dateString.replace(/-/g, '.');
}

export function isWindowReachBottom(threshold = 0) {
  if ((window.innerHeight + window.scrollY + threshold) >= document.body.scrollHeight) {
    return true;
  }
  return false;
}

export function parseDistance(distance) {
  let parsedDistance = distance / 1000;

  if (parsedDistance < 10) {
    parsedDistance = parsedDistance.toFixed(1);
  } else {
    parsedDistance = parseInt(parsedDistance, 10);
  }

  return `${parsedDistance}km`;
}

export function getLocation(success, fail, noCache) {
  if (window.dev) {
    success({
      lng: '116.314820',
      lat: '40.065560',
    });
    return;
  }

  let cachedLoc = localStorage.getItem('location');
  cachedLoc = cachedLoc ? JSON.parse(cachedLoc) : cachedLoc;

  if ((cachedLoc && cachedLoc.expires <= Date.now()) || noCache === true) {
    cachedLoc = null;
  }

  if (!cachedLoc) {
    window.wx.ready(() => {
      wx.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: (res) => {
          const lat = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          const lng = res.longitude; // 经度，浮点数，范围为180 ~ -180
          const expires = Date.now() + (5 * 60 * 1000); // 5分钟过期

          console.log('获取新位置成功', res);

          localStorage.setItem('location', JSON.stringify({
            lat,
            lng,
            expires,
          }));

          if (success) {
            success({
              lat,
              lng,
            });
          }
        },
        fail: (error) => {
          if (fail) {
            fail(error);
          }
        },
      });
    });
  } else if (success) {
    success({
      lat: cachedLoc.lat,
      lng: cachedLoc.lng,
    });
  }
}

export function getCity(success, fail) {
  if (window.dev) {
    success('北京');
    return;
  }

  getLocation((loc) => {
    const geocoder = new qq.maps.Geocoder({
      complete: (result) => {
        if (result.detail.addressComponents
          && result.detail.addressComponents.city) {
          if (!success) {
            return;
          }
          success(result.detail.addressComponents.city.replace('市', ''));
        } else if (fail) {
          fail({});
        }
      },
    });
    const coord = new qq.maps.LatLng(loc.lat, loc.lng);
    geocoder.getAddress(coord);
  }, (error) => {
    if (fail) {
      fail(error);
    }
  });
}

export function getToken() {
  if (window.dev) {
    return localStorage.getItem('token');
  }

  return window.token;
}

export function setToken(token) {
  if (window.dev) {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  } else {
    window.token = token;
  }
}

/**
 * 时间戳转日期
 * @param {int} timestamp 时间戳
 * @return {string} 例如 2017年7月27日
 */
export function timestampToDateText(timestamp) {
  let ts = timestamp;

  if ((`${ts}`).length === 10) {
    ts *= 1000;
  }

  const date = new Date(ts);

  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}
/**
 *  * 日期转时间戳再转回来（精确到分）
* 2017-10-18 11:01:11 转 2017年10月18日 11:01
* @param {string} dateText
*/
export function DateTextDelSeconds(str) {
  let date = str;
  date = new Date(date);
  date = new Date(Date.parse(date));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${year}年${month <= 10 ? `0${month}` : month}月${day <= 10 ? `0${day}` : day}日 ${hour <= 10 ? `0${hour}` : hour}:${minute <= 10 ? `0${minute}` : minute}`;
}

/**
 *  *取截止时间
* 2017-10-18 11:01:11 转 2017年10月18日 11:01-12:00
* @param {string} dateText
*/
export function DateTextDelSliceEnd(str) {
  let date = str;
  date = new Date(date);
  date = new Date(Date.parse(date));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return ` ${hour <= 10 ? `0${hour}` : hour}:${minute <= 10 ? `0${minute}` : minute}`;
}
/**
* 2017-10-18 转 2017年10月18日
* @param {string} dateText
*/
export function dateTextToDateText(dateText) {
  const re = /^(\d+)-(\d+)-(\d+)$/;
  const match = dateText.match(re);

  if (match) {
    return `${match[1]}年${match[2]}月${match[3]}日`;
  }

  return '';
}

export function isVolunteerInsure(str) {
  if (str.indexOf('志愿者保险') !== -1) {
    return true;
  }
  return false;
}
