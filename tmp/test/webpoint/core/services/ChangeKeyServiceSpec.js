describe("webpoint.core module", function() {

    beforeEach(angular.mock.module('webpoint.core', function($provide) {

    }));

    describe('ChangeKeyService', function() {
        var ChangeKeyService;

        beforeEach(angular.mock.inject(function(_ChangeKeyService_) {
            ChangeKeyService = _ChangeKeyService_;
        }));

        it("should change key from C to D", function() {
            var data = 'C              Am         F C/E G\n' +
                       'Dette er min lengsel; å ære deg\n' +
                       '    C        Am            Gsus4 G\n' +
                       'Av hele mitt hjerte tilbe deg';

            var section = {};
            section.key = 'C';
            section.tokey = 'D';
            section.data = data;
            var result = ChangeKeyService.changeKey(section, false);

            var test = 'D              Hm         G D/F#A\n' +
                       'Dette er min lengsel; å ære deg\n' +
                       '    D        Hm            Asus4 A\n' +
                       'Av hele mitt hjerte tilbe deg\n';
            expect(result).toEqual(test);
        });

        it("should change key from C to F", function() {
            var data = '\nC            Am         F C/E G\n' +
                       'Dette er min lengsel; å ære deg\n' +
                       '    C        Am           Gsus4 G\n' +
                       'Av hele mitt hjerte tilbe deg';

            var section = {};
            section.key = 'C';
            section.tokey = 'F';
            section.data = data;
            var result = ChangeKeyService.changeKey(section, false);

            var test = '\nF            Dm        A# F/A C\n' +
                       'Dette er min lengsel; å ære deg\n' +
                       '    F        Dm           Csus4 C\n' +
                       'Av hele mitt hjerte tilbe deg\n';
            expect(result).toEqual(test);
        });


        it("should change key from F to C", function() {
            var data = 'F              Dm        A# F/A C\n' +
                       'Dette er min lengsel; å ære deg\n' +
                       '    F        Dm            Csus4 C\n' +
                       'Av hele mitt hjerte tilbe deg';

            var section = {};
            section.key = 'F';
            section.tokey = 'C';
            section.data = data;
            var result = ChangeKeyService.changeKey(section, false);

            var test = 'C              Am        F  C/E G\n' +
                       'Dette er min lengsel; å ære deg\n' +
                       '    C        Am            Gsus4 G\n' +
                       'Av hele mitt hjerte tilbe deg\n';
            expect(result).toEqual(test);
        });

//        it("should change key from C to F and back to C", function() {
//            var data = '\nC              Am         F C/E G\n' +
//                       'Dette er min lengsel; å ære deg\n' +
//                       '    C        Am            Gsus4 G\n' +
//                       'Av hele mitt hjerte tilbe deg';
//
//            var section = {};
//            section.key = 'C';
//            section.tokey = 'F';
//            section.data = data;
//            var result1 = ChangeKeyService.changeKey(section, false);
//
////            var test = 'D              Hm         G D/F#A\n' +
////                       'Dette er min lengsel; å ære deg\n' +
////                       '    D        Hm            Asus4 A\n' +
////                       'Av hele mitt hjerte tilbe deg\n';
//            section.key = 'F';
//            section.tokey = 'C';
//            section.data = result1;
//
//            var result2 = ChangeKeyService.changeKey(section, false);
//            data = data + '\n';
//            expect(result2).toEqual(data);
//        });



    });
});