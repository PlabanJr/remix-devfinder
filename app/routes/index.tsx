import {
  LinkIcon,
  LocationMarkerIcon,
  OfficeBuildingIcon,
  SearchIcon
} from "@heroicons/react/outline";
import type {
  ActionFunction,
  LoaderFunction
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition
} from "@remix-run/react";
import { useMemo } from "react";
import { formatDate } from "../../utils/dates";
import { getUser } from "../../utils/user";

export const loader: LoaderFunction = async () => {
  const user = await getUser();

  return user;
};

export const action: ActionFunction = async ({
  request,
}) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const user = await getUser(username as string);

  return user;
};

export default function Index() {
  const data = useLoaderData();
  const actionData = useActionData();
  const transition = useTransition();

  const searching = Boolean(transition.submission);

  const {
    avatar_url,
    bio,
    blog,
    company,
    followers,
    following,
    public_repos,
    location,
    login,
    name,
    created_at,
    twitter_username,
  } = useMemo(() => {
    if (actionData) return actionData;

    return data;
  }, [actionData, data]);

  return (
    <div className="transition-all duration-200 text-secondary min-h-screen py-10">
      <header className="font-bold text-xl mx-auto max-w-full md:max-w-2xl mt-4">
        <h1 className="text-just-white p-3 font-bold text-2xl">
          devfinder
        </h1>
      </header>

      <Form
        method="post"
        className="bg-secondary rounded-lg p-2 flex items-center justify-between space-x-2 transition duration-300 ease-in text-just-white max-w-full md:max-w-2xl mx-3 md:mx-auto mt-4"
      >
        <SearchIcon className="text-just-white h-6 w-6 ml-2" />
        <input
          name="username"
          type="text"
          className="w-[400px] placeholder-neutral-500 font-medium p-2 bg-transparent outline-none text-base rounded-md transition duration-300 ease-in"
          placeholder="Search GitHub username..."
        />
        <button
          type="submit"
          className="h-10 w-32 text-center px-4 hover:bg-blue-600 text-just-white font-medium rounded-md transition-all duration-300 ease-in bg-blue-primary hover:text-blue-100"
        >
          {searching ? "Searching... " : "Search"}
        </button>
      </Form>

      <main className="mx-3 md:mx-auto max-w-full md:max-w-2xl py-6 min-h-[470px] md:max-h-fit rounded-lg flex flex-col items-end justify-between bg-secondary mt-6">
        <div className="flex flex-col  md:flex-row items-center md:justify-evenly w-full space-y-6 space-x-4 md:space-x-6">
          <div className="w-[120px] h-[120px] ring-[5px] rounded-full md:ml-8">
            <img
              src={avatar_url}
              alt="Avatar"
              className="w-full rounded-full"
            />
          </div>
          <div className="flex md:flex-1 items-center md:items-start w-full px-2 space-x-6 justify-around md:justify-between">
            <div className="w-32 md:w-44 font-bold">
              <h2 className="text-lg md:text-2xl text-gray-50">
                {name || "Not found"}
              </h2>
              <p className="inline-block text-sm text-blue-400">
                {`@${login}` || "Not available"}
              </p>
            </div>

            <p className="text-xs md:text-sm text-gray-300 font-normal -mt-2 md:mt-0 md:pt-2 md:p-6">
              Joined{" "}
              <span className="font-semibold flex md:inline-block text-xs md:text-sm">
                {formatDate(created_at) || "Not available"}
              </span>
            </p>
          </div>
        </div>

        <div className=" flex w-full md:max-w-lg flex-col space-y-6 px-6 py-3">
          <p className="text-center text-sm text-gray-300 font-medium">
            Bio - {bio}
          </p>

          <div className="rounded-lg bg-primary-dark grid grid-cols-3 divide-x divide-gray-50 py-4">
            <div className="flex flex-col px-4 text-center">
              <p className="text-xs font-semibold text-gray-400">
                Repos
              </p>
              <p className="text-lg font-extrabold text-gray-50">
                {public_repos || 0}
              </p>
            </div>
            <div className="flex flex-col px-4 text-center">
              <p className="text-xs font-semibold text-gray-400">
                Followers
              </p>
              <p className="text-lg font-extrabold text-gray-50">
                {followers || 0}
              </p>
            </div>
            <div className="flex flex-col px-4 text-center">
              <p className="text-xs font-semibold text-gray-400">
                Following
              </p>
              <p className="text-lg font-extrabold text-gray-50">
                {following || 0}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 px-2 py-4 gap-6 md:gap-x-10">
            <div className="flex items-center space-x-2 font-semibold text-white transition-colors duration-150 hover:text-blue-400">
              <LocationMarkerIcon className="w-5 h-5 text-gray-100" />
              <p className="text-sm font-medium text-gray-300">
                {location || "Not available"}
              </p>
            </div>
            <div className="flex items-center space-x-2 font-semibold text-white transition-colors duration-150 hover:text-blue-400">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="text-sky-400 opacity-100"
              >
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
              <p className="text-sm font-medium text-gray-300">
                {twitter_username ? (
                  <a
                    href={`https://www.twitter.com/${twitter_username}`}
                    aria-label="hidden"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {twitter_username}
                  </a>
                ) : (
                  "Not available"
                )}
              </p>
            </div>
            <div className="flex items-center space-x-2 font-semibold text-white transition-colors duration-150 hover:text-blue-400">
              <LinkIcon className="w-5 h-5 text-gray-100" />
              <p className="text-sm font-medium text-gray-300">
                {blog || "Not available"}
              </p>
            </div>
            <div className="flex items-center space-x-2 font-semibold text-white transition-colors duration-150 hover:text-blue-400">
              <OfficeBuildingIcon className="w-5 h-5 text-gray-100" />
              <p className="text-sm font-medium text-gray-300">
                {company || "Not available"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
