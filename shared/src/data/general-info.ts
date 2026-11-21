import type { FacultyId, OeInfoCardData, OeStartEvent } from "../types/types";
import { faculties } from "./faculty";
import { studiengaenge } from "./studiengaenge";

//
// EDIT AREA START
//

/** start and end date of the OE-Week */
const oeWeekData: Omit<OeInfoCardData, "faculty" | "studiengaenge" | "startEvent"> = {
  startDate: "05.10.2026",
  endDate: "08.10.2026",
};

const commonStartEventData: Omit<OeStartEvent, "time"> = {
  date: "05.10.2026",
  building: "Berliner Tor 21",
  buildingShort: "BT21",
  room: "der Aula",
  mapsUrl: "https://maps.app.goo.gl/aEXW4oQkYzA13sATA",
};

/** OE info card data for the faculty EMI */
export const oeInfoCardDataEMI: OeInfoCardData = {
  ...oeWeekData,
  studiengaenge: [studiengaenge.ET, studiengaenge.IE, studiengaenge.MT, studiengaenge.REE],
  startEvent: {
    ...commonStartEventData,
    time: "9:30 Uhr",
  },
  faculty: faculties.EMI,
};

/** OE info card data for the faculty INF */
export const oeInfoCardDataINF: OeInfoCardData = {
  ...oeWeekData,
  studiengaenge: [
    studiengaenge.AI,
    studiengaenge.WI,
    studiengaenge.ITS,
    studiengaenge.ECS,
    studiengaenge.MI,
    studiengaenge.BIM,
  ],
  startEvent: {
    ...commonStartEventData,
    time: "10:30 Uhr",
  },
  faculty: faculties.INF,
};

//
// EDIT AREA END
//

export const oeInfoCardDataByFaculty: Record<FacultyId, OeInfoCardData> = {
  EMI: oeInfoCardDataEMI,
  INF: oeInfoCardDataINF,
};
