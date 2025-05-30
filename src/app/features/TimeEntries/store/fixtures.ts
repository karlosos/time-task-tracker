import { EntityState } from "@reduxjs/toolkit";
import { TimeEntry } from "./slice";
import { SettingsState, settingsInitialState } from "../../Settings/slice";

export const timeEntriesFixture: EntityState<TimeEntry, string> = {
  ids: [
    "9d58",
    "72ed",
    "5aee",
    "6d19",
    "e7ed",
    "65d0",
    "1f30",
    "c50b",
    "237f",
    "e843",
    "6373",
    "ac0b",
  ],
  entities: {
    "6373": {
      id: "6373",
      text: "DX1-4444: Task 4 with some logged entries",
      startTime: 1660930562428,
      logged: false,
      stopTime: 1660930740041,
    },
    "9d58": {
      id: "9d58",
      text: "DX1-1: Task 1",
      startTime: 1660922866013,
      logged: false,
      stopTime: 1660930273421,
    },
    "72ed": {
      id: "72ed",
      text: "DX1-2: Task 2 with multiple entries",
      startTime: 1660930300542,
      logged: false,
      stopTime: 1660930302902,
    },
    "5aee": {
      id: "5aee",
      text: "DX1-2: Task 2 with multiple entries",
      startTime: 1660867856898,
      logged: false,
      stopTime: 1660869600454,
    },
    "6d19": {
      id: "6d19",
      text: "DX1-2: Task 2 with multiple entries",
      startTime: 1660907341526,
      logged: false,
      stopTime: 1660911605044,
    },
    e7ed: {
      id: "e7ed",
      text: "DX1-1: Task 1",
      startTime: 1660836600000,
      logged: false,
      stopTime: 1660843992000,
    },
    "65d0": {
      id: "65d0",
      text: "DX1-3: Task 3 with logged entries",
      startTime: 1660930513236,
      logged: true,
      stopTime: 1660930516589,
    },
    "1f30": {
      id: "1f30",
      text: "DX1-3: Task 3 with logged entries",
      startTime: 1660930518813,
      logged: true,
      stopTime: 1660930523610,
    },
    c50b: {
      id: "c50b",
      text: "DX1-3: Task 3 with logged entries",
      startTime: 1660930524996,
      logged: true,
      stopTime: 1660930528450,
    },
    "237f": {
      id: "237f",
      text: "DX1-4444: Task 4 with some logged entries",
      startTime: 1660930552524,
      logged: false,
      stopTime: 1660930554964,
    },
    e843: {
      id: "e843",
      text: "DX1-4444: Task 4 with some logged entries",
      startTime: 1660930556084,
      logged: true,
      stopTime: 1660930561089,
    },
    ac0b: {
      id: "ac0b",
      text: "DX1-2: Task 2 with multiple entries",
      startTime: 1660845120000,
      logged: false,
      stopTime: 1660845124000,
    },
  },
};

export const settingsFixture: SettingsState = settingsInitialState;
