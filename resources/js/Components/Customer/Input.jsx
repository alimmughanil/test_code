import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";

function Input() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        address: "",
        phone: "",
        price1: "",
        price2: "",
        price_total: 0,
    });

    React.useEffect(() => {
        const price1 = data.price1 != "" ? data.price1 : 0;
        const price2 = data.price2 != "" ? data.price2 : 0;
        const priceTotal = parseInt(price1) + parseInt(price2);
        setData("price_total", priceTotal);
    }, [data.price1, data.price2]);

    const [phone, setPhone] = React.useState([]);
    const [isAddPhone, setIsAddPhone] = React.useState(false);
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [phoneLabel, setPhoneLabel] = React.useState("");

    const addPhone = () => {
        setPhone((phone) => [
            ...phone,
            {
                phone_label: phoneLabel,
                phone_number: phoneNumber,
            },
        ]);
        setIsAddPhone(false);
        setPhoneLabel("");
        setPhoneNumber("");
    };

    React.useEffect(() => {
        if (phone.length != 0) {
            setData("phone", JSON.stringify(phone));
        }
    }, [phone]);
    const submit = (e) => {
        e.preventDefault();
        post("/customer");
    };

    const currency = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    });
    return (
        <form onSubmit={submit}>
            <div className="flex flex-col px-4">
                <label htmlFor="name" className="pt-2 pb-1 font-semibold">
                    Nama
                </label>
                <input
                    type="text"
                    value={data.name}
                    className="border-gray-400 rounded-lg outline-none"
                    onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && (
                    <div className="pt-1 pb-2 text-sm text-red-600">
                        * {errors.name}
                    </div>
                )}
            </div>
            <div className="flex flex-col px-4">
                <label htmlFor="name" className="pt-2 pb-1 font-semibold">
                    Alamat
                </label>
                <input
                    type="text"
                    value={data.address}
                    className="border-gray-400 rounded-lg outline-none"
                    onChange={(e) => setData("address", e.target.value)}
                />
                {errors.address && (
                    <div className="pt-1 pb-2 text-sm text-red-600">
                        * {errors.address}
                    </div>
                )}
            </div>
            <div className="flex flex-col px-4">
                <label htmlFor="phone" className="pt-2 pb-1 font-semibold">
                    Nomor Handphone
                </label>
                {errors.phone && (
                    <div className="pt-1 pb-2 text-sm text-red-600">
                        * {errors.phone}
                    </div>
                )}
                {phone.length == 0 ? (
                    <p className={`${isAddPhone ? "hidden" : "block"}`}>
                        Belum ada nomor hanphone yang ditambahkan
                    </p>
                ) : (
                    phone.map((data, i) => {
                        return (
                            <p>
                                {data.phone_label}: {data.phone_number}
                            </p>
                        );
                    })
                )}
                <div
                    className={`${
                        isAddPhone ? "block" : "hidden"
                    } p-4 border rounded-md`}
                >
                    <div className="flex flex-col" id="phone">
                        <div className="flex flex-col">
                            <label
                                htmlFor="phone_label"
                                className="pb-1 font-medium"
                            >
                                Label
                            </label>
                            <input
                                type="text"
                                value={phoneLabel}
                                className="border-gray-400 rounded-lg outline-none"
                                onChange={(e) => setPhoneLabel(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="phone_number"
                                className="pt-2 pb-1 font-medium"
                            >
                                Nomor Handphone
                            </label>
                            <input
                                type="text"
                                value={phoneNumber}
                                className="border-gray-400 rounded-lg outline-none"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-4 my-2">
                    <button
                        type="button"
                        onClick={() => {
                            setIsAddPhone((state) => !state);
                        }}
                        className="px-4 py-2 text-gray-900 bg-gray-100 border border-gray-500 rounded-lg hover:text-gray-100 hover:bg-gray-900"
                    >
                        {isAddPhone ? "Batal" : "Tambah"}
                    </button>

                    <button
                        type="button"
                        onClick={addPhone}
                        disabled={phoneNumber == ""}
                        className={`${
                            !isAddPhone
                                ? "hidden"
                                : phoneNumber == ""
                                ? "border px-4 py-2 text-gray-500 bg-gray-200 border-gray-200 rounded-lg"
                                : "border px-4 py-2 text-gray-900 bg-gray-100 border-gray-500 rounded-lg hover:text-gray-100 hover:bg-gray-900"
                        }
                        `}
                    >
                        Tambah
                    </button>
                </div>
            </div>
            <div className="flex flex-col px-4">
                <label htmlFor="name" className="pt-2 pb-1 font-semibold">
                    Harga 1
                </label>
                <input
                    type="number"
                    value={data.price1}
                    className="border-gray-400 rounded-lg outline-none"
                    onChange={(e) => setData("price1", e.target.value)}
                />
                {errors.price1 && (
                    <div className="pt-1 pb-2 text-sm text-red-600">
                        * {errors.price1}
                    </div>
                )}
            </div>
            <div className="flex flex-col px-4">
                <label htmlFor="name" className="pt-2 pb-1 font-semibold">
                    Harga 2
                </label>
                <input
                    type="number"
                    value={data.price2}
                    className="border-gray-400 rounded-lg outline-none"
                    onChange={(e) => setData("price2", e.target.value)}
                />
                {errors.price2 && (
                    <div className="pt-1 pb-2 text-sm text-red-600">
                        * {errors.price2}
                    </div>
                )}
            </div>
            <div className="flex flex-row items-center justify-between w-full px-4 mt-4">
                <label className="pt-2 pb-1 font-semibold">Harga Total</label>
                <p className="px-4 font-bold">
                    {currency.format(data.price_total)}
                </p>
            </div>
            <div className="flex justify-center my-2">
                <button
                    type="submit"
                    className="px-4 py-2 text-gray-100 bg-gray-700 border border-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

export default Input;
