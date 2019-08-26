// 得到各个元素
var upload_input = document.getElementById("upload_input");
var cut_button = document.getElementById("cut_button");
var cutter_canvas = document.getElementById("cutter_canvas");

// 各种纸尺寸大小的比例
const A4 = 210 / 297;
const A3 = 420 / 297;

// 上传的图片元素
var upload_img = new Image();

// 上传的图片预览
function showPreview (source) {
    var file = source.files[0];
    if (window.FileReader) {
        var fileReader = new FileReader();
        fileReader.onloadend = function (e) {
            upload_img.src = e.target.result;
        };
        fileReader.readAsDataURL(file);
    }
}

// 动态创建 canvas 并对图像裁剪和显示
function cutPicture () {
    var pageNum = getPageAmount(A4);
    var cutterHeight = getCutterHeight(A4);
    for (var i = 0; i < pageNum; i++) {
        var new_canvas = document.createElement("canvas");
        new_canvas.id = "cutter_canvas" + i;
        new_canvas.width = upload_img.width;
        new_canvas.height = cutterHeight;
        var ctx = new_canvas.getContext("2d");
        ctx.drawImage(upload_img, 0, cutterHeight * i, upload_img.width, cutterHeight, 0, 0, new_canvas.width, new_canvas.height);
        downloadPicture(new_canvas);
    }
}

// 批量下载图片
function downloadPicture (canvas) {
    var download_a = document.createElement("a");
    download_a.download = "下载";
    download_a.href = canvas.toDataURL("image/png");
    download_a.click();
}

// 计算图片将会切割成几页
function getPageAmount (pageType) {
    return pageType * (upload_img.height / upload_img.width);
}

// 计算每次裁剪的高度值
function getCutterHeight (pageType) {
 return (1 / pageType) * upload_img.width;
}