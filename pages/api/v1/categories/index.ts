import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

export interface Category {
  name: "work" | "sleep";
  videos: string[];
}
export interface GetCategoriesResponse {
  ok: boolean;
  categories?: Array<Category>;
  error?: string;
}

const getCategories = (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const works = {
      name: "work",
      videos: ["afeArmye71g", "lFDJ4pZrK2E", "mnsgRlp_rvI"],
    };
    const sleeps = {
      name: "sleep",
      videos: ["iu-CYRHgJ3M", "9dqMbGR5KKo", "rbiFzGIk67w"],
    };

    return response.status(200).json({
      ok: true,
      categories: [works, sleeps],
    });
  } catch (e) {
    console.error("[getCategories]", e);
    return response.status(500).json({
      ok: false,
      error: {
        code: "001",
        message: "Failed getting categories.",
      },
    });
  }
};

export default getCategories;
