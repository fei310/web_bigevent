$(function () {
  $('#link_reg').on('click', function () {
    $('.login-box').hide();
    $('.reg-box').show();
  });
  $('#link_login').on('click', function () {
    $('.login-box').show();
    $('.reg-box').hide();
  })

  // 从 layui 中导出 form 对象
  var form = layui.form;
  var layer = layui.layer;
  // 密码校验
  form.verify({
    // 自定义 pwd 密码校验规则
    pwd: [
      /^[\S]{6,12}$/,
      '密码必须6到12位，且不能出现空格',
    ],
    // 校验两次密码是否一致
    repwd: function (val) {
      // 获取密码框的内容
      var pwd = $('.reg-box [name=password]').val();
      if (val !== pwd) return '两次输入密码不一致';
    }
  })

  // 监听表单注册事件
  $('#form_reg').on('submit', function (e) {
    // 阻止表单默认提交行为
    e.preventDefault();
    // 发起 post请求
    $.post('/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, function (res) {
      if (res.status !== 0) {
        // return console.log(res.message);
        return layer.msg(res.message);
      }
      // console.log(res.message);
      layer.msg('注册成功，请登录！');
      $('#link_login').click();
    })
  })

  // 监听表单登陆事件
  $('#form_login').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/login",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        // console.log(res.token);
        // 登录成功后 把token 保存到本地存储
        localStorage.setItem('token', res.token);
        // 登录成功后跳转页面
        location.href = '/index.html';
      }
    });
  })


})