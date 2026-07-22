import { Baloo_2, Nunito } from "next/font/google";

// Partagées par les deux root layouts : le site ([lang]) et le panneau /admin.
export const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const fontVariables = `${baloo.variable} ${nunito.variable}`;
