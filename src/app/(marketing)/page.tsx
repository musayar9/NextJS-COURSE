// export const revalidate = 3600;
// export const dynamic = "force-dynamic";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // const data = await fetch("https://icanhazdadjoke.com", {
  //   next: { revalidate: 10 },
  //   headers: {
  //     Accept: "application/json",
  //   },
  // });
  const data = await fetch("https://icanhazdadjoke.com", {
    cache: "force-cache",
    // cache: "no-store",
    next: { tags: ["word"] },
    headers: {
      Accept: "application/json",
    },
  });

  const data2 = await fetch("https://icanhazdadjoke.com", {
    // cache: "force-cache",
    // cache: "no-store",
    next: { tags: ["word"] },
    headers: {
      Accept: "application/json",
    },
  });

  const word = await data.json();
  const word2 = await data2.json();
  const lang = (await searchParams).lang;
  console.log("lang", lang);

  const response = await fetch(
    `https://api.mymemory.translated.net/get?q=${word.joke}!&langpair=en-GB|${
      lang || "tr-TR"
    }`
  );
  const newData = await response.json();

  const response2 = await fetch(
    `https://api.mymemory.translated.net/get?q=${word2.joke}!&langpair=en-GB|${
      lang || "tr-TR"
    }`
  );
  const newData2 = await response2.json();

  console.log("Home compent run");

  async function revalidate() {
    "use server";
    revalidatePath("/");
  }

  async function revalidate2() {
    "use server";
    revalidateTag("word");
  }
  return (
    <div className="flex flex-col items-center justify-center bg-black p-4 m-4">
      <h2 className="text-2xl font-bold text-white">
        {newData.responseData.translatedText}
      </h2>
      <h2 className="text-2xl font-bold text-white py-6">
        {newData2.responseData.translatedText}
      </h2>
      <button
        onClick={revalidate}
        className="text-white border border-white rounded-md p-4 my-2"
      >
        Revalidated Route
      </button>
      <button
        onClick={revalidate2}
        className="text-white border border-white rounded-md p-4 my-2"
      >
        Revalidated Tag
      </button>
    </div>
  );
}
