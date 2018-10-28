describe("webpoint.core module", function() {

    beforeEach(angular.mock.module('webpoint.core', function($provide) {
    }));

    describe('RemoveKeyService', function() {
        var RemoveKeyService;
        beforeEach(angular.mock.inject(function (_RemoveKeyService_) {
            RemoveKeyService = _RemoveKeyService_;
        }));

        it('should be injected', inject(function () {
            expect(RemoveKeyService).toBeDefined();
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

        it("should remove keys", function() {

            var data = '\n' +
                        'Am         Dm\n' +
                        'Du är en god Gud,\n' +
                        'G7        Cmaj7      E/H\n' +
                        'du är en god Gud,\n' +
                        'Am        Dm7\n' +
                        'du är en god Gud,\n' +
                        'E7                      Am\n' +
                        'full av barmhärtighet.';
            var result = RemoveKeyService.removeKeys(false,data);

            var test = '\n' +
                        'Du är en god Gud,\n' +
                        'du är en god Gud,\n' +
                        'du är en god Gud,\n' +
                        'full av barmhärtighet.\n' +
                        '';
            expect(test).toEqual(result);

        });

        it("should remove keys", function() {

            var data = '\n' +
                '    F                     C/D       Dm7\n' +
                'Jag till - ber Dig alls - mäk - tig Gud\n' +
                'Gm7       Bb/C    F\n' +
                ' ing - en är som Du\n' +
                'Bb/C F                 C/D       Dm7\n' +
                ' Jag till - ber dig, å fri - dens Kung\n' +
                'Gm7               Bbmaj/C    C\n' +
                ' Och mitt hjär-ta ro - par ut';
            var result = RemoveKeyService.removeKeys(false,data);

            var test = '\n' +
                'Jag till - ber Dig alls - mäk - tig Gud\n' +
                ' ing - en är som Du\n' +
                ' Jag till - ber dig, å fri - dens Kung\n' +
                ' Och mitt hjär-ta ro - par ut\n' +
                '';
            expect(test).toEqual(result);
        });
    });
});