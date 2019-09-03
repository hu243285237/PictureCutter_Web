// 得到各个元素
var app = document.querySelector("#app");
var upload_text = document.querySelector("#upload_text");
var upload_input = document.querySelector("#upload_input");
var cover_upload_img = document.querySelector("#cover_upload_img");
var export_button = document.querySelector("#export_button");
var cover_export_img = document.querySelector("#cover_export_img");
var customize_x_input = document.querySelector("#customize_x_input");
var customize_y_input = document.querySelector("#customize_y_input");

// 点击图片代替执行事件
cover_upload_img.addEventListener("click", () => {
    upload_input.click();
});
cover_export_img.addEventListener("click", () => {
    export_button.click();
});

// 图片的方向
const HORIZONTAL = Symbol();
const VERTICAL = Symbol();

// 上传的图片元素
var upload_img = new Image();

// 初始化图片
function InitImage (source) {
    let file = source.files[0];
    if (window.FileReader) {
        let fileReader = new FileReader();
        fileReader.onloadend = function (e) {
            upload_img.src = e.target.result;
            upload_text.innerText = "当前选择的图片：" + file.name;
        };
        fileReader.readAsDataURL(file);
    }
}

// 动态创建 canvas 对图像裁剪和显示，并将裁剪好的图片添加进压缩包
function exportPicture () {
    let pageType = getInputPageType();
    let pageNum = getPageAmount(pageType);
    let cutterLength = getCutterLength(pageType);
    let direaction = getPictureDireaction();
    let zip = new JSZip();
    for (let i = 0; i < pageNum; i++) {
        let new_canvas = document.createElement("canvas");
        new_canvas.id = "cutter_canvas" + i;
        if (direaction === VERTICAL) {
            new_canvas.width = upload_img.width;
            new_canvas.height = cutterLength;
            let context = new_canvas.getContext("2d");
            context.drawImage(upload_img, 0, cutterLength * i, upload_img.width, cutterLength, 0, 0, new_canvas.width, new_canvas.height);
        } else {
            new_canvas.width = cutterLength;
            new_canvas.height = upload_img.height;
            let context = new_canvas.getContext("2d");
            context.drawImage(upload_img, cutterLength * i, 0, cutterLength, upload_img.height, 0, 0, new_canvas.width, new_canvas.height);
        }
        pictureToZip(zip, new_canvas, i);
    }
    downloadZip(zip);
}

// 下载已压缩好的 zip
function downloadZip (zip) {
    zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, "pictures.zip")
    });
}

// 将裁剪好的图片添加到 zip
function pictureToZip (zip, canvas, index) {
    let pictureType = getInputPictureType();
    let pictureURL = canvas.toDataURL();
    zip.file(index + "." + pictureType, pictureURL.split(',')[1], { base64: true });
}

// 判断图片是横向还是纵向
function getPictureDireaction () {
    return upload_img.height >= upload_img.width ? VERTICAL : HORIZONTAL;
}

// 计算图片将会切割成几页
function getPageAmount (pageType) {
    let direaction = getPictureDireaction();
    if (direaction === VERTICAL) {
        return pageType * (upload_img.height / upload_img.width);
    } else {
        return pageType * (upload_img.width / upload_img.height);
    }
}

// 计算每次裁剪的长度值
function getCutterLength (pageType) {
    let direaction = getPictureDireaction();
    if (direaction === VERTICAL) {
        return (1 / pageType) * upload_img.width;
    } else {
        return (1 / pageType) * upload_img.height;
    }
}

// 得到用户选择的裁剪比例类型
function getInputPageType () {
    let pageType;
    let radioVal = getRadioValue("pageType");
    switch (radioVal) {
        case "A4": pageType = 210 / 297; break;
        case "A3": pageType = 297 / 420; break;
        case "customize": pageType = customize_y_input.value / customize_x_input.value; break;
    }
    return pageType;
}

// 得到用户选择的导出图片格式
function getInputPictureType () {
    let pictureType;
    let radioVal = getRadioValue("pictureType");
    switch (radioVal) {
        case "png": pictureType = "png"; break;
        case "jpg": pictureType = "jpeg"; break;
    }
    return pictureType;
}

// 根据 radioName 得到单选按钮的值
function getRadioValue (radioName) {
    let radios = document.getElementsByName(radioName);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}