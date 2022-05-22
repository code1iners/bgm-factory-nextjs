import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

interface GetBgmListRequest extends NextApiRequest {
  query: {
    category: "work" | "sleep";
  };
}

export interface GetBgmResponse {
  videos: string[];
}

const getBgmList = (request: GetBgmListRequest, response: NextApiResponse) => {
  try {
    if (!request.query.category) {
      return response.status(400).json({
        ok: false,
        error: "Category is required.",
      });
    }

    const { category } = request.query;

    switch (category) {
      case "sleep":
        return response.status(200).json({
          ok: true,
          videos: ["iu-CYRHgJ3M", "9dqMbGR5KKo", "rbiFzGIk67w"],
        });
      case "work":
        return response.status(200).json({
          ok: true,
          videos: ["afeArmye71g", "lFDJ4pZrK2E", "mnsgRlp_rvI"],
        });
    }
  } catch (e) {
    console.error("[getBgmList]", e);
    return response.status(500).json({
      ok: false,
      error: {
        code: "001",
        message: "",
      },
    });
  }
};

export default getBgmList;
