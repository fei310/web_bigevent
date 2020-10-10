
$(function () {
  // 获取layui 的form 属性
  form = layui.form;
  layer = layui.layer;

  form.verify({
    nickname: function (val) {
      if (val.length > 6) {
        return '1~6个字符之间！'
      }
    }
  });

  initUserInfo()
  // 初始化用户信息
  function initUserInfo() {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        console.log(res);
        // 调用 from.val 为表单快速赋值
        form.val('formUserInfo', res.data);
      }
    });
  }

  // 重置表单
  $('#btnReaet').on('click', function (e) {
    // 阻止默认重置
    e.preventDefault();
    // 调用 初始化 重新获取用户信息
    initUserInfo();
  })

  // 表单提交
  $('.layui-form').on('submit', function (e) {
    // 阻止默认提交
    e.preventDefault();
    // 发送数据
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $('.layui-form').serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        // 重新渲染用户信息  调用父页面里的方法
        window.parent.getUserInfo();
      }
    });
  })

})
