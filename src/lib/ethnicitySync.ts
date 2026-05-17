const STORAGE_KEY = "hb_ethnicity_profile";
const CALIB_KEY = "hb_ethnicity_calibration";

export function syncEthnicityToScannerStorage(ethnicity: string | undefined) {
  if (typeof window === "undefined" || !ethnicity) return;
  localStorage.setItem(STORAGE_KEY, ethnicity);
  if (localStorage.getItem(CALIB_KEY) === null) {
    localStorage.setItem(CALIB_KEY, "1");
  }
}

export function getScannerIframeSrc(ethnicity?: string) {
  const params = new URLSearchParams({ embed: "1" });
  if (ethnicity) params.set("ethnicity", ethnicity);
  return `/scanner/index.html?${params.toString()}`;
}
