
 export declare interface Tablet {
    id: number;
    termek_nev: string;
    operacios_rendszer: string;
    processzor_orajel: number;
    processzormagok_szama: number;
    kijelzo_merete: number;
    kijelzo_felbontasa: string;
    ram_merete: number;
    ar: number;
  }
  
 export declare interface TabletKartyaProps {
    tablet: Tablet
    torles: boolean
 }