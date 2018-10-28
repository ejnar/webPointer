//describe("webpoint.core module", function() {
//
//    beforeEach(angular.mock.module('webpoint.core', function($provide) {
//        $provide.constant('contextPath', '/GrailsApp');
//    }));
//
//    describe('UserApi', function() {
//        var UserApi, $httpBackend;
//
//        beforeEach(angular.mock.inject(function(_UserApi_, _$httpBackend_) {
//            $httpBackend = _$httpBackend_;
//            UserApi = _UserApi_;
//        }));
//
//        afterEach(function() {
//            $httpBackend.verifyNoOutstandingExpectation();
//            $httpBackend.verifyNoOutstandingRequest();
//        });
//
//        it("should get application data on .list()", function() {
////            function headerValidation(headers) {
////                return headers["X-Requested-With"] == "XMLHttpRequest";
////            }
////            $httpBackend.expectGET("/GrailsApp/api/user", headerValidation).respond(200);
////
////            var promise = UserApi.User.list().$promise;
////
////            var successFunction = jasmine.createSpy('successFunction');
////            promise.then(successFunction);
////
////            $httpBackend.flush();
////
////            expect(successFunction).toHaveBeenCalled();
//
//
////            req = [{"id": 1, "name": "ejnar"}];
////            $httpBackend.expectGET("/GrailsApp/api/user").respond(200, req);
//
////            var promise = UserApi.User.list().$promise;
////
////            var successFunction = jasmine.createSpy('successFunction');
////            console.log(successFunction);
////            promise.then(successFunction);
////
////            $httpBackend.flush();
////            expect(successFunction.calls.count()).toEqual(1);
////            expect(successFunction).toHaveBeenCalled();
//        });
//    });
//});
