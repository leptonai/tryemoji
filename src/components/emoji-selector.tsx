import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { FC } from "react";

const emojis = (data as unknown as any).emojis as { [key: string]: EmojiSkin };
export interface EmojiData {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
  skin: number;
  aliases: string[];
}

const exceptEmojis = [
  "bat",
  "feet",
  "coral",
  "snail",
  "bug",
  "ant",
  "bee",
  "beetle",
  "ladybug",
  "cricket",
  "cockroach",
  "spider",
  "scorpion",
  "mosquito",
  "fly",
  "worm",
  "microbe",
  "gorilla",
  "orangutan",
  "tiger2",
  "leopard",
  "zebra_face",
  "pig_nose",
  "camel",
  "black_cat",
  "water_buffalo",
  "rat",
  "spider_web",
  "service_dog",
  "mammoth",
  "frog",
  "crocodile",
  "lizard",
  "snake",
  "t-rex",
  "dragon",
  "empty_nest",
  "octopus",
  "ox",
  "wolf",
  "headstone",
  "moyai",
  "new_moon",
  "new_moon_with_face",
  "shrimp",
  "lobster",
  "fried_shrimp",
  "coffin",
  "drop_of_blood",
  "pinata",
  "performing_arts",
  "rock",
  "clubs",
  "chess_pawn",
  "spades",
  "knot",
  "bathtub",
  "shower",
  "white_flower",
  "hammer",
  "nazar_amulet",
  "hamsa",
  "hammer_and_wrench",
  "squid",
  "crab",
  "smoking",
  "dna",
  "musical_score",
  "musical_note",
  "notes",
  "dark_sunglasses",
  "kaaba",
  "old_key",
  "bikini",
  "one-piece_swimsuit",
  "sari",
];

interface EmojiSkin {
  id: string;
  name: string;
  keywords: string[];
  skins: { native: string; shortcodes: string; unified: string }[];
}

const categoryIcons = {
  categoryIcons: {
    "new-people": {
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M57.89 397.2c-6.262-8.616-16.02-13.19-25.92-13.19c-23.33 0-31.98 20.68-31.98 32.03c0 6.522 1.987 13.1 6.115 18.78l46.52 64C58.89 507.4 68.64 512 78.55 512c23.29 0 31.97-20.66 31.97-32.03c0-6.522-1.988-13.1-6.115-18.78L57.89 397.2zM496.1 352c-44.13 0-79.72 35.75-79.72 80s35.59 80 79.72 80s79.91-35.75 79.91-80S540.2 352 496.1 352zM640 99.38c0-13.61-4.133-27.34-12.72-39.2l-23.63-32.5c-13.44-18.5-33.77-27.68-54.12-27.68c-13.89 0-27.79 4.281-39.51 12.8L307.8 159.7C262.2 192.8 220.4 230.9 183.4 273.4c-24.22 27.88-59.18 63.99-103.5 99.63l56.34 77.52c53.79-35.39 99.15-55.3 127.1-67.27c51.88-22 101.3-49.87 146.9-82.1l202.3-146.7C630.5 140.4 640 120 640 99.38z"/></svg>',
    },
  },
};
const custom = [
  {
    id: "recommend",
    name: "Recommend",
    emojis: [
      emojis["baby_chick"],
      emojis["hatched_chick"],
      emojis["dog"],
      emojis["fox_face"],
      emojis["lion_face"],
      emojis["tiger"],
      emojis["hamster"],
      emojis["panda_face"],
      emojis["rabbit"],
      emojis["polar_bear"],
      emojis["tangerine"],
      emojis["watermelon"],
      emojis["pineapple"],
      emojis["beer"],
      emojis["curry"],
      emojis["cake"],
      emojis["snow_capped_mountain"],
      emojis["volcano"],
      emojis["bridge_at_night"],
      emojis["kiwifruit"],
      emojis["stadium"],
      emojis["foggy"],
      emojis["night_with_stars"],
      emojis["cityscape"],
      emojis["sunrise_over_mountains"],
      emojis["sunrise"],
      emojis["city_sunset"],
      emojis["city_sunrise"],
    ],
  },
  {
    id: "new-people",
    name: "People",
    emojis: [
      emojis["child"],
      emojis["boy"],
      emojis["girl"],
      emojis["adult"],
      emojis["person_with_blond_hair"],
      emojis["man"],
      emojis["bearded_person"],
      emojis["man_with_beard"],
      emojis["woman_with_beard"],
      emojis["red_haired_man"],
      emojis["curly_haired_man"],
      emojis["white_haired_man"],
      emojis["bald_man"],
      emojis["woman"],
      emojis["red_haired_woman"],
      emojis["red_haired_person"],
      emojis["curly_haired_woman"],
      emojis["curly_haired_person"],
      emojis["white_haired_woman"],
      emojis["white_haired_person"],
      emojis["bald_woman"],
      emojis["bald_person"],
      emojis["blond-haired-woman"],
      emojis["blond-haired-man"],
      emojis["older_adult"],
      emojis["older_man"],
      emojis["older_woman"],
      emojis["person_frowning"],
      emojis["man-frowning"],
      emojis["woman-frowning"],
      emojis["person_with_pouting_face"],
      emojis["man-pouting"],
      emojis["woman-pouting"],
      emojis["health_worker"],
      emojis["male-doctor"],
      emojis["female-doctor"],
      emojis["student"],
      emojis["male-student"],
      emojis["female-student"],
      emojis["teacher"],
      emojis["male-teacher"],
      emojis["female-teacher"],
      emojis["judge"],
      emojis["male-judge"],
      emojis["female-judge"],
      emojis["farmer"],
      emojis["male-farmer"],
      emojis["female-farmer"],
      emojis["cook"],
      emojis["male-cook"],
      emojis["female-cook"],
      emojis["mechanic"],
      emojis["male-mechanic"],
      emojis["female-mechanic"],
      emojis["office_worker"],
      emojis["male-office-worker"],
      emojis["female-office-worker"],
      emojis["scientist"],
      emojis["male-scientist"],
      emojis["female-scientist"],
      emojis["technologist"],
      emojis["male-technologist"],
      emojis["female-technologist"],
      emojis["artist"],
      emojis["male-artist"],
      emojis["female-artist"],
      emojis["astronaut"],
      emojis["male-astronaut"],
      emojis["female-astronaut"],
      emojis["sleuth_or_spy"],
      emojis["male-detective"],
      emojis["female-detective"],
      emojis["construction_worker"],
      emojis["male-construction-worker"],
      emojis["female-construction-worker"],
      emojis["person_with_crown"],
      emojis["prince"],
      emojis["princess"],
      emojis["person_in_tuxedo"],
      emojis["man_in_tuxedo"],
      emojis["woman_in_tuxedo"],
      emojis["bride_with_veil"],
      emojis["man_with_veil"],
      emojis["woman_with_veil"],
    ],
  },
];
export const EmojiSelector: FC<{ onSelect: (e: EmojiData) => void }> = ({
  onSelect,
}) => {
  return (
    <Picker
      exceptEmojis={exceptEmojis}
      dynamicWidth={true}
      custom={custom}
      categories={[
        "recommend",
        "new-people",
        "nature",
        "foods",
        "activity",
        "places",
        "objects",
      ]}
      theme="dark"
      categoryIcons={categoryIcons}
      data={data}
      onEmojiSelect={onSelect}
    />
  );
};
