// 得到各个元素
var upload_input = document.getElementById("upload_input");
var upload_img = document.getElementById("upload_img");
var cutter_canvas = document.getElementById("cutter_canvas");

// 各种纸尺寸大小的比例
const A4 = 297 / 210;
const A3 = 420 / 297;

// 上传的图片预览
function ShowPreview (source) {
    var file = source.files[0];
    if (window.FileReader) {
        var fileReader = new FileReader();
        fileReader.onloadend = function (e) {
            upload_img.src = e.target.result;
        };
        fileReader.readAsDataURL(file);
        upload_img.style.display = "block";
    }
}

cutter_canvas.addEventListener("click", CutPicture);

// 对图像裁剪
function CutPicture () {
    var ctx = cutter_canvas.getContext("2d");
    ctx.drawImage(upload_img, 0, 0, 798, 1128, 0, 0, 798, 1128);
}