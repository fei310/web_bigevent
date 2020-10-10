

$(function () {

  var form = layui.form;
  var layer = layui.layer;

  // 密码校验
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePwd: function (val) {
      if (val === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同！'
      }
    },
    rePwd: function (val) {
      if (val !== $('[name=newPwd]').val()) {
        return '两次密码不一致！'
      }
    }
  })

  // 表单提交事件
  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    // 发送请求
    $.ajax({
      type: "POST",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message);
        // 重置表单  jq转原生   reset是dom元素的方法
        $('.layui-form')[0].reset();
      }
    });
  })
 



})