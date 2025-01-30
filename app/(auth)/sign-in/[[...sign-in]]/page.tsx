"use client"
import { SignIn } from '@clerk/nextjs';
import { useSearchParams } from "next/navigation";

export default function Page() {

    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirect_url") || "/dashboard";

    return (
    <section className="bg-white text-black">
    <div className="lg:grid lg:min-h-screen lg:grid-cols-12 text-black">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
        <img
            alt=""
            src="./signIn.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
        />

        <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-black" href="#">
            <span className="sr-only">Home</span>
            <img
            alt=""
            src="./tempLogo.svg"
            className="h-8 sm:h-10"
            />
            </a>

            <h2 className="mt-6 text-2xl font-bold text-black sm:text-3xl md:text-4xl ">
            Welcome to VirtueHire
            </h2>

            <p className="mt-4 leading-relaxed text-black/90">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
            quibusdam aperiam voluptatum.
            </p>
        </div>
        </section>

        <main
        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
        <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
            <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="#"
            >
                <span className="sr-only text-black">Home</span>
                <img
                alt=""
                src="./tempLogo.svg"
                className="h-8 sm:h-10"
                />
            </a>

            <h1 className="mt-2 text-2xl font-bold text-black-900 sm:text-3xl md:text-4xl">
                Welcome to VirtueHire
            </h1>

            <p className="mt-4 leading-relaxed text-black-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                quibusdam aperiam voluptatum.
            </p>
            </div>
                    <SignIn forceRedirectUrl={redirectUrl} />
        </div>
        </main>
    </div>
    </section>
    )
}