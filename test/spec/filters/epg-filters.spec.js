describe('epg filters', function() {

    beforeEach(module('epgFilters'));

    describe('durationInPixels', function() {

        it('should convert one hour to 250 pixels', function() {
            var oneHour = 60 * 60;
            inject(function(durationInPixelsFilter, oneHourInPixels) {
                expect(durationInPixelsFilter(oneHour)).toBe(oneHourInPixels + 'px');
            });
        });

        it('should convert 30 minutes to 125 pixels', function() {
            var thirtyMinutes = 30 * 60;
            inject(function(durationInPixelsFilter, oneHourInPixels) {
                expect(durationInPixelsFilter(thirtyMinutes)).toBe((oneHourInPixels / 2) + 'px');
            });
        });

    });

    describe('startTimeInPixels', function() {

        it('should convert midnight to zero', function() {
            var now = new Date();
            var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).getTime() / 1000;

            inject(function(startTimeInPixelsFilter, oneHourInPixels) {
                expect(startTimeInPixelsFilter(midnight)).toBe('0px');
            });
        });

        it('should convert 1am to 250px', function() {
            var now = new Date();
            var oneAm = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 1, 0, 0).getTime() / 1000;

            inject(function(startTimeInPixelsFilter, oneHourInPixels) {
                expect(startTimeInPixelsFilter(oneAm)).toBe(oneHourInPixels + 'px');
            });
        });
    });

});