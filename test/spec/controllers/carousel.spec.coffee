'use strict'

describe 'Controller: CarouselCtrl', ->
    scope = null

    beforeEach ->
        scope = {}
        module 'fangApp'
        inject ($controller) ->
            $controller 'CarouselCtrl', $scope: scope

    it 'should attach an image to the scope', ->
        expect(scope.carouselImage).toBe 'test.jpg'
