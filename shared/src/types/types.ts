export type FacultyId = "EMI" | "INF";
export type StudiengangId =
  | "ET"
  | "IE"
  | "MT"
  | "REE"
  | "AI"
  | "ITS"
  | "ECS"
  | "WI"
  | "MI"
  | "BIM"
  | "M-INF";
export type StudiengangPageId =
  | "et"
  | "ie"
  | "mt"
  | "ree"
  | "ai"
  | "its-ecs"
  | "wi"
  | "mi"
  | "bim"
  | "m-inf";

export interface LinkCollectionEntry {
  label: string;
  href: string;
  note?: string;
  teamsCode?: string;
}

export interface StudiengangDetailsPage {
  entryId: StudiengangPageId;
  base: `/studiengang`;
}

export interface StudiengangEntry {
  name: string;
  short: StudiengangId;
  degree: string;
  faculty: FacultyEntry;
  details: StudiengangDetailsPage;
}

export interface FacultyEntry {
  id: FacultyId;
  name: string;
  short: string;
  contactEmail: string;
  website: string;
}

export interface OeStartEvent {
  date: string;
  time: string;
  building: string;
  buildingShort: string;
  room: string;
  mapsUrl: string;
}

export interface OeInfoCardData {
  studiengaenge: StudiengangEntry[];
  startDate: string;
  endDate: string;
  startEvent: OeStartEvent;
  faculty: FacultyEntry;
}

export interface RoadmapDay {
  weekday: string;
  date: string;
  start: string;
  end: string;
  items: string[];
  eveningProgram: string;
}

export interface RoadmapMetadata {
  title: string;
  subtitle: string;
  room: string;
}

export type CommonRoadmapDayData = Omit<RoadmapDay, "start" | "end" | "items">;

export type SpecificRoadmapDayData = Omit<RoadmapDay, "weekday" | "date" | "eveningProgram">;

export interface CommonRoadmapData {
  semester: string;
  days: CommonRoadmapDayData[];
}

export interface RoadmapData {
  metadata: RoadmapMetadata;
  days: RoadmapDay[];
}

export interface RoadmapBuilderData {
  common: CommonRoadmapData;
  studiengang: StudiengangPageId;
  room: string;
  days: SpecificRoadmapDayData[];
}
