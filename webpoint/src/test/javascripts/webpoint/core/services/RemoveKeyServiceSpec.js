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

        it("should removeValidKeyRows 1", function() {

            var data =  'Bb    Bb/E     Eb/Bb  Bb   Cm7 Eb/F   Bb\n' +
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
            var result = RemoveKeyService.removeValidKeyRows(false,data);

            var test =  'Helig, helig, he   -    lig är Herren Sebaot\n' +
                        'Helig, helig, he   -   lig    är Herren Sebaot\n' +
                        'Hela jorden är full av din härlighet\n' +
                        'Hela jorden är full av din härlighet\n' +
                        'Hela jorden är full av din härlighet\n' +
                        'Ära vare Gud\n' +
                        '';
            expect(test).toEqual(result);
        });

        it("should removeValidKeyRows 2", function() {

            var data =  'Am         Dm\n' +
                        'Du är en god Gud,\n' +
                        'G7        Cmaj7      E/H\n' +
                        'du är en god Gud,\n' +
                        'Am        Dm7\n' +
                        'du är en god Gud,\n' +
                        'E7                      Am\n' +
                        'full av barmhärtighet.';
            var result = RemoveKeyService.removeValidKeyRows(false,data);

            var test =  'Du är en god Gud,\n' +
                        'du är en god Gud,\n' +
                        'du är en god Gud,\n' +
                        'full av barmhärtighet.\n';
            expect(test).toEqual(result);

        });

        it("should removeValidKeyRows 3", function() {

            var data =  '    F                     C/D       Dm7\n' +
                        'Jag till - ber Dig alls - mäk - tig Gud\n' +
                        'Gm7       Bb/C    F\n' +
                        ' ing - en är som Du\n' +
                        'Bb/C F                 C/D       Dm7\n' +
                        ' Jag till - ber dig, å fri - dens Kung\n' +
                        'Gm7               Bbmaj/C    C\n' +
                        ' Och mitt hjär-ta ro - par ut';
            var result = RemoveKeyService.removeValidKeyRows(false,data);

            var test =  'Jag till - ber Dig alls - mäk - tig Gud\n' +
                        ' ing - en är som Du\n' +
                        ' Jag till - ber dig, å fri - dens Kung\n' +
                        ' Och mitt hjär-ta ro - par ut\n';
            expect(test).toEqual(result);
        });

        it("should removeValidKeyRows 4", function() {

            var data = 'D        A/C#           Am/C      H7\n' +
                       'Jesus, Du är underbar\n' +
                       'Em      Em7           Asus A\n' +
                       'Jesus, Du är underbar\n' +
                       '           D                 A/E\n' +
                       'Det är Dig som jag älskar,\n' +
                       '          F#m-5       H7                   Em\n' +
                       'det är Dig jag vill ge allt som jag har.\n' +
                       '     G/A              A7    D\n' +
                       'O Jesus,  Du är underbar';
            var result = RemoveKeyService.removeValidKeyRows(false,data);

            var test = 'Jesus, Du är underbar\n' +
                       'Jesus, Du är underbar\n' +
                       'Det är Dig som jag älskar,\n' +
                       'det är Dig jag vill ge allt som jag har.\n' +
                       'O Jesus,  Du är underbar\n';
            expect(test).toEqual(result);
        });

        it("should removeValidKeyRows 5", function() {

            var data = 'D        A/C#           Am/C      H7\n' +
                       'Jesus, Du är underbar\n' +
                       'Em      Em7           Asus A\n' +
                       'Jesus, Du är underbar\n' +
                       '           D                 A/E\n' +
                       'Det är Dig som jag älskar,\n' +
                       '                          \n' +
                       '          F#m-5       H7                   Em\n' +
                       'det är Dig jag vill ge allt som jag har.\n' +
                       '     G/A              A7    D\n' +
                       'O Jesus,  Du är underbar';
            var result = RemoveKeyService.removeValidKeyRows(false,data);

            var test = 'Jesus, Du är underbar\n' +
                       'Jesus, Du är underbar\n' +
                       'Det är Dig som jag älskar,\n' +
                       '                          \n' +
                       'det är Dig jag vill ge allt som jag har.\n' +
                       'O Jesus,  Du är underbar\n';
            expect(test).toEqual(result);
        });

        it("should validKeyRow 1", function() {

            var line = 'D   A#sus     A/C#           Am/C      H7';
            var result = RemoveKeyService.findValidKeyRow(line);
            expect(true).toEqual(result);

            var line = 'D   A#sus4     Am7/C#     Am/C      H7';
            var result = RemoveKeyService.findValidKeyRow(line);
            expect(true).toEqual(result);

            var line = 'Dmaj7   A#sus4     Am7/C#     Am/C      H7';
            var result = RemoveKeyService.findValidKeyRow(line);
            expect(true).toEqual(result);

            var line = 'Dmaj7   A#sus4     Am7/C#     Am/C      H7';
            var result = RemoveKeyService.findValidKeyRow(line);
            expect(true).toEqual(result);

            var line = 'Bbmaj  Dsus    Ebmaj';
            var result = RemoveKeyService.findValidKeyRow(line);
            expect(true).toEqual(result);

            var line = 'BbmajDsus  Gb/Eb  Ebmaj';
            var result = RemoveKeyService.findValidKeyRow(line);
            expect(true).toEqual(result);

        });

        it("should not validKeyRow 2", function() {

            // Him-me-lens son kär-lek-ens ge-stalt så o-fatt-bar i nåd
            var line = 'Him-me-lens son kär-lekens ge-stalt så o-fatt-bar i nåd';
            var result = RemoveKeyService.findValidKeyRow(line);
            expect(false).toEqual(result);

            // Värl-den har ing-et som jag sö-ker ba-ra Je-sus jag be-hö-ver
            var line = 'Värl-den har ing-et som jag sö-ker ba -ra Je-sus jag be-hö-ver';
            var result = RemoveKeyService.findValidKeyRow(line);
            expect(false).toEqual(result);

            //vär-de-rar in-get an-nat hög-re ba-ra Je-sus jag be-hö-ver
            var line = 'vär-de-rar in-get an-nat hög-re bara Je-sus jag be-hö-ver ';
            var result = RemoveKeyService.findValidKeyRow(line);
            expect(false).toEqual(result);

            var line = 'Dette lengsel deg';
            var result = RemoveKeyService.findValidKeyRow(line);
            expect(false).toEqual(result);

            var line = '[Chorus]';
            var result = RemoveKeyService.findValidKeyRow(line);
            expect(false).toEqual(result);
        });

       it("should not validKeyRow 2", function() {
            var line = 'Beundransvärd,  Halleluja';
            var result = RemoveKeyService.findValidKeyRow(line);
            expect(false).toEqual(result);

            var line = 'CBb/DF/A           Am       F C/F#mA';
            var result = RemoveKeyService.findValidKeyRow(line);
            expect(true).toEqual(result);

        });

    });
});