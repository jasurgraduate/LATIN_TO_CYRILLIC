// Existing functions
function getCyrillicText(latinText) {
    if (!latinText) {
        return "";
    }
    var cyrText = "";
    for (var i = 0, len = latinText.length; i < len; i++) {
        var curLetter = latinText[i];
        if (curLetter == 'e' || curLetter == 'E') { // prevent pre E, erkin
            if (i == 0 || " -.,\n)('?/".indexOf(latinText[i - 1]) != -1) {
                curLetter += curLetter;
            }
        }

        var pos1Txt = latinText[i + 1];
        var pos2Txt = latinText[i + 2];

        if (!((curLetter == 'y' || curLetter == 'Y')
            && (pos2Txt == "'" || pos2Txt == "’"))
            && i != len - 1
            && !(curLetter == 't' && pos1Txt == 's'
                && latinText[i + 3] == 'z')) {
            var dualLetter = latCyr[curLetter + pos1Txt];
            if (dualLetter) {
                cyrText += dualLetter;
                i++;
                continue;
            }
        }
        cyrText += latCyr[curLetter] || curLetter;
    }
    return cyrText;
}

var latCyr = {
    // Existing mappings
    "A": "&#1040;",
    "B": "&#1041;",
    "V": "&#1042;",
    "G": "&#1043;",
    "D": "&#1044;",
    "Ye": "&#1045;",
    "YE": "&#1045;",
    "J": "&#1046;",
    "Z": "&#1047;",
    "I": "&#1048;",
    "Y": "&#1049;",
    "K": "&#1050;",
    "L": "&#1051;",
    "M": "&#1052;",
    "N": "&#1053;",
    "O": "&#1054;",
    "P": "&#1055;",
    "R": "&#1056;",
    "S": "&#1057;",
    "T": "&#1058;",
    "U": "&#1059;",
    "F": "&#1060;",
    "X": "&#1061;",
    "Ts": "&#1062;",
    "TS": "&#1062;",
    "Ch": "&#1063;",
    "CH": "&#1063;",
    "Sh": "&#1064;",
    "SH": "&#1064;",
    "EE": "&#1069;",
    "Yu": "&#1070;",
    "YU": "&#1070;",
    "Ya": "&#1071;",
    "YA": "&#1071;",
    "G'": "&#1170;",
    "G`": "&#1170;",
    "O'": "&#1038;",
    "O’": "&#1038;",
    "O`": "&#1038;",
    "Yo": "&#1025;",
    "YO": "&#1025;",
    "Q": "&#1178;",
    "H": "&#1202;", // &#1061 is x; is need to change to original &#1202;
    "a": "&#1072;",
    "b": "&#1073;",
    "v": "&#1074;",
    "g": "&#1075;",
    "d": "&#1076;",
    "ye": "&#1077;",
    "yE": "&#1077;",
    "j": "&#1078;",
    "z": "&#1079;",
    "i": "&#1080;",
    "y": "&#1081;",
    "k": "&#1082;",
    "l": "&#1083;",
    "m": "&#1084;",
    "n": "&#1085;",
    "o": "&#1086;",
    "p": "&#1087;",
    "r": "&#1088;",
    "s": "&#1089;",
    "t": "&#1090;",
    "u": "&#1091;",
    "f": "&#1092;",
    "x": "&#1093;",
    "ts": "&#1094;",
    "tS": "&#1094;",
    "ch": "&#1095;",
    "cH": "&#1095;",
    "sh": "&#1096;",
    "sH": "&#1096;",
    "'": "&#1098;",
    "ee": "&#1101;",
    "eE": "&#1101;",
    "e": "&#1077;",
    "yu": "&#1102;",
    "yU": "&#1102;",
    "ya": "&#1103;",
    "yA": "&#1103;",
    "o'": "&#1118;",
    "o`": "&#1118;",
    "q": "&#1179;",
    "g'": "&#1171;",
    "g`": "&#1171;",
    "yo": "&#1105;",
    "yO": "&#1105;",
    "h": "&#1203;", // (isMobile ? "&#1093;":"&#1203;)
    "w": "&#1100;",
    "ww": "&#1097;",
    "WW": "&#1065;",
    "QW": "&#1067;",
    "qw": "&#1099;",
    "W": "&#1068;"
};


// Current year
document.addEventListener('DOMContentLoaded', function () {
    const currentYear = new Date().getFullYear();
    document.getElementById('year').textContent = currentYear;
});
