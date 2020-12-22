export class StagAktualniObdobiInfoModel {
    obdobi: string;
    akademRok: string;
    semestrInteligentne: string;
    akademRokInteligentne: string;
    posledniVyucovaciDenRoku: PosledniVyucovaciDenRokuModel;
    posledniDenSemestruInteligentne: PosledniDenSemestruInteligentneModel;
    posledniDenZimnihoZkouskoveho: PosledniDenZimnihoZkouskovehoModel;
    posledniDenLetnihoZkouskoveho: PosledniDenLetnihoZkouskovehoModel;
    prvniDenStavajicihoAkademickehoRoku: PrvniDenStavajicihoAkademickehoRokuModel;
    posledniDenStavajicihoAkademickehoRoku: PosledniDenStavajicihoAkademickehoRokuModel;
}

export class PosledniVyucovaciDenRokuModel {
    value: string;
}

export class PosledniDenSemestruInteligentneModel {
    value: string;
}

export class PosledniDenZimnihoZkouskovehoModel {
    value: string;
}

export class PosledniDenLetnihoZkouskovehoModel {
    value: string;
}

export class PrvniDenStavajicihoAkademickehoRokuModel {
    value: string;
}

export class PosledniDenStavajicihoAkademickehoRokuModel {
    value: string;
}
