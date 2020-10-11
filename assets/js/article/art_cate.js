

$(function () {

  layer = layui.layer;
  form = layui.form;

  // 获取文章分类列表
  initArtCateList();
  function initArtCateList() {
    // 发送请求 渲染页面数据
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        // layer.msg(res.message);     
        // 模板引擎
        var htmlStr = template('tpl-table', res);
        // 渲染页面内容 
        $('tbody').html(htmlStr);
      }
    });
  }

  // 添加类别 按钮 点击事件
  var indexClose = null; // 关闭弹出层
  $('#btnAddCate').on('click', function () {
    // 弹出层
    indexClose = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html(),
    });
  })

  // 为 form-add 表单 绑定 submit 事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault();
    // 发送请求 修改数据
    $.ajax({
      type: "POST",
      url: "/my/article/addcates",
      data: $('#form-add').serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        // 添加文章分类成功后 再次调用 获取文章分类列表 函数
        initArtCateList();
        layer.msg(res.message);
        // 关闭弹层
        layer.close(indexClose);
      }
    });
  })

  // 修改分类 绑定 点击事件
  var indexEdit = null;
  $('tbody').on('click', '.btn-edit', function () {
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html(),
    });
    // 获取 对应的数据
    var id = $(this).attr('data-id');
    // console.log(id);
    $.ajax({
      type: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        // console.log(res);
        form.val('form-edit', res.data);
      }
    });
  })

  // 确认修改 绑定 submit 事件
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        // 1.关闭弹出层
        layer.close(indexEdit);
        // 2.重新 更新数据列表
        initArtCateList();
      }
    });
  })

  // 删除按钮 绑定点击事件
  $('body').on('click', '.btn-delete', function () {
    // 获取 所选项 id
    var id = $(this).attr('data-id');
    // 提示框 提示用户是否删除
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      // 发送请求 删除数据
      $.ajax({
        type: "GET",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg(res.message);
          }
          layer.msg(res.message);
          // 1.关闭提示框
          layer.close(index);
          // 2.重新渲染数据
          initArtCateList();
        }
      });
    });
  })

  // 








})