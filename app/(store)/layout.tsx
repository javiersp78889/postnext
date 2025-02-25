
import AsideShoppingcart from "@/Components/cart/AsideShoppingcart";
import ShoppingCart from "@/Components/cart/ShoppingCart";
import MainNav from "@/Components/ui/MainNav";
import { useStore } from "@/src/zustand/store";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <>
            <MainNav />
            <main className="lg:flex  lg:h-screen lg:overflow-y-hidden">
                <ToastContainer />
                <div className="md:flex-1 md:h-screen md:overflow-y-scroll pt-10  pb-32 px-10">
                    {children}
                </div>
                <AsideShoppingcart />
            </main>
        </>
    );
}