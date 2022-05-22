import WebLayout from "@/components/layouts/web-layout";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <WebLayout>
      <div>
        <ul className="p-10 grid gap-5 justify-self-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Link
            href={{
              pathname: "bgm",
              query: {
                category: "work",
              },
            }}
          >
            <a>
              <li className="bgm-category-box">WORK</li>
            </a>
          </Link>
          <Link
            href={{
              pathname: "bgm",
              query: {
                category: "sleep",
              },
            }}
          >
            <a>
              <li className="bgm-category-box">SLEEP</li>
            </a>
          </Link>
        </ul>
      </div>
    </WebLayout>
  );
};

export default Home;
