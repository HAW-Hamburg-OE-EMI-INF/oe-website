import type { FacultyId, StudiengangEntry, StudiengangId, StudiengangPageId } from "../types/types";
import { faculties } from "./faculty";

//
// EDIT AREA START
//

//** general information about eaach study program */
export const studiengaenge = {
  ET: {
    name: "Elektrotechnik und Informationstechnik",
    short: "ET",
    degree: "B.Sc.",
    faculty: faculties.EMI,
    details: {
      entryId: "et",
      base: "/studiengang",
    },
  },
  IE: {
    name: "Information Engineering",
    short: "IE",
    degree: "B.Sc.",
    faculty: faculties.EMI,
    details: {
      entryId: "ie",
      base: "/studiengang",
    },
  },
  MT: {
    name: "Medientechnik",
    short: "MT",
    degree: "B.Sc.",
    faculty: faculties.EMI,
    details: {
      entryId: "mt",
      base: "/studiengang",
    },
  },
  REE: {
    name: "Regenerative Energiesysteme und Energiemanagement",
    short: "REE",
    degree: "B.Sc.",
    faculty: faculties.EMI,
    details: {
      entryId: "ree",
      base: "/studiengang",
    },
  },
  AI: {
    name: "Angewandte Informatik",
    short: "AI",
    degree: "B.Sc.",
    faculty: faculties.INF,
    details: {
      entryId: "ai",
      base: "/studiengang",
    },
  },
  ITS: {
    name: "Informatik Technischer Systeme",
    short: "ITS",
    degree: "B.Sc.",
    faculty: faculties.INF,
    details: {
      entryId: "its-ecs",
      base: "/studiengang",
    },
  },
  ECS: {
    name: "European Computer Science",
    short: "ECS",
    degree: "B.Sc.",
    faculty: faculties.INF,
    details: {
      entryId: "its-ecs",
      base: "/studiengang",
    },
  },
  WI: {
    name: "Wirtschaftsinformatik",
    short: "WI",
    degree: "B.Sc.",
    faculty: faculties.INF,
    details: {
      entryId: "wi",
      base: "/studiengang",
    },
  },
  MI: {
    name: "Medieninformatik",
    short: "MI",
    degree: "B.Sc.",
    faculty: faculties.INF,
    details: {
      entryId: "mi",
      base: "/studiengang",
    },
  },
  BIM: {
    name: "Bibliotheks- und Informationsmanagement",
    short: "BIM",
    degree: "B.A.",
    faculty: faculties.INF,
    details: {
      entryId: "bim",
      base: "/studiengang",
    },
  },
  "M-INF": {
    name: "Master Informatik",
    short: "M-INF",
    degree: "M.Sc.",
    faculty: faculties.INF,
    details: {
      entryId: "m-inf",
      base: "/studiengang",
    },
  },
} satisfies Record<StudiengangId, StudiengangEntry>;

/** list of all study programs for the faculty of EMI */
export const studiengaengeEMI: StudiengangEntry[] = [
  studiengaenge.ET,
  studiengaenge.IE,
  studiengaenge.MT,
  studiengaenge.REE,
];

/** list of all bachelor study programs for the faculty of INF */
export const studiengaengeBachelorINF: StudiengangEntry[] = [
  studiengaenge.AI,
  studiengaenge.ITS,
  studiengaenge.ECS,
  studiengaenge.WI,
  studiengaenge.MI,
  studiengaenge.BIM,
];

/** list of all study programs for the faculty of INF (bachelor + master) */
export const studiengaengeINF: StudiengangEntry[] = [
  ...studiengaengeBachelorINF,
  studiengaenge["M-INF"],
];

//
// EDIT AREA END
//

/** map study programs to their faculties */
export const studiengaengeByFaculty: Record<FacultyId, StudiengangEntry[]> = {
  EMI: studiengaengeEMI,
  INF: studiengaengeINF,
};

/** map study program page ids to their corresponding study programs (1 or 2 study programs per page) */
export const studiengaengeByPage: Record<
  StudiengangPageId,
  [StudiengangEntry] | [StudiengangEntry, StudiengangEntry]
> = {
  et: [studiengaenge.ET],
  ie: [studiengaenge.IE],
  mt: [studiengaenge.MT],
  ree: [studiengaenge.REE],
  ai: [studiengaenge.AI],
  "its-ecs": [studiengaenge.ITS, studiengaenge.ECS],
  wi: [studiengaenge.WI],
  bim: [studiengaenge.BIM],
  mi: [studiengaenge.MI],
  "m-inf": [studiengaenge["M-INF"]],
};

export type StudiengangByPageValue = (typeof studiengaengeByPage)[StudiengangPageId];

export function getStudiengangPageIdsByFaculty(facultyId: FacultyId): StudiengangPageId[] {
  const pageIds = Object.keys(studiengaengeByPage) as StudiengangPageId[];
  return pageIds.filter((id) => studiengaengeByPage[id][0].faculty.short === facultyId);
}
