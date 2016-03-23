import chrono from 'chrono-node'

module.exports = function (value, comparisonDate, option) {

    const period_pattern = /(\+)([0-9]*)\W(months|weeks|days|week|day|month)/ig;

    let myRegex = new RegExp(period_pattern),
        matches, date;

    if (value == '') value = 'today';

    if (myRegex.test(value)) {

        myRegex = new RegExp(period_pattern)

        matches = myRegex.exec(value);

        if (matches && matches.length) {
            if (matches[1] == '-') {
                return comparisonDate.subtract(parseInt(matches[2]), matches[3]);
            } else {
                return comparisonDate.add(parseInt(matches[2]), matches[3]);
            }
        }
    }

    let chrono_date = chrono.parse(value),
        return_date = null;

    if (chrono_date && chrono_date.length > 0) {
        if (chrono_date[0].start)
            return_date = chrono_date[0].start.date();
    }

    return return_date;


};
