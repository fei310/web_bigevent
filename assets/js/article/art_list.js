

$(function () {

  layer = layui.layer;
  form = layui.form;
  laypage = layui.laypage;



  // 补零函数
  function padZero(n) {
    return n = n < 10 ? '0' + n : n;
  }
  // 时间过滤器
  template.defaults.imports.dateFormat = function (date) {
    var dt = new Date(date);

    var y = dt.getFullYear();
    var m = padZero(dt.getMonth() + 1);
    var d = padZero(dt.getDate());
    var hh = padZero(dt.getHours());
    var mm = padZero(dt.getMinutes());
    var ss = padZero(dt.getSeconds());
    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
  };

  // 定义 查询的参数对象 用于请求数据
  var q = {
    pagenum: 1, // 页码值 默认选中显示第一页
    pagesize: 2, // 每页显示多少条数据
    cate_id: '',  // 文章分类的 Id
    state: '',  // 文章发布的状态
  }

  initTable();
  initCate();

  // 获取文章列表数据 的方法
  function initTable() {
    // 发送数据 获取后台信息
    $.ajax({
      type: "GET",
      url: "/my/article/list",
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('shibai');
        }
        // layer.msg(res.message);
        var htmlStr = template('tpl-table', res);
        $('tbody').html(htmlStr);
        // 调用渲染分也的方法 并传递总数
        renderPage(res.total);
      }
    });
  }

  // 初始化文章分类 函数
  function initCate() {
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        var htmlStr = template('tpl-cate', res);
        $('[name=cate_id]').html(htmlStr);
        // console.log(htmlStr);
        // console.log(res);
        // 调用laiui的方法 渲染页面数据
        form.render();
      }
    });
  }

  // 为筛选表单 绑定 submit提交 事件
  $('#form-search').on('submit', function (e) {
    e.preventDefault();
    // 获取表单中选项的值
    var cate_id = $('[name=cate_id]').val();
    var state = $('[name=state]').val();
    // 为查询对象 q 重新赋值
    q.cate_id = cate_id;
    q.state = state;
    // 重新获取列表数据
    initTable();
  })

  // 定义 渲染分页 的方法 
  function renderPage(total) {
    // console.log(total);
    // 1.点击页码 触发jump回调
    // 2.页面加载 调用laypage.render()方法，就会触发jump回调
    // first  是否时首次页面加载时触发的 jump 回调
    laypage.render({
      elem: 'pageBox', // 用于渲染分页的盒子  容器的id 不加#
      count: total, //数据总数，从服务端得到
      limit: q.pagesize, // 每页显示的条数
      curr: q.pagenum, // 默认选中页
      layout: ['count', 'limit', 'prev', 'page', 'next', 'refresh', 'skip'],
      limits: [2, 3, 4, 5, 10],
      // 点击分页按钮 切换分页时 调用 jump 函数
      jump: function (obj, first) {
        // console.log(obj.curr);
        q.pagenum = obj.curr;
        q.pagesize = obj.limit; // obj.limit 切换后额条目数 重新赋值给pagesize  再重新获取列表数据
        // 死循环
        // initTable();
        if (!first) {  // 如果不是第一次加载页面 说明时点击分页 则重新获取列表数据
          initTable();
        }
      }
    });
  }

  // 删除按钮 绑定点击事件
  $('tbody').on('click', '.btn-delete', function () {
    // 获取当前页删除按钮的个数
    var len = $('btn-delete').length;
    // 获取要删除的 id 根据id删除当前选项
    var id = $(this).attr('data-id')
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        type: "GET",
        url: "/my/article/delete/" + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg(res.message);
          }
          layer.msg(res.message);
          // 数据删除完成后 判断当前页是是否还有数据，如果没有 则让页码值-1 后再重新调用inittable方法
          if (len === 0) {
            // 如果当前时第一页 则不需要减1    不是的话 让当前页减1
            q.pagenum = q.pegenum === 1 ? 1 : q.pagenum - 1;
          }
          initTable();
          layer.close(index);
        }
      });
    });
  })


})