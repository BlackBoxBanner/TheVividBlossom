import {Cardo, Outfit, EB_Garamond} from "next/font/google";

export const outfit = Outfit({weight: "400", style: "normal", subsets: ["latin"]})
export const cardo = Cardo({weight: "400", subsets: ["greek"], style: "italic"})
export const outfitLabel = Outfit({weight: "500", style: ["normal"], subsets: ["latin"]});
export const outfitStrong = Outfit({weight: "600", style: ["normal"], subsets: ["latin"]});

export const EbGaramond = EB_Garamond({weight: "500", style: "normal", subsets: ["latin"]})