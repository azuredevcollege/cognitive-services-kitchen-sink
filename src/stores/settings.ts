import { defineStore } from "pinia";

export const useSettingsStore = defineStore({
  id: "settings",
  state: () => ({
    apikey: "",
    azureregion: "",
  }),
  persist: true,
});
