creat360()

function creat360(cartype) {
  var imgW = $(".d-car").width();
  var imgS = 1022 / 561;
  var imgH = imgW / imgS;
  $(".d-car").height(imgH);
  var initframe = 0;
  // 角度控件
  var pot = $('#d_page1_rulerpot');
  var start360 = function(carname, num, w, h, initnum) {
    var frames = SpriteSpin.sourceArray('./360js/img/car1 ({frame}).png', {
      frame: [1, num],
      digits: 1
    });
    $('#carframes').spritespin({
      renderer: 'image',
      width: w,
      height: h,
      frame: initnum,
      frames: num, //图片数
      animate: false, //初始是否动作
      loop: false, //是否循环
      onLoad: function() {
        var api = $('#carframes').spritespin('api');
        pot.unbind('change').bind('change', function() {
          api.stopAnimation();
          api.updateFrame(parseInt($(this).data('percent') * 72 / 100));
        });
      },
      onFrame: function(e, data) {
        //pot.css('left', data.frame / 72 * 100 + '%').data('frame', data.frame);
        //initframe = data.frame;
      },
      onInit: function() {
        $(".index-loading").find('em').html("0");
        $(".index-loading").show();
        $(".car-360-loading").show();
      },
      onProgress: function(e, data) {
        if(data.percent >= 100) {
          $(".index-loading").hide();
          $(".car-360-loading").hide();
        };
        $(".index-loading").find('em').html(data.percent);
        // $('#d_preload_txt_out').html(data.percent + '%');
      },
      source: frames.reverse()
    });

    newSpin1data = $('#carframes').data('spritespin');
    //角度拖动
    var potMouse = false,
      potPageX = false;
    var rulebarW = $('.d-rulebar').width();
    $('.d-carframes .common_center').bind('mousedown', function(event) {
      event.preventDefault();
      potMouse = true;
      potPageX = event.pageX - $('#d_page1_rulerpot').position().left;
    });
    $('.d-rulerpot').bind('touchstart', function(event) {
      event.preventDefault();
      potMouse = true;
      potPageX = event.originalEvent.changedTouches[0].clientX - $(this).position().left;
    });
    $('.d-carframes .common_center').bind('mousemove', function(event) {
      event.preventDefault();
      if(potMouse) {
        var left = Math.min(100, 100 * Math.max(0, (event.clientX - potPageX) / rulebarW));
        pot.css('left', left + '%').data('percent', left).trigger('change');
        // console.log(left + '--')
      }
    });
    $('.d-rulerpot').bind('touchmove', function(event) {
      event.preventDefault();
      if(potMouse) {
        var left = Math.min(100, 100 * Math.max(0, (event.originalEvent.changedTouches[0].clientX - potPageX) / rulebarW));
        pot.css('left', left + '%').data('percent', left).trigger('change');
      }
    });
    $('.d-carframes .common_center').bind('mouseup', function() {
      potMouse = false;
      potPageX = false;
    });
  }
  start360(cartype, 72, imgW, imgH, initframe);
  $('.d-carframes .d-arrowl').on('click', function() {
    initframe == 0 ? initframe = 5 : initframe--;
    start360(cartype, 72, imgW, imgH, initframe);
  })
  $('.d-carframes .d-arrowr').on('click', function() {
    initframe == 72 ? initframe = 0 : initframe++;
    start360(cartype, 72, imgW, imgH, initframe);
  })
}
$(window).resize(function() {
  var $carName = location.hash.replace("#", "")
  creat360($carName);
}).resize()

/*//判断IE8
function ieNavigator() {
  var browser = navigator.appName
  var b_version = navigator.appVersion
  var version = b_version.split(";");
  var trim_Version = version[1].replace(/[ ]/g, "");
  if(browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
    if(viewWidth < 768) {
      $('.showTab').css('top', '20%');
      $('.d-car').width('90%');
      $('.posi-img').css('top', '30%')
    } else {
      $('.showTab').css('top', '0%');
      $('.d-car').width('69%')
      $('.posi-img').css('top', '10%')
    }
  }
}
ieNavigator();*/