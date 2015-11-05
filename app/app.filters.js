margPhotos.filter("megaNumber", function () {
    return function (number, fractionSize) {

        if (number === null) return null;
        if (number === 0) return "0";

        if (!fractionSize || fractionSize < 0)
            fractionSize = 1;

        var abs = Math.abs(number);
        var rounder = Math.pow(10, fractionSize);
        var isNegative = number < 0;
        var key = '';
        var powers = [
            {key: "Q", value: Math.pow(10, 15)},
            {key: "T", value: Math.pow(10, 12)},
            {key: "B", value: Math.pow(10, 9)},
            {key: "M", value: Math.pow(10, 6)},
            {key: "K", value: 1000}
        ];

        for (var i = 0; i < powers.length; i++) {

            var reduced = abs / powers[i].value;

            reduced = Math.round(reduced * rounder) / rounder;

            if (reduced >= 1) {
                abs = reduced;
                key = powers[i].key;
                break;
            }
        }

        return (isNegative ? '-' : '') + abs + key;
    };
});

margPhotos.filter("timeago", function () {

    return function (time, local, raw) {
        if (!time) return "nunca";

        if (!local) {
            (local = Date.now())
        }

        if (angular.isDate(time)) {
            time = time.getTime();
        } else if (typeof time === "string") {
            time = new Date(time * 1000).getTime();
        }

        if (angular.isDate(local)) {
            local = local.getTime();
        }else if (typeof local === "string") {
            local = new Date(local).getTime();
        }

        if (typeof time !== 'number' || typeof local !== 'number') {
            return;
        }

        var
            offset = Math.abs((local - time) / 1000),
            span = [],
            MINUTE = 60,
            HOUR = 3600,
            DAY = 86400,
            WEEK = 604800,
            MONTH = 2629744,
            YEAR = 31556926,
            DECADE = 315569260;

        if (offset <= MINUTE)              span = [ '', raw ? 'agora' : 'less than a minute' ];
        else if (offset < (MINUTE * 60))   span = [ Math.round(Math.abs(offset / MINUTE)), 'm' ];
        else if (offset < (HOUR * 24))     span = [ Math.round(Math.abs(offset / HOUR)), 'h' ];
        else if (offset < (DAY * 7))       span = [ Math.round(Math.abs(offset / DAY)), 'd' ];
        else if (offset < (WEEK * 52))     span = [ Math.round(Math.abs(offset / WEEK)), 'w' ];
        else if (offset < (YEAR * 10))     span = [ Math.round(Math.abs(offset / YEAR)), 'y' ];
        else                               span = [ '', '....' ];

        span = span.join(' ');

        if (raw === true) {
            return span;
        }
        return (time <= local) ? span + '' : 'in ' + span;
    }
});