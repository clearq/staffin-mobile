import { Theme } from "@rneui/base";

export function getStatusString(stateId: number, t: any) {
  switch (stateId) {
    case 1:
      return t("dropdown-Active");
    case 2:
      return t("dropdown-inProgress");
    case 4:
      return t("dropdown-status-rejected");

    default:
      return "No data";
  }
}

export function getColorStatus(stateId: number, theme: Theme) {
  switch (stateId) {
    case 1:
      return theme.colors.warning;
    case 2:
      return theme.colors.divider;
    case 4:
      return theme.colors.error;

    default:
      return theme.colors.primary;
  }
}

export function convertMinutesToHours(minutes: number) {
  const hours = Math.floor(minutes / 60); // Get the whole number of hours
  const remainingMinutes = (minutes % 60).toFixed(0); // Get the remaining minutes

  return `${hours}:${remainingMinutes}`;
}

export const capitalizeFirstLetter = (str: string) => {
  if (!str || typeof str !== "string") return ""; // Return empty string if the input is not valid

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const convertTime = (time: number) => {
  // convert minutes to hours and minutes
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  // format hours and minutes to two digits with leading zeros
  if (hours === 0) return `${minutes.toFixed(0)} m`;
  if (minutes === 0) return `${hours.toFixed(0)} H`;

  return `${hours.toFixed(0)} H : ${minutes.toFixed(0)} m`;
};

export const formatCurrencyNumber = (number: number) => {
  const currency = "SEK";

  const formatter = new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: currency,
  });

  const formattedNumber = formatter.format(number);

  return formattedNumber;
};