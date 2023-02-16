import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Index from "@/Components/Customer/Index";
import { Head } from "@inertiajs/react";

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="w-full py-4 mx-auto overflow-hidden bg-white shadow-sm sm:rounded-lg sm:w-[75rem]">
                    <Index props={props} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
