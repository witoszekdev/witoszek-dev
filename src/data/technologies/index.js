import js from "./js";
import firebase from "./firebase";
import hereMaps from "./here-maps";
import react from "./react";
import vue from "./vue";
import electron from "./electron";
import { kebabCase } from "lodash-es";

const componentsMap = {
  js,
  firebase,
  hereMaps,
  react,
  vue,
  electron,
};

export default function getTechnology(name) {
  const searchName = kebabCase(name.toLowerCase());
  return componentsMap?.[searchName] ?? {};
}
