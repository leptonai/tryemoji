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
];

interface EmojiSkin {
  id: string;
  name: string;
  keywords: string[];
  skins: { native: string; shortcodes: string; unified: string }[];
}

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
        "nature",
        "foods",
        "activity",
        "places",
        "objects",
      ]}
      theme="dark"
      data={data}
      onEmojiSelect={onSelect}
    />
  );
};
