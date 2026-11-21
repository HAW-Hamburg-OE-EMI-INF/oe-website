import type {
  CommonRoadmapData,
  RoadmapBuilderData,
  SpecificRoadmapDayData,
  StudiengangPageId,
} from "../types/types";

//
// EDIT AREA START
//

/** common data for all study programs */
const common: CommonRoadmapData = {
  semester: "SoSe 26",
  days: [
    {
      weekday: "Dienstag",
      date: "07.04",
      eveningProgram: "Bar Abend 🍻 in Allermöhe (Stellbrinkweg 30)",
    },
    {
      weekday: "Mittwoch",
      date: "08.04",
      eveningProgram: "Brettspielabend 🎲 mit Karaoke 🎤 auf dem Finkenau Campus",
    },
    {
      weekday: "Donnerstag",
      date: "09.04",
      eveningProgram: "Barabend 🍾🪩 (Borgfelder Straße 16)",
    },
    {
      weekday: "Freitag",
      date: "10.04",
      eveningProgram: "Party in Bergedorf (Ulmenliet 20) – Gratis für alle Erstsemesterstudenten",
    },
  ],
};

/** example roadmap data for one specific study program */
const demoDayData: SpecificRoadmapDayData[] = [
  {
    start: "10:00 Uhr",
    end: "16:00 Uhr",
    items: [
      "Begrüßung und Kennenlernen untereinander",
      "Euer Modulhandbuch und alle Online-Services der HAW 🛜",
      "AStA-Vorstellung",
    ],
  },
  {
    start: "9:00 Uhr",
    end: "16:00 Uhr",
    items: [
      "Mittag: 12:00 - 12:45 Uhr",
      "Prüfungsordnung um 13:30 Uhr! Anwesenheitspflicht ❗️",
      "Markt der Möglichkeiten (Hochschulsport ⚽️, studentische Gruppen und vieles mehr)",
    ],
  },
  {
    start: "9:00 Uhr",
    end: "open end",
    items: [
      "Laboranmeldungen für eure Kurse um 9:00 Uhr",
      "Stadt-Rallye mit Challenges und tollen Preisen 🏆",
    ],
  },
  {
    start: "10:00 Uhr",
    end: "15:00 Uhr",
    items: [
      "Bibliothekseinführung",
      "Weiteres Kennenlernen untereinander",
      "Gemütliches Ausklingen der OE zusammen",
    ],
  },
];

/** roadmap data per study program */
export const roadmapBuilderDataByPageId: Record<
  Exclude<StudiengangPageId, "m-inf">,
  RoadmapBuilderData
> = {
  et: {
    common,
    studiengang: "et",
    room: "Raum: 04.05 am Berliner Tor 7",
    days: demoDayData,
  },
  ie: {
    common,
    studiengang: "ie",
    room: "Raum: 05.60 am Berliner Tor 7",
    days: demoDayData,
  },
  mt: {
    common,
    studiengang: "mt",
    room: "Campus Finkenau",
    days: demoDayData,
  },
  ree: {
    common,
    studiengang: "ree",
    room: "Raum: 12.60 am Berliner Tor 7",
    days: demoDayData,
  },
  ai: {
    common,
    studiengang: "ai",
    room: "Raum: 10.60 am Berliner Tor 7",
    days: demoDayData,
  },
  "its-ecs": {
    common,
    studiengang: "its-ecs",
    room: "Raum: 10.01 am Berliner Tor 7",
    days: demoDayData,
  },
  wi: {
    common,
    studiengang: "wi",
    room: "Raum: 3.60 am Berliner Tor 7",
    days: demoDayData,
  },
  mi: {
    common,
    studiengang: "mi",
    room: "Campus Finkenau",
    days: demoDayData,
  },
  bim: {
    common,
    studiengang: "bim",
    room: "Campus Finkenau",
    days: demoDayData,
  },
};

//
// EDIT AREA END
//
