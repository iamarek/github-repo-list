/** Returns date in format needed for GitHub API (2022-12-24) */
const getFormattedDate = (date: Date) =>
  `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
    "0" + date.getDate()
  ).slice(-2)}`;

export default getFormattedDate;
