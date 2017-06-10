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

            expect(false).toBe(isKeyRow);
        });

        it("should contain keys", function() {
            var containWord = ['Bbmaj', 'Dsus', 'Ebmaj'];

            var isKeyRow = ChangeKeyService.foundKeyRow(containWord);

            expect(true).toBe(isKeyRow);
        });

        it("should change row1", function() {
            var line = 'D              Hm       G D/F#G';

            var lResult = ChangeKeyService.replaceAt(line, 30, 'A', 'G');

            var test = 'D              Hm       G D/F#A';
            expect(test).toEqual(lResult);
        });
        it("should change row2", function() {
            var line = 'D              Hm       G D/E G';

            var lResult = ChangeKeyService.replaceAt(line, 28, 'F#', 'E');

            var test = 'D              Hm       G D/F#G';
            expect(test).toEqual(lResult);
        });
        it("should change row3", function() {
            var line = 'C              Am       F C/F#mA';

            var lResult = ChangeKeyService.replaceAt(line, 28, 'E', 'F#');

            var test = 'C              Am       F C/Em A';
            expect(test).toEqual(lResult);
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

            expect(test).toEqual(result);
        });

        it("should change key from C to D", function() {
            var data = '\nD              Hm       G D/F#A\n' +
                       'Dette er min lengsel å ære deg\n' +
                       '    D        Hm           Asus4 A\n' +
                       'Av hele mitt hjerte tilbe deg';

            var section = {};
            section.key = 'D';
            section.tokey = 'C';
            section.data = data;
            var result = ChangeKeyService.changeKey(section, false);

            var test = '\nC              Am       F C/E G\n' +
                       'Dette er min lengsel å ære deg\n' +
                       '    C        Am           Gsus4 G\n' +
                       'Av hele mitt hjerte tilbe deg';

            expect(test).toEqual(result);
        });

        it("should change key from C to D and back", function() {
            var data = '\nC              Am       F C/E G\n' +
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

            expect(data).toEqual(result2);
        });

        it("should change key from Bb to A", function() {

            var data = '\n' +
                        'Bb    Bb/E     Eb/Bb  Bb   Cm7 Eb/F   Bb\n' +
                        'Helig, helig, he   -    lig är Herren Sebaot\n' +
                        'Bb              Cm7 F7 Bb   Eb     C7     F\n' +
                        'Helig, helig, he   -   lig    är Herren Sebaot\n' +
                        '        Bb                          Eb\n' +
                        'Hela jorden är full av din härlighet\n' +
                        '        C                  Ab/Bb    F\n' +
                        'Hela jorden är full av din härlighet\n' +
                        'F/Eb D         Cm   Bbsus4 Gm    G/F\n' +
                        'Hela jorden är full av din härlighet\n' +
                        'Eb    F7  Bb\n' +
                        'Ära vare Gud';

            var section = {};
            section.key = 'Bb';
            section.tokey = 'A';
            section.data = data;
            var result = ChangeKeyService.changeKey(section, false);

            var test = '\n' +
                        'A     A/D#     D/A    A    Hm7 D/E    A\n' +
                        'Helig, helig, he   -    lig är Herren Sebaot\n' +
                        'A               Hm7 E7 A    D      H7     E\n' +
                        'Helig, helig, he   -   lig    är Herren Sebaot\n' +
                        '        A                           D\n' +
                        'Hela jorden är full av din härlighet\n' +
                        '        H                  G/A      E\n' +
                        'Hela jorden är full av din härlighet\n' +
                        'E/D  C#        Hm   Asus4  F#m   F#/E\n' +
                        'Hela jorden är full av din härlighet\n' +
                        'D     E7  A\n' +
                        'Ära vare Gud';
            expect(test).toEqual(result);

            section.key = 'A';
            section.tokey = 'Bb';
            section.data = result;
            var result2 = ChangeKeyService.changeKey(section, false);
            expect(data).toEqual(result2);

        });

        it("should change key on I saw Mommy kissing Santa Claus", function() {
            var data = '\nBb         Ebmaj7              A7       Bb             G\n' +
                       'Oh, what a laugh it would have been, if Daddy had only seen\n' +
                       '  Cm7          F                Bb  F\n' +
                       'Mommy kissing Santa Claus last night';

            var section = {};
            section.key = 'Bb';
            section.tokey = 'Eb';
            section.data = data;
            var result = ChangeKeyService.changeKey(section, false);

            var test = '\nEb         Abmaj7              D7       Eb             C\n' +
                       'Oh, what a laugh it would have been, if Daddy had only seen\n' +
                       '  Fm7          Bb               Eb  Bb\n' +
                       'Mommy kissing Santa Claus last night';

            expect(test).toEqual(result);
        });

        it("should change key on You Dance over me", function() {
            var data = '\n-  G/B   C   Dsus         G/B  C       Dsus\n' +
                       'You Dance over me,  While I am    unaware,\n' +
                       '    G/B   C   Dsus           G/B    C          Dsus\n' +
                       'You sing  all around, but I never hear the sound';

            var section = {};
            section.key = 'G';
            section.tokey = 'A';
            section.data = data;
            var result = ChangeKeyService.changeKey(section, false);

            var test = '\n-  A/C#  D   Esus         A/C# D       Esus\n' +
                       'You Dance over me,  While I am    unaware,\n' +
                       '    A/C#  D   Esus           A/C#   D          Esus\n' +
                       'You sing  all around, but I never hear the sound';

            expect(test).toEqual(result);
        });

    });
});