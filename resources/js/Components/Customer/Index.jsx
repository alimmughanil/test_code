import React from "react";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";

function index({ props }) {
    const [keyword, setKeyword] = React.useState("");
    const [isResetSearch, setIsResetSearch] = React.useState(false);

    React.useEffect(() => {
        let params = new URL(document.location).searchParams;
        let search_key = params.get("search");
        if (search_key) {
            setIsResetSearch(true);
        }
    }, []);
    const search = () => {
        router.get(`/customer?search=${keyword}`);
    };
    const currency = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    });
    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="pb-4 ml-2 bg-white dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-between gap-4 sm:pr-4 sm:flex-row">
                        <Link
                            type="button"
                            href="/customer/create"
                            className="px-4 py-[0.4rem] text-gray-100 border border-gray-700 rounded-lg bg-gray-700 hover:text-gray-700 hover:bg-gray-100 font-semibold"
                        >
                            Tambah Data
                        </Link>
                        <div className="flex flex-col items-center gap-4 sm:flex-row">
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="table-search"
                                    onChange={(e) => {
                                        setKeyword(e.target.value);
                                    }}
                                    value={keyword}
                                    className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Cari Nama"
                                />
                            </div>
                            {keyword != "" ? (
                                <button
                                    type="button"
                                    onClick={search}
                                    className="px-4 py-[0.4rem] text-gray-500 border border-gray-500 rounded-lg hover:text-gray-100 hover:bg-gray-700 font-semibold"
                                >
                                    Cari
                                </button>
                            ) : null}
                            {isResetSearch ? (
                                <button
                                    type="button"
                                    onClick={() =>
                                        window.location.replace("/customer")
                                    }
                                    className="px-2 py-[0.01rem] text-gray-500 border border-gray-500 rounded-full hover:text-gray-100 hover:bg-gray-700 font-semibold text-lg"
                                >
                                    X
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nama
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Alamat
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nomor Handphone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Harga 1
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Harga 2
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Harga Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.customer.length == 0 ? (
                            <tr>
                                <td colSpan={9} className="py-5 text-center">
                                    Belum ada data yang dapat ditampilkan
                                </td>
                            </tr>
                        ) : (
                            props.customer.map((data, i) => {
                                return (
                                    <tr
                                        key={i}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <td className="w-4 p-4">
                                            <p className="text-gray-600">
                                                {i + 1}
                                            </p>
                                        </td>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {data.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {data.address}
                                        </td>
                                        <td className="px-6 py-4">
                                            {data.phone.map((phone) => {
                                                return (
                                                    <p>
                                                        {phone.phone_label}:{" "}
                                                        {phone.phone_number}
                                                    </p>
                                                );
                                            })}
                                        </td>
                                        <td className="px-6 py-4">
                                            {currency.format(data.price1)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {currency.format(data.price2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {currency.format(data.price_total)}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default index;
