angular.module('epgFilters', [])
    .constant('oneHourInPixels', 250)
    .constant('oneHourInSeconds', 60 * 60)
    .constant('channelHeight', 65)
    .filter('durationInPixels', ['oneHourInPixels', 'oneHourInSeconds', function(oneHourInPixels, oneHourInSeconds) {
    return function(durationInSeconds) {
        var hours = (durationInSeconds / oneHourInSeconds);
        return parseInt(hours * oneHourInPixels) + 'px';
    };
}])
    .filter('startTimeInPixels', ['oneHourInPixels', 'oneHourInSeconds', function(oneHourInPixels, oneHourInSeconds) {
    return function(startTimeInSecondsFromEpoch) {
        var now = new Date();
        var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

        var secondsFromMidnight = startTimeInSecondsFromEpoch - (midnight.getTime() / 1000);
        var hoursFromMidnight = secondsFromMidnight / oneHourInSeconds;
        return parseInt(hoursFromMidnight * oneHourInPixels) + 'px';
    };
}])
    .filter('oddEvenRow', [function() {
    return function(channelIds, channelId) {
        return ((_.indexOf(channelIds, channelId)) % 2 == 0) ? "even" : "odd";
    };
}])
    .filter('channelIndexInPixels', ['channelHeight', function(channelHeight) {
    return function(channelIds, channelId) {
        return (_.indexOf(channelIds, channelId) * channelHeight) + 'px';
    }
}]);