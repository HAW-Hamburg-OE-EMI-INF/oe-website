import type { FacultyEntry, FacultyId } from "../types/types";

export const faculties = {
  EMI: {
    id: "EMI",
    name: "Elektro-, Medien- und Informationstechnik",
    short: "EMI",
    contactEmail: "oe-emi@haw-hamburg.de",
    website: "https://oe-emi.de/",
  },
  INF: {
    id: "INF",
    name: "Informatik und Digitale Gesellschaft",
    short: "INF",
    contactEmail: "oe-inf@haw-hamburg.de",
    website: "https://oe.informatik.haw-hamburg.de/",
  },
} satisfies Record<FacultyId, FacultyEntry>;
