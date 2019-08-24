// 得到各个元素
var upload_input = document.getElementById("upload_input");
var cut_button = document.getElementById("cut_button");
var output_div = document.getElementById("outputFrame");
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
        cut_button.style.display = "inline";
    }
}

cut_button.addEventListener("click", cutPicture);

// 对图像裁剪
function cutPicture () {
    creatCanvas();
}

// 动态创建 canvas
function creatCanvas () {
    var pageNum = getPageAmount(A4);
    for (var i = 0; i < pageNum; i++) {
        var new_canvas = document.createElement("canvas");
        new_canvas.id = "cutter_canvas" + i;
        new_canvas.width = 210;
        new_canvas.height = 297;
        var ctx = new_canvas.getContext("2d");
        ctx.drawImage(upload_img, 0, 0, 798, 1128, 0, 0, 798, 1128);
        output_div.appendChild(new_canvas);
    }
}

// 计算图片将会切割成几页
function getPageAmount (pageType) {
    return pageType * (upload_img.height / upload_img.width);
}