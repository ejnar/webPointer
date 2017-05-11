describe("webpoint.core module", function() {

    beforeEach(angular.mock.module('webpoint.core', function($provide) {

    }));

    describe('RemoveKeyService', function() {
        var RemoveKeyService;

        beforeEach(angular.mock.inject(function(_RemoveKeyService_) {
            RemoveKeyService = _RemoveKeyService_;
        }));

        it("should remove keys", function() {

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

            var result = RemoveKeyService.removeKeys(false,data);

            var test = '\n' +
                        'Helig, helig, he   -    lig är Herren Sebaot\n' +
                        'Helig, helig, he   -   lig    är Herren Sebaot\n' +
                        'Hela jorden är full av din härlighet\n' +
                        'Hela jorden är full av din härlighet\n' +
                        'Hela jorden är full av din härlighet\n' +
                        'Ära vare Gud\n' +
                        '';

            expect(test).toEqual(result);

        });


//        - Bb Gm Fsus F
//        Din nåd är allt jag be - hö - ver //2 ~
//
//        Gm F Ebmaj
//        I Kristi kraft vill jag släp - pa mitt för - svar
//        Gm F Ebmaj
//        Läg - ga ner mitt allt tills det ba - ra är Du kvar
//        Cm Gm F
//        I min svag - het vis - ar Du för mig
//        Cm Gm
//        Att styr - kan som jag har kommer i - från Dig
//
//
//        Ebmaj Bb/D F/A Bb Eb Bb Fsus F
//        Hal - le - lu - ja, jag är om-fam-nad av Din nåd //~


    });
});