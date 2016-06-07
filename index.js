

function parseUkFormat(value) {

    var date_pattern = /([0-9]{1,2})([\\/\\.\\-])([0-9]{1,2})([\\/\\.\\-])([0-9]{4}|[0-9]{2})/i,
    myRegexDate = new RegExp(date_pattern),
    dateMatch = myRegexDate.test(value),
    matches;

    if (matches = myRegexDate.exec(value)) {
        return moment(value, `DD${matches[2]}MM${matches[4]}YYYY`);
    }
    return null
}

function parsePlusPeriods(value, comparisonDate) {
    var period_pattern = /([+-])([0-9]*)\W(months|weeks|days|years|week|day|month|year)/ig
    var myRegex = new RegExp(period_pattern),
    matches;

    if (matches = myRegex.exec(value)) {
        if (matches && matches.length) {
            if (matches[1] == '-') {
                return comparisonDate.subtract(parseInt(matches[2]), matches[3]);
            } else {
                return comparisonDate.add(parseInt(matches[2]), matches[3]);
            }
        }
    }
    return null;
}

function parseChrono = function(value) {
    var chrono = require('chrono-node'),
    return_date = null,
    chrono_date;

    chrono_date = chrono.parse(value);

    if (chrono_date && chrono_date.length > 0) {
        if (chrono_date[0].start)
            return_date = chrono_date[0].start.date();
    }

    return return_date;
}

module.exports = function (value, comparisonDate, option) {

    if (value == '') {
        value = 'today';
    }

    var ukFormatDate = parseUkFormat(value);
    if (ukFormatDate) return ukFormatDate;

    var plusPeriods = parsePlusPeriods(value, comparisonDate);
    if (plusPeriods) return plusPeriods;

    return parseChrono(value);

};
