<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x5-orientation"content="portrait">
<<<<<<< HEAD
  <meta name="last-build-time" content="Wed Jan 24 2018 11:06:12 GMT+0800 (中国标准时间)">
=======
<<<<<<< HEAD
  <meta name="last-build-time" content="Mon Jan 22 2018 13:56:29 GMT+0800 (中国标准时间)">
=======
  <meta name="last-build-time" content="Mon Jan 22 2018 21:16:51 GMT+0800 (中国标准时间)">
>>>>>>> c35201623c6b340df348f97442a18a62834caf97
>>>>>>> be04e79ad7181a3ab1676b1c1ebc8936bb0dd089
  <!--link rel="apple-touch-icon" href="apple-touch-icon.png"-->
  <script>
    var designWidth = 375;
    var screenWidth = screen.width;
    var scale = screenWidth / designWidth;
    var meta = '<meta name="viewport" content="width=' + designWidth + ", initial-scale=" + scale + ", maximum-scale=" + scale + ", minimum-scale=" + scale + ', user-scalable=no, target-densitydpi=device-dpi, minimal-ui" >';
    document.write(meta);

    // 调试工具，url 中加入 debug 开启
    ;(function () {
        if (!/debug/.test(window.location)) return;
        var src = '/lib/eruda.min.js';
        document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
        document.write('<scr' + 'ipt>eruda.init();</scr' + 'ipt>');
    })();
  </script>
  <script src="/lib/jweixin-1.0.0.js"></script>
  <script>
    // 微信 config，类型可以是 JS Object 或者 JSON 字符串
    window.wxConfig = {!! $jsConfig !!}; // 或者 '{}'

    // server 端下发 token 以及 uniqueKey
    window.token = '{{$token}}';

    //server 下发的uniqueKey
    window.uniqueKey = '{{$uniqueKey}}';

    // server 下发的服务对象,可用于过滤等
    window.serviceTarget = {!! $serviceTarget !!};

    // server 下发的服务类型,可用于过滤等
    window.serviceCategory = {!! $serviceCategory !!};

     // server 下发的服务类型,可用于过滤等
     window.teamCategory = {!! $teamCategory !!};

    // server 下发的个人擅长, 用于用户资料填写
    window.goodAt = {!! $gootAt !!};

    // server 下发的机构信息
    window.orgInfo = {!! $orgInfo !!};

    // server 下发的机构编号
    window.orgCode = '{!! $orgCode !!}';

    if (window.wxConfig) {
      try{
        if (typeof window.wxConfig === 'string') {
          window.wxConfig = JSON.parse(window.wxConfig);
        }
        window.wx.config(wxConfig);
      }
      catch(e) {
        alert(e);
      }
    }

    window.orgInfo && (document.title = window.orgInfo.name);
  </script>
  <script>
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?a09aed27d797ec85ef89a5f15c0d32a1";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
  </script>


</head>

<body>
  <div id="container">
  </div>
  <script charset="utf-8" src="http://map.qq.com/api/js?v=2.exp"></script>
<<<<<<< HEAD
  <script src="/dist/main.47960edce45a97d731b1.js"></script>
=======
<<<<<<< HEAD
  <script src="/dist/main.55a822356e236aeeb9eb.js"></script>
=======
  <script src="/dist/main.38aaef629d995a58e036.js"></script>
>>>>>>> c35201623c6b340df348f97442a18a62834caf97
>>>>>>> be04e79ad7181a3ab1676b1c1ebc8936bb0dd089
</body>

</html>
