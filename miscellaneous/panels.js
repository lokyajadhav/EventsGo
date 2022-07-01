"use strict";
exports.__esModule = true;
var getEventId = function (panel) {
    if (panel == "Sports")
        return "SPORT";
    else if (panel == "Arts and Culture")
        return "ARTC";
    else if (panel == "Training and Placements")
        return "TNP";
    else if (panel == "Research and development")
        return "RAD";
    else if (panel == "Academics")
        return "ACD";
    else if (panel == "Food")
        return "FOOD";
    else if (panel == "Hostel and Health")
        return "HNH";
};
exports["default"] = getEventId;
