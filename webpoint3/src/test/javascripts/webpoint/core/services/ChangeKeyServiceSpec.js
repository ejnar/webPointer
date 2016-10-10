describe("webpoint.core module", function() {

    beforeEach(angular.mock.module('webpoint.core', function($provide) {

    }));

    describe('ChangeKeyService', function() {
        var ChangeKeyService;

        beforeEach(angular.mock.inject(function(_ChangeKeyService_) {
            ChangeKeyService = _ChangeKeyService_;
        }));


        it("should contain word", function() {
            var containWord = ['Dette', 'lengsel', 'deg'];

            var isKeyRow = ChangeKeyService.foundKeyRow(containWord);

            expect(isKeyRow).toBe(false);
        });

        it("should contain keys", function() {
            var containWord = ['Bbmaj', 'Dsus', 'Ebmaj'];

            var isKeyRow = ChangeKeyService.foundKeyRow(containWord);

            expect(isKeyRow).toBe(true);
        });

        it("should change row1", function() {
            var line = 'D              Hm       G D/F#G';

            var lResult = ChangeKeyService.replaceAt(line, 30, 'A', 'G');

            var test = 'D              Hm       G D/F#A';
            expect(lResult).toEqual(test);
        });
        it("should change row2", function() {
            var line = 'D              Hm       G D/E G';

            var lResult = ChangeKeyService.replaceAt(line, 28, 'F#', 'E');

            var test = 'D              Hm       G D/F#G';
            expect(lResult).toEqual(test);
        });
        it("should change row3", function() {
            var line = 'C              Am       F C/F#A';

            var lResult = ChangeKeyService.replaceAt(line, 28, 'E', 'F#');

            var test = 'C              Am       F C/E A';
            expect(lResult).toEqual(test);
        });


        it("should change key from C to D", function() {
            var data = 'C              Am       F C/E G\n' +
                       'Dette er min lengsel å ære deg\n' +
                       '    C        Am           Gsus4 G\n' +
                       'Av hele mitt hjerte tilbe deg';

            var section = {};
            section.key = 'C';
            section.tokey = 'D';
            section.data = data;
            var result = ChangeKeyService.changeKey(section, false);

            var test = 'D              Hm       G D/F#A\n' +
                       'Dette er min lengsel å ære deg\n' +
                       '    D        Hm           Asus4 A\n' +
                       'Av hele mitt hjerte tilbe deg';

            expect(result).toEqual(test);
        });

        it("should change key from C to D", function() {
            var data = 'D              Hm       G D/F#A\n' +
                       'Dette er min lengsel å ære deg\n' +
                       '    D        Hm           Asus4 A\n' +
                       'Av hele mitt hjerte tilbe deg';

            var section = {};
            section.key = 'D';
            section.tokey = 'C';
            section.data = data;
            var result = ChangeKeyService.changeKey(section, false);

            var test = 'C              Am       F C/E G\n' +
                       'Dette er min lengsel å ære deg\n' +
                       '    C        Am           Gsus4 G\n' +
                       'Av hele mitt hjerte tilbe deg';

            expect(result).toEqual(test);
        });

        it("should change key from C to D and back", function() {
            var data = 'C              Am       F C/E G\n' +
                       'Dette er min lengsel å ære deg\n' +
                       '    C        Am           Gsus4 G\n' +
                       'Av hele mitt hjerte tilbe deg';

            var section = {};
            section.key = 'C';
            section.tokey = 'D';
            section.data = data;
            var result1 = ChangeKeyService.changeKey(section, false);

            section.key = 'D';
            section.tokey = 'C';
            section.data = result1;
            var result2 = ChangeKeyService.changeKey(section, false);

            expect(result2).toEqual(data);
        });


        it("should change key from Bb to A", function() {

            var data = '\nBb               Eb/Bb  Bb   Cm7 Eb/F   Bb\n' +
                        'Helig, helig, he   -    lig är Herren Sebaot\n' +
                        'Bb              Cm7 F7 Bb   Eb     C7     F\n' +
                        'Helig, helig, he   -   lig    är Herren Sebaot\n' +
                        '        Bb                           Eb\n' +
                        'Hela jorden är full av din härlighet\n' +
                        '        C                  Ab/Bb    F\n' +
                        'Hela jorden är full av din härlighet\n' +
                        'F/Eb D                           Gm    G/F\n' +
                        'Hela jorden är full av din härlighet\n' +
                        'Eb    F7  Bb\n' +
                        'Ära vare Gud';

            var section = {};
            section.key = 'A#:Bb';
            section.tokey = 'A';
            section.data = data;
            var result = ChangeKeyService.changeKey(section, false);

            var test = '\nA                D/A    A    Hm7 D/E    A\n' +
                        'Helig, helig, he   -    lig är Herren Sebaot\n' +
                        'A               Hm7 E7 A    D      H7     E\n' +
                        'Helig, helig, he   -   lig    är Herren Sebaot\n' +
                        '        A                            D\n' +
                        'Hela jorden är full av din härlighet\n' +
                        '        H                  G/A      E\n' +
                        'Hela jorden är full av din härlighet\n' +
                        'E/D  C#                          F#m   F#/E\n' +
                        'Hela jorden är full av din härlighet\n' +
                        'D     E7  A\n' +
                        'Ära vare Gud';
            expect(result).toEqual(test);

            section.key = 'A';
            section.tokey = 'A#:Bb';
            section.data = result;
            var result2 = ChangeKeyService.changeKeyConfig(section, false, 2);
//            expect(result2).toEqual(data);

        });






    });
});