import { studiengaengeByPage } from "../data/studiengaenge";
import type { RoadmapData, RoadmapBuilderData } from "../types/types";

export const roadmapBuilder = (builder: RoadmapBuilderData): RoadmapData => {
  if (builder.common.days.length !== builder.days.length) {
    throw new Error("The number of days in commonData and roadmapData must be equal");
  }

  const { common, studiengang, room, days } = builder;
  const studiengaenge = studiengaengeByPage[studiengang];
  const studiengangName = studiengaenge.map((studiengang) => studiengang.short).join("/");

  return {
    metadata: {
      title: "Roadmap",
      subtitle: `OE ${common.semester} ${studiengangName} Roadmap`,
      room,
    },
    days: days.flatMap((day, index) => ({
      ...common.days[index],
      ...day,
    })),
  };
};
