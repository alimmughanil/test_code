import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Input from "@/Components/Customer/Input";
import { Head } from "@inertiajs/react";

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <Head title="Tambah Data Customer" />

            <div className="py-12">
                <div className="w-full py-4 mx-auto overflow-hidden bg-white shadow-sm sm:rounded-lg sm:w-96">
                    <Input />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
