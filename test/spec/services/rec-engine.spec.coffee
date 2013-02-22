'use strict'

describe 'Service: Recommendation', ->
    Recommendation = null
    scope = null
    query = ($httpBackend, Recommendation, params) ->
        response = Recommendation.query(params)
        $httpBackend.flush()
        return response

    beforeEach ->
        module 'recommendationEngine'

    it 'should query for recommendations with default sessionId', inject (Recommendation, $httpBackend) ->
        $httpBackend.whenGET('/api/1.0/personalised/101/epg/session/0?c=6').respond [{}]

        expect(query($httpBackend, Recommendation).length).toEqual 1

    it 'should query for recommendations for sessionId 0', inject (Recommendation, $httpBackend) ->
        $httpBackend.whenGET('/api/1.0/personalised/101/epg/session/0?c=6').respond [{}]

        expect(query($httpBackend, Recommendation, {sessionId: 0}).length).toEqual 1

    it 'should query for recommendations for sessionId 25', inject (Recommendation, $httpBackend) ->
        $httpBackend.whenGET('/api/1.0/personalised/101/epg/session/25?c=6').respond [{}, {}]

        expect(query($httpBackend, Recommendation, {sessionId: 25}).length).toEqual 2