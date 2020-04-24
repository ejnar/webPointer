describe("webpoint.core module", function() {

    beforeEach(angular.mock.module('webpoint.core', function($provide) {

    }));

    describe('ChangeKeyService', function() {
        var ChangeKeyService;

        beforeEach(angular.mock.inject(function(_ChangeKeyService_) {
            ChangeKeyService = _ChangeKeyService_;
        }));

        it('should be injected', inject(function () {
            expect(ChangeKeyService).toBeDefined();
        }));

        it("change complex key", function() {
            var data = 'Em(b5)/Bb          A7+  A7';
            var section = {};
            section.key = 'C';
            section.tokey = 'D';
            section.data = data;
            var result = ChangeKeyService.changeKey(section, false);
            var test = 'F#m(b5)/C          H7+  H7';
            expect(test).toEqual(result);
        });

        it("change complex key", function() {
            var data = 'Em(b5)/Bb          A7+  A7';
            var section = {};
            section.key = 'C';
            section.tokey = 'C#';
            section.data = data;
            var result = ChangeKeyService.changeKey(section, false);
            var test = 'Fm(b5)/B           Bb7+ Bb7';
            expect(test).toEqual(result);
        });

        it("change complex key", function() {
            var data = 'F#m(b5)/C          H7+  H7';
            var section = {};
            section.key = 'D';
            section.tokey = 'C';
            section.data = data;
            var result = ChangeKeyService.changeKey(section, false);
            var test = 'Em(b5)/Bb          A7+  A7';
            expect(test).toEqual(result);
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
            var data = '\n  G/B   C   Dsus         G/B  C       Dsus\n' +
                       'You Dance over me,  While I am    unaware,\n' +
                       '    G/B   C   Dsus           G/B    C          Dsus\n' +
                       'You sing  all around, but I never hear the sound';

            var section = {};
            section.key = 'G';
            section.tokey = 'A';
            section.data = data;
            var result = ChangeKeyService.changeKey(section, false);

            var test = '\n  A/C#  D   Esus         A/C# D       Esus\n' +
                       'You Dance over me,  While I am    unaware,\n' +
                       '    A/C#  D   Esus           A/C#   D          Esus\n' +
                       'You sing  all around, but I never hear the sound';

            expect(test).toEqual(result);
        });

        it("should change key on Du är en stor Gud F to D", function() {

            var data = 'Am       Dm\n'
                       'Du är en god Gud,\n'
                       'G7      Cmaj7   E/H\n'
                       'du är en god Gud,\n'
                       'Am       Dm7\n'
                       'du är en god Gud,\n'
                       'E7                Am\n'
                       'full av barmhärtighet.';
            var section = {};
            section.key = 'F';
            section.tokey = 'D';
            section.data = data;
            var result = ChangeKeyService.changeKey(section, false);
            var test = 'F#m      Hm\n'
                       'Du är en god Gud,\n'
                       'E7      Amaj7   C#/G#\n'
                       'du är en god Gud,\n'
                       'F#m      Hm7\n'
                       'du är en god Gud,\n'
                       'C#7               F#m\n'
                       'full av barmhärtighet.';

            expect(test).toEqual(result);
        });

        it("should change key on You Dance over me", function() {
            var data = '\n  G/B   C   D/G\n' +   //
                       'You Dance over me,  While I am    unaware';

            var section = {};
            section.key = 'G';
            section.tokey = 'A';
            section.data = data;
            var result = ChangeKeyService.changeKey(section, false);
                        //  A/C# D   E/A
            var test = '\n  A/C#  D   E/A\n' +   //
                       'You Dance over me,  While I am    unaware';

            expect(test).toEqual(result);
        });

        it("should change key on Du är en stor Gud F to D", function() {

            var data = 'AmHm      Dm\n'
                       'Du är en god Gud,\n'
                       'G7      Cmaj7   E/H\n'
                       'du är en god Gud';
            var section = {};
            section.key = 'F';
            section.tokey = 'D';
            section.data = data;
            var result = ChangeKeyService.changeKey(section, false);
                     // F#mG#m      Hm
            var test = 'F#mG#m    Hm\n'
                       'Du är en god Gud,\n'
                       'E7      Amaj7   C#/G#\n'
                       'du är en god Gud';

            expect(test).toEqual(result);
        });

        it("should change key on Du är en stor Gud D to F", function() {

            var data = 'F#mG#m    Hm\n'
                       'Du är en god Gud,\n'
                       'E7      Amaj7   C#/G#\n'
                       'du är en god Gud';
            var section = {};
            section.key = 'D';
            section.tokey = 'F';
            section.data = data;
            var result = ChangeKeyService.changeKey(section, false);
                     // F#mG#m    Hm
                      //Am Bm      Dm
            var test = 'Am Bm     Dm\n'
                       'Du är en god Gud,\n'
                       'G7      Cmaj7   E/H\n'
                       'du är en god Gud';

            expect(test).toEqual(result);
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
                       //A     A/D#     D/A   A    Hm7 D/E    A
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

        it("should change key on Hela jorden är full D to F", function() {

            var data = '\n' +
                       'F/Eb D         Cm   Bbsus4 Gm    G/F\n' +
                       'Hela jorden är full av din härlighet\n';

            var section = {};
            section.key = 'Bb';
            section.tokey = 'A';
            section.data = data;
            var result = ChangeKeyService.changeKey(section, false);

            var test = '\n' +
                       'E/D  C#        Hm   Asus4  F#m   F#/E\n' +
                       'Hela jorden är full av din härlighet\n';

            expect(test).toEqual(result);
        });

        it("should change row3", function() {
            var data = 'CBb/DF/A           Am       F C/F#mA';
            var section = {};
            section.key = 'C';
            section.tokey = 'D';
            section.data = data;
            var result = ChangeKeyService.changeKey(section, false);
                      //DC/EG/H            Hm       G D/G#mH
            var test = 'DC/EG/H            Hm       G D/G#mH';
            expect(test).toEqual(result);
        });

        it("should change key on Han är på tronen G to F", function() {

            var data = 'C#dim     G/D     E7         A7  D7        C/G          \n'
                       ' Han har  ej förändrat sig,  han är på tro-nen.';

            var section = {};
            section.key = 'G';
            section.tokey = 'F';
            section.data = data;
            var result = ChangeKeyService.changeKey(section, false);

            var test = 'Bdim      F/C     D7         G7  C7        Bb/F         \n'
                       ' Han har  ej förändrat sig,  han är på tro-nen.';
            expect(test).toEqual(result);
        });


        it("should change key from G to F", function() {

            var data = '\n' +
                        '          Dadd4               Em\n' +
                        'Där Jesus led,    och för mig dog';

            var section = {};
            section.key = 'G';
            section.tokey = 'F';
            section.data = data;
            var result = ChangeKeyService.changeKey(section, false);

            var test = '\n' +
                        '          Cadd4               Dm\n' +
                        'Där Jesus led,    och för mig dog';
            expect(test).toEqual(result);

            section.key = 'F';
            section.tokey = 'G';
            section.data = result;
            var result2 = ChangeKeyService.changeKey(section, false);
            expect(data).toEqual(result2);

        });


    });
});