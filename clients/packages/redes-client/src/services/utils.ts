import {
  Relationships,
  Groups,
  Individual,
  MapaIndividualTicket,
  Group,
} from "../types";
import * as turf from "@turf/turf";

export const getSelectValues = (values: {
  [x: string]: { value: unknown; label: string } & string;
}): {
  [x: string]: string | number;
} =>
  Object.keys(values).reduce((newObj, old) => {
    const newValue =
      typeof values[old] === "object" && values[old] !== null
        ? values[old].value
        : values[old];
    return {
      ...newObj,
      [old]: newValue,
    };
  }, {});

export const getStates = (): Array<{ label: string; value?: string }> => [
  { label: "AC", value: "ac" },
  { label: "AL", value: "al" },
  { label: "AP", value: "ap" },
  { label: "AM", value: "am" },
  { label: "BA", value: "ba" },
  { label: "CE", value: "ce" },
  { label: "DF", value: "df" },
  { label: "ES", value: "es" },
  { label: "GO", value: "go" },
  { label: "MA", value: "ma" },
  { label: "MT", value: "mt" },
  { label: "MS", value: "ms" },
  { label: "MG", value: "mg" },
  { label: "PA", value: "pa" },
  { label: "PB", value: "pb" },
  { label: "PR", value: "pr" },
  { label: "PE", value: "pe" },
  { label: "PI", value: "pi" },
  { label: "RJ", value: "rj" },
  { label: "RN", value: "rn" },
  { label: "RS", value: "rs" },
  { label: "RO", value: "ro" },
  { label: "RR", value: "rr" },
  { label: "SC", value: "sc" },
  { label: "SP", value: "sp" },
  { label: "SE", value: "se" },
  { label: "TO", value: "to" },
];

export const encodeText = (input: string): string => encodeURIComponent(input);

export const parseNumber = (input: string): string => input.replace(/\D/g, "");

/**
 * @param name Inital letter that will agreggate with propriety name
 * @param obj Object that contains all key/value pairs
 * @return {"VFIRST_NAME": Test, "VEMAIL: "teste@nossas.org"}
 */
export const dicio = (
  name: string,
  obj: Record<string, any>
): Record<string, any> =>
  Object.keys(obj).reduce((acumulator, k) => {
    const key = k !== "agent" ? name + k : k;
    return {
      ...acumulator,
      [key.toUpperCase()]: obj[k],
    };
  }, {});

/**
 * @param msg Message set in rede_group settings
 * @param dicio Dicionary made to transpile msg using volunteer/recipient data
 * @return { string }
 */
export const customText = (msg = "", dicio: any): string => {
  const re = new RegExp(Object.keys(dicio).join("|"), "gi");

  return msg.replace(re, (matched) => dicio[matched]);
};

export const whatsappLink = (number: string, text: string): string =>
  `https://web.whatsapp.com/send?phone=55${number}&text=${encodeURIComponent(
    text
  )}`;

type MathArgs = {
  volunteer: Omit<Individual, "userStatus" | "ticketId" | "externalId">;
  recipient: Individual
}

type Result = {
  volunteerUrl: string;
  recipientUrl: string
}

export const createCustomWhatsappLink = (
  { volunteer, recipient }: MathArgs,
  agentName: string
): Result => {
  if (volunteer && recipient) {
    const messageDicio = {
      ...dicio("v", {
        ...volunteer,
        registeroccupation: volunteer.extras?.register_occupation,
        agent: agentName
      }),
      ...dicio("i", { ...recipient, agent: agentName }),
    };

    const volunteerText = customText(
      volunteer.group?.settings?.communication?.whatsapp,
      messageDicio
    );
    const recipientText = customText(
      recipient.group?.settings?.communication?.whatsapp,
      messageDicio
    );

    return {
      volunteerUrl: whatsappLink(
        volunteer.whatsapp || volunteer.phone || "0",
        volunteerText
      ),
      recipientUrl: whatsappLink(
        recipient.whatsapp || recipient.phone || "0",
        recipientText
      ),
    };
  }
  return { volunteerUrl: "", recipientUrl: "" };
};

type TicketsWithUsers = Array<{
  recipient: {
    name?: string;
    whatsapp?: string | null;
    state?: string;
    phone?: string | null;
    organization_id?: number;
    user_id?: number;
    ticketId: number;
  };
  volunteer: {
    name?: string;
    whatsapp?: string | null;
    state?: string;
    phone?: string | null;
    organization_id?: number;
    user_id?: number;
    ticketId: number;
  };
  createdAt: string;
}>;

export const fuseTicketsWithUsers = (
  tickets: Array<{
    volunteersUserId: number;
    individualsUserId: number;
    individualsTicketId: number;
    volunteersTicketId: number;
    created_at: string;
  }>,
  users: Array<{
    name: string;
    whatsapp: string;
    state: string;
    phone: string;
    organization_id: number;
    user_id: number;
  }>
): TicketsWithUsers => {
  return tickets.map((ticket) => {
    return {
      recipient: {
        ...users.find((user) => user.user_id === ticket.individualsUserId),
        ticketId: ticket.individualsTicketId,
      },
      volunteer: {
        ...users.find((user) => user.user_id === ticket.volunteersUserId),
        ticketId: ticket.volunteersTicketId,
      },
      createdAt: ticket.created_at,
    };
  });
};

type Organizations = {
  lawyer: number;
  therapist: number;
  individual: number;
};

const parseZendeskOrganizations = (input?: string) => JSON.parse(input || "");
export const zendeskOrganizations: Organizations = parseZendeskOrganizations(
  process.env.REACT_APP_ZENDESK_ORGANIZATIONS
);

export const getAgentZendeskUserId = (
  id?: number | null
): number | undefined => {
  switch (id) {
    case 281: //"Larissa"
      return 377510044432;
    case 346: //"Ana",
      return 377577169651;
    case 339: //"Gabriela",
      return 377511446392;
    case null:
    case undefined:
      return undefined;
    default:
      // "Voluntária"
      return 373018450472;
  }
};

export const getAgentFromZendeskUserId: Record<number, string> = {
  377510044432: "Larissa",
  377577169651: "Ana",
  377511446392: "Gabriela",
  373018450472: "Voluntária",
};

export const groupsToSelect = (
  groups: Groups
): Array<{ label: string; value: number }> => {
  return groups.map((group) => ({
    label: group.name,
    value: group.id,
  }));
};

export const deconstructAgent = (
  data?: Relationships
): Relationships | Array<never> => {
  if (!data) return [];
  return data.map((i: any) => ({
    ...i,
    agent: i.recipientTicket.agentId,
  }));
};

export const groupToOrganization: Record<number, number> = {
  7: zendeskOrganizations["therapist"],
  8: zendeskOrganizations["lawyer"],
  9: zendeskOrganizations["individual"],
};

export const MAPA_DO_ACOLHIMENTO_COMMUNITY = 40;

export const getVolunteerOrganizationId = (
  subject?: string
): number | undefined => {
  const str = typeof subject === "string" ? subject.toLowerCase() : "";
  const removeSpecialCaracters = str.replace(/[^\w\s]/gi, "");
  if (removeSpecialCaracters.indexOf("jurdico") !== -1)
    return zendeskOrganizations["lawyer"];
  if (removeSpecialCaracters.indexOf("psicolgico") !== -1)
    return zendeskOrganizations["therapist"];
  return undefined;
};

export const getVolunteerGroup = (
  groups: Group[],
  organizationId?: number
): Group | undefined => {
  if (zendeskOrganizations["lawyer"] === organizationId) {
    return groups.find((group) => group.name === "Advogadas");
  } else if (zendeskOrganizations["therapist"] === organizationId) {
    return groups.find((group) => group.name === "Psicólogas");
  }
  return undefined;
};

export const getMatchGroup = (
  groups: Groups,
  individual: Individual
): string => {
  if (typeof individual.organizationId !== "undefined") {
    return individual.organizationId !== zendeskOrganizations["individual"]
      ? "MSRs"
      : getVolunteerOrganizationId(individual.subject) ===
        zendeskOrganizations["lawyer"]
      ? "advogadas"
      : "psicólogas";
  }
  const group = groups.find((group) => {
    if (typeof individual.group !== "undefined") {
      return group.isVolunteer !== individual.group.isVolunteer;
    }
    return undefined;
  });
  return group?.name?.toLowerCase() || "sem nome";
};

export const stripIndividualFromData = (
  data: MapaIndividualTicket[]
): Individual[] =>
  data.map((d) => ({
    ...d,
    ...d.individual,
    coordinates: {
      latitude: d.individual.latitude,
      longitude: d.individual.longitude,
    },
  }));

type Coordinates = {
  latitude: string;
  longitude: string;
};

export const calcDistance = (
  pointA: number[],
  pointB: number[]
): number | undefined => {
  if (
    typeof pointA[0] !== "number" ||
    typeof pointA[1] !== "number" ||
    typeof pointB[0] !== "number" ||
    typeof pointB[1] !== "number" ||
    isNaN(pointA[0]) ||
    isNaN(pointA[1]) ||
    isNaN(pointB[0]) ||
    isNaN(pointB[1])
  ) {
    return undefined;
  }
  const a = turf.point(pointA);
  const b = turf.point(pointB);

  return Number(turf.distance(a, b));
};

export const addDistance = (
  coordinates: Coordinates,
  data?: Individual[]
): any =>
  data
    ? data
        .map((i: any) => {
          const pointA = [
            Number(coordinates.longitude),
            Number(coordinates.latitude),
          ];
          const pointB = [
            Number(i.coordinates.longitude),
            Number(i.coordinates.latitude),
          ];
          const distance = calcDistance(pointA, pointB);
          return {
            ...i,
            distance,
          };
        })
        .sort((a: any, b: any) => Number(a.distance) - Number(b.distance))
    : [];

export const addGroup = (data: Individual[], group?: Group): Individual[] =>
  data.map((i) => {
    return {
      ...i,
      group: group,
    };
  });
