/** Identifier for a supported faculty. */
export type FacultyId = "EMI" | "INF";

/** Short identifier for a study program. */
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

/** URL slug identifier for a study program detail page. */
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

/** Link item displayed in a study program's link collection. */
export interface LinkCollectionEntry {
  /** Display text of the link. */
  label: string;
  /** Target URL. */
  href: string;
  /** Optional short description or hint. */
  note?: string;
  /** Optional Microsoft Teams join code. */
  teamsCode?: string;
}

/** Routing configuration for a study program's detail page. */
export interface StudiengangDetailsPage {
  /** Page slug used as the route parameter. */
  entryId: StudiengangPageId;
  /** Base URL path for study program pages. */
  base: `/studiengang`;
}

/** Metadata for a single study program. */
export interface StudiengangEntry {
  /** Full name of the study program. */
  name: string;
  /** Abbreviated study program identifier. */
  short: StudiengangId;
  /** Academic degree awarded (e.g., B.Sc., M.Sc.). */
  degree: string;
  /** Parent faculty. */
  faculty: FacultyEntry;
  /** Detail page routing info. */
  details: StudiengangDetailsPage;
}

/** Metadata for a faculty. */
export interface FacultyEntry {
  /** Faculty identifier. */
  id: FacultyId;
  /** Full name of the faculty. */
  name: string;
  /** Short faculty name or abbreviation. */
  short: string;
  /** Contact email address. */
  contactEmail: string;
  /** Official faculty website URL. */
  website: string;
}

/** Details for the orientation week kickoff event. */
export interface OeStartEvent {
  /** Event date. */
  date: string;
  /** Event start time. */
  time: string;
  /** Full building name or address. */
  building: string;
  /** Abbreviated building code (e.g., BT21). */
  buildingShort: string;
  /** Room name or number. */
  room: string;
  /** Google Maps link to the location. */
  mapsUrl: string;
}

/** Overview data for the orientation week info card. */
export interface OeInfoCardData {
  /** Study programs covered by this faculty's orientation week. */
  studiengaenge: StudiengangEntry[];
  /** Orientation week start date. */
  startDate: string;
  /** Orientation week end date. */
  endDate: string;
  /** Kickoff event details. */
  startEvent: OeStartEvent;
  /** Associated faculty. */
  faculty: FacultyEntry;
}

/** Schedule data for a single orientation week day. */
export interface RoadmapDay {
  /** Day of the week. */
  weekday: string;
  /** Calendar date. */
  date: string;
  /** Daily start time. */
  start: string;
  /** Daily end time. */
  end: string;
  /** List of scheduled activities. */
  items: string[];
  /** Evening social program description. */
  eveningProgram: string;
}

/** Header metadata for a study program's roadmap. */
export interface RoadmapMetadata {
  /** Roadmap title. */
  title: string;
  /** Subtitle (e.g., semester label). */
  subtitle: string;
  /** Default room for the study program. */
  room: string;
}

/** Shared day fields common across all study programs. */
export type CommonRoadmapDayData = Omit<RoadmapDay, "start" | "end" | "items">;

/** Study-program-specific schedule fields for a single day. */
export type SpecificRoadmapDayData = Omit<RoadmapDay, "weekday" | "date" | "eveningProgram">;

/** Shared roadmap configuration applied to multiple study programs. */
export interface CommonRoadmapData {
  /** Semester label (e.g., WiSe 2026/27). */
  semester: string;
  /** Common day metadata (weekday, date, evening program). */
  days: CommonRoadmapDayData[];
}

/** Complete roadmap data ready for rendering. */
export interface RoadmapData {
  /** Header metadata for the roadmap. */
  metadata: RoadmapMetadata;
  /** Ordered list of daily schedules. */
  days: RoadmapDay[];
}

/** Input structure used to assemble a complete {@link RoadmapData} object. */
export interface RoadmapBuilderData {
  /** Shared semester and day metadata. */
  common: CommonRoadmapData;
  /** Target study program page slug. */
  studiengang: StudiengangPageId;
  /** Default room for the study program. */
  room: string;
  /** Program-specific daily times and activities. */
  days: SpecificRoadmapDayData[];
}
