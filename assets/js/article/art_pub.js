

$(function () {

  layer = layui.layer;
  form = layui.form;

  initCate();
  // 初始化富文本编辑器
  initEditor()

  // 加载文章分类的 函数  请求文章分类的列表 ，利用模板引擎渲染到页面
  function initCate() {
    // 发送数据 获取文章分类的数据
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        var htmlStr = template('tpl-cate', res);
        $('[name=cate_id]').html(htmlStr);
        // console.log(htmlStr);
        // 用layui里的render方法 渲染分类列表
        form.render();
      }
    });
  }

  // 1. 初始化图片裁剪器
  var $image = $('#image')
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }
  // 3. 初始化裁剪区域
  $image.cropper(options)

  // 选择封面按钮 绑定点击事件
  $('#btnChooseImage').on('click', function () {
    $('#coverFile').click();
  })

  $('#coverFile').on('change', function (e) {
    // console.log(e);
    // 获取图片
    var files = e.target.files;
    // target 的 files 里的length 等于 1
    if (files.length === 0) {
      return
    };
    var newImgUrl = URL.createObjectURL(files[0]);
    // 为裁剪区域重新设置图片
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgUrl) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })

  // 定义文章发布状态  默认为已发布，如果点击的事存为草稿，则修改为发布状态的值
  var art_state = '已发布';
  // 为保存草稿按钮 绑定点击事件
  $('#btnSave2').on('click', function () {
    art_state = '草稿';
  })

  // 为表单绑定 submit 事件
  $('#form-pub').on('submit', function (e) {
    e.preventDefault();
    // 创建 FormData 对象 原生的对象  
    var fd = new FormData($(this)[0]);
    fd.append('state', art_state);
    // console.log(fd);
    fd.forEach(function (v, k) {
      console.log(k, v);
    })
  })






})