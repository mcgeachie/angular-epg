'use strict';

describe('Service: Recommendation', function () {
    var Recommendation, FindTvAndMoviesCtrl,
        scope;

    // load the controller's module
    beforeEach(function () {
        module('recommendationEngine');
        this.query = function ($httpBackend, Recommendation, params) {
            var response = Recommendation.query(params)
            $httpBackend.flush();
            return response;
        }
    });

    it('should query for recommendations with default sessionId', inject(function (Recommendation, $httpBackend) {
        $httpBackend.whenGET('/api/1.0/personalised/101/epg/session/0?c=6').respond([{}]);

        expect(this.query($httpBackend, Recommendation).length).toEqual(1);
    }));

    it('should query for recommendations for sessionId 0', inject(function (Recommendation, $httpBackend) {
        $httpBackend.whenGET('/api/1.0/personalised/101/epg/session/0?c=6').respond([{}]);

        expect(this.query($httpBackend, Recommendation, {sessionId: 0}).length).toEqual(1);
    }));

    it('should query for recommendations for sessionId 25', inject(function (Recommendation, $httpBackend) {
        $httpBackend.whenGET('/api/1.0/personalised/101/epg/session/25?c=6').respond([{}, {}]);

        expect(this.query($httpBackend, Recommendation, {sessionId: 25}).length).toEqual(2);
    }));
});