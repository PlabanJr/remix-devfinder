import {
    SearchIcon
} from "@heroicons/react/outline";
import {
    Form
} from "@remix-run/react";


export default function SearchForm() {
    return (
        <Form
            action="/"
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
                {"Search"}
            </button>
        </Form>
    );
}
