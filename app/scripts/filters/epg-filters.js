angular.module('epgFilters', [])
    .constant('oneHourInPixels', 250)
    .constant('oneHourInSeconds', 60 * 60)
    .filter('durationInPixels', ['oneHourInPixels', 'oneHourInSeconds', function (oneHourInPixels, oneHourInSeconds) {
        return function(durationInSeconds) {
            var hours = (durationInSeconds / oneHourInSeconds);
            return parseInt(hours * oneHourInPixels) + 'px';
        };
    }])
    .filter('startTimeInPixels', ['oneHourInPixels', 'oneHourInSeconds', function (oneHourInPixels, oneHourInSeconds) {
        return function(startTimeInSecondsFromEpoch) {
            var now = new Date();
            var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

            var secondsFromMidnight = startTimeInSecondsFromEpoch - (midnight.getTime() / 1000);
            var hoursFromMidnight = secondsFromMidnight / oneHourInSeconds;
            return parseInt(hoursFromMidnight * oneHourInPixels) + 'px';
        };
    }]);