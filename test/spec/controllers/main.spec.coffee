'use strict'

describe 'Controller: MainCtrl', ->
    scope = null

    beforeEach ->
        scope = {}
        module('fangApp')
        inject ($controller) ->
            $controller 'MainCtrl', $scope: scope

    it 'should attach a list of awesomeThings to the scope', ->
        expect(scope.awesomeThings.length).toBe 3