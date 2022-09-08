// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Repository } from "../../types/types";
import getFormattedDate from "../../utils/getFormattedDate";

type Data =
  | Repository[]
  | {
      error: String;
    };

type GitHubData = {
  total_count: number;
  incomplete_results: boolean;
  items: Record<string, unknown>[];
};

/** Only send needed data on client-side */
const getFormattedData = (data: GitHubData): Repository[] => {
  return data.items.map(
    ({ description, html_url, id, language, name, stargazers_count }) => {
      return {
        description,
        html_url,
        id,
        language,
        name,
        stargazers_count,
      } as Repository;
    }
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const startDate = new Date();
  startDate.setDate(new Date().getDate() - 7);
  const formattedStartDate = getFormattedDate(startDate);

  await fetch(
    `https://api.github.com/search/repositories?q=created:%3E${formattedStartDate}&sort=stars&order=desc`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(response.statusText);
    })
    .then((data) => {
      const formattedData = getFormattedData(data);
      res.status(200).json(formattedData);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Error during fetching GitHub repositories. Try again",
      });
    });
}
