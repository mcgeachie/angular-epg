'use strict';

describe('Controller: CarouselCtrl', function () {
    // load the controller's module
    beforeEach(module('fangApp'));

    var CarouselCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller) {
        scope = {};
        CarouselCtrl = $controller('CarouselCtrl', {
            $scope: scope
        });
    }));

    it('should attach an image to the scope', function () {
        expect(scope.carouselImage).toBe('test.jpg');
    });
});