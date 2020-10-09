
// 入口函数
$(function () {
  getUserInfo(); // 调用 用户信息函数

  // 给退出按钮 绑定点击事件
  $('#btnLogout').on('click', function () {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
      //do something

      // 1.清空本地存储的 token
      localStorage.removeItem('token');
      // 2.页面自动跳转
      location.href = '/login.html';
      // 关闭弹出层
      layer.close(index);
    });
  })
})

// 获取用户信息
function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.getItem('token') || '',
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg(res.message);
      };
      randerAvatar(res.data); // 调用 渲染头像 把data数据传进去
    },

    // // 无论获取信息成功或者失败 都会调用complete 函数
    // complete: function (res) {
    //   // console.log(res);
    //   // 如果获取信息失败 则执行以下代码
    //   if (res.responseText.status === 1 && res.responseText.message === '身份认证失败！') {
    //     // 1.强制清空token
    //     localStorage.removeItem('token');
    //     // 2.页面自动跳转到登陆页面
    //     location.href = '/login.html';
    //   }
    // }
  });
}

// 封装 渲染用户头像
function randerAvatar(data) {
  // 1.如果没有昵称  就渲染用户名
  var name = data.nickname || data.username;
  // 2。设置欢迎文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
  // 2.如果头像不为空 则渲染头像
  if (data.user_pic !== null) {
    // 图片元素 渲染 显示
    $('.layui-nav-img').attr('src', data.user_pic).show();
    // 文字元素 隐藏
    $('.txet-avatar').hide();
  } else {
    // 图片元素 隐藏
    $('.layui-nav-img').hide();
    // 文字元素 渲染 显示
    $('.txet-avatar').html(name[0].toUpperCase()).show();
  }
}