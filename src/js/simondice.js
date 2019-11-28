$cuadrado1 = $("#cuadrado1")
$cuadrado1.color = $cuadrado1.css("background-color")
$cuadrado2 = $("#cuadrado2")
$cuadrado2.color = $cuadrado2.css("background-color")
$cuadrado3 = $("#cuadrado3")
$cuadrado3.color = $cuadrado3.css("background-color")
$cuadrado4 = $("#cuadrado4")
$cuadrado4.color = $cuadrado4.css("background-color")

function ajustarColor(valor) {
    $cuadrado1.css("background-color", changeHue(normalizarRgb($cuadrado1.color), valor));
}


$rangeColor = $("#rangeColor")


$rangeColor.on('input', function() {
    ajustarColor($rangeColor.val())
});


function rgbTextToObject(rgbText) {
    regex = /\d+/g
    rgbObject = rgbText.match(regex)
    return rgbObject
}

function rgbObjectToText(rgbObject) {
    rgbText = "(" + rgbObject[0] + "," + rgbObject[1] + "," + rgbObject[2] + ")"
    return rgbText
}




// FUNCIONES DE TERCERO MODIFICADAS
function changeHue(rgb, degree) {
    var rgb = rgbTextToObject(rgb)
    var hsl = rgbToHSL(...rgb);
    hsl.h += degree;
    if (hsl.h > 360) {
        hsl.h -= 360;
    } else if (hsl.h < 0) {
        hsl.h += 360;
    }
    return hslToRGB(hsl);
}

// exepcts a string and returns an object
function rgbToHSL(r, g, b) {
    r /= 255, g /= 255, b /= 255;

    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }

        h /= 6;
    }

    hsl = {
        h: h,
        s: s,
        l: l,
    }
    return hsl
}


function hslToRgb(h, s, l) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
}
// FUNCIONES DE TERCERO