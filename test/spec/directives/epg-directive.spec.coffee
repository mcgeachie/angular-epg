'use strict'

describe 'Module: epg directives', ->
    element = null
    scope = null
    applyDirective = null

    beforeEach ->
        module 'epgDirectives'
        inject ($rootScope, $compile) ->
            scope = $rootScope.$new()
            applyDirective = ->
                $compile(element)(scope)
                scope.$digest()

    describe 'Directive: epgProgramme', ->
        beforeEach ->
            element = angular.element '<epg-programme/>'

        it 'should display title of programme', ->
            scope.programme = t: 'Mad Men', m: [undefined, 3600]

            applyDirective()

            expect(element.text()).toBe scope.programme.t

        it 'should make the programme the right width for its duration', ->
            scope.programme = t: 'Mad Men', m: [undefined, 3600]

            applyDirective()

            expect(element.css('width')).toBe '250px'

        it 'should give the programme the correct left margin for its start time', ->
            now = new Date()
            twoAm = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 2, 0, 0).getTime() / 1000
            scope.programme = t: 'Mad Men', m: [undefined, 3600], s: twoAm

            applyDirective()

            expect(element.css('left')).toBe '500px'

        it 'should mark programmes shorter than 15 minutes as short', ->
            scope.programme = t: 'Mad Men', m: [undefined, 900]

            applyDirective()

            expect(element.hasClass('short')).toBeTruthy()

        it 'should not mark programmes longer than 15 minutes as short', ->
            scope.programme = t: 'Mad Men', m: [undefined, 901]

            applyDirective()

            expect(element.hasClass('short')).toBeFalsy()
