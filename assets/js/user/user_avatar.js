
$(function () {



  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }
  // 1.3 创建裁剪区域
  $image.cropper(options);

  var layer = layui.layer;

  // 为上传按钮绑定点击事件
  $('#btnChooseImage').on('click', function () {
    $('#file').click();
  })


  // 为 文件选择框 绑定 chenge 事件
  $('#file').on('change', function (e) {
    console.log(e);
    // 获取图片列表
    var fileList = e.target.files;
    if (fileList.length === 0) {
      return layer.msg(res.message);
    }

    // 1. 拿到用户选择的文件
    var file = e.target.files[0]
    // 2. 将文件，转化为路径
    var imgURL = URL.createObjectURL(file)
    // 3. 重新初始化裁剪区域
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })

  // 确定按钮 绑定点击事件
  $('#btnUpload').on('click', function () {
    // 1.拿到用户裁剪后的头像
    var dataURL = $image.cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100
    }).toDataURL('image/png');
    // 2.发送请求
    $.ajax({
      type: "POST",
      url: "/my/update/avatar",
      data: {
        avatar: dataURL
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        window.parent.getUserInfo();
      }
    });

  })

})