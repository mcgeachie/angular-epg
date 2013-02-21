'use strict';

describe('Directive: programme', function () {

    beforeEach(module('epgDirectives'));

    var element,
        scope,
        applyDirective;

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        element = angular.element('<epg-programme/>');

        applyDirective = function() {
            $compile(element)(scope);
            scope.$digest();
        }
    }));

    it('should display title of programme', function() {
        scope.programme = {
            t: 'Mad Men',
            m: [undefined, 3600]
        };

        applyDirective();

        expect(element.text()).toBe(scope.programme.t);
    });

    it('should make the programme the right width for its duration', function() {
        scope.programme = {
            t: 'Mad Men',
            m: [undefined, 3600]
        };

        applyDirective();

        expect(element.css('width')).toBe('250px');
    });

    it('should give the programme the correct left margin for its start time', function() {
        var now = new Date();
        var twoAm = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 2, 0, 0).getTime() / 1000;

        scope.programme = {
            t: 'Mad Men',
            m: [undefined, 3600],
            s: twoAm
        };

        applyDirective();

        expect(element.css('left')).toBe('500px');
    });

    it('should mark programmes shorter than 15 minutes as short', function() {
        scope.programme = {
            t: 'Mad Men',
            m: [undefined, 900]
        };

        applyDirective();

        expect(element.hasClass('short')).toBeTruthy();
    });

    it('should not mark programmes longer than 15 minutes as short', function() {
        scope.programme = {
            t: 'Mad Men',
            m: [undefined, 901]
        };

        applyDirective();

        expect(element.hasClass('short')).toBeFalsy();
    });

});
