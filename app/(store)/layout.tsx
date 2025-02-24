
import AsideShoppingcart from "@/Components/cart/AsideShoppingcart";
import ShoppingCart from "@/Components/cart/ShoppingCart";
import MainNav from "@/Components/ui/MainNav";
import { useStore } from "@/src/zustand/store";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <>
            <MainNav />
            <main className="lg:flex  lg:h-screen lg:overflow-y-hidden">
                <div className="md:flex-1 md:h-screen md:overflow-y-scroll pt-10  pb-32 px-10">
                    {children}
                </div>
                <AsideShoppingcart />
            </main>
        </>
    );
}