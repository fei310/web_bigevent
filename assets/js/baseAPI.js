$.ajaxPrefilter(function (options) {
  options.url = 'http://ajax.frontend.itheima.net' + options.url;
  console.log(options.url);

  // 为有权限的接口 设置headers请求头
  if (options.url.indexOf('/my/') !== -1) { //indexOf 有 返回index 没有 返回-1
    options.headers = {
      Authorization: localStorage.getItem('token') || '',
    }
  }

  // 为全局统一挂载 complete 函数
  options.complete = function (res) {
    // console.log(res);
    // 如果获取信息失败 则执行以下代码
    if (res.responseText.status === 1 && res.responseText.message === '身份认证失败！') {
      // 1.强制清空token
      localStorage.removeItem('token');
      // 2.页面自动跳转到登陆页面
      location.href = '/login.html';
    }
  }
})