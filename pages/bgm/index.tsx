import WebLayout from "@/components/layouts/web-layout";
import { useRouter } from "next/router";
import { GetBgmResponse } from "pages/api/v1/bgm";
import useSWR from "swr";

const BgmIndex = () => {
  const {
    query: { category },
  } = useRouter();

  const { data, error } = useSWR<GetBgmResponse>(
    `/api/v1/bgm?category=${category}`
  );
  console.log(data, error);

  return (
    <WebLayout>
      {data ? (
        <ul className="p-10 grid gap-10 responsive-grid">
          {data.videos.map((videoId, index) => (
            <li className="" key={videoId}>
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=${
                  index === 0 ? "0" : "0"
                }&controls=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </li>
          ))}
        </ul>
      ) : (
        "no"
      )}
    </WebLayout>
  );
};

export default BgmIndex;
