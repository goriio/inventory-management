import Image from "next/image";
import Link from "next/link";
import { Logo } from "~/components/logo";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default function Home() {
  return (
    <main>
      <div className="relative bg-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/mesh-gradient.svg"
            alt="Mesh Gradient"
            className="object-cover"
            fill
          />
        </div>

        <div className="relative max-w-5xl w-full mx-auto px-6">
          <header className="flex items-center justify-between py-4">
            <Logo />
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className={buttonVariants({ variant: "ghost" })}
              >
                Login
              </Link>
              <Link href="/sign-up" className={buttonVariants()}>
                Sign Up
              </Link>
            </div>
          </header>

          <section className="max-w-2xl w-full mx-auto pt-24 text-center">
            <h2 className="mb-4 text-4xl text-gray-900 font-semibold">
              All Your Inventory and Sales Insights, One{" "}
              <span className="text-primary">Dashboard</span>.
            </h2>
            <p className="mb-8 text-gray-700">
              Monitor key metrics through a centralized dashboard for inventory
              and time-series statistics, plus dedicated pages for inventory,
              sales, and customers.
            </p>
            <Link href="/sign-up" className={cn(buttonVariants(), "mb-12")}>
              Get Started
            </Link>
            <Image
              src="/hero-image-desktop.png"
              alt="Hero Image Desktop"
              width={1280}
              height={680}
            />
          </section>
        </div>
      </div>
      <section className="py-20">
        <div className="max-w-5xl w-full mx-auto px-6">
          <p className="text-gray-900 text-center">
            Get a clear overview of your business with a centralized dashboard
            featuring sales summaries, inventory summary, product details,
            customer counts, and charts for weekly sales and new products.
            Everything you need to track your performance at a glance.
          </p>
        </div>
      </section>
      <footer className="bg-white">
        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-8 max-w-5xl w-full mx-auto px-6 py-10">
          <div>
            <Logo />

            <small className="text-gray-600">2025. Inventory Management.</small>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
            {[
              {
                link: "https://github.com/goriio/inventory-management",
                label: "Source Code",
              },
              {
                link: "https://github.com/goriio",
                label: "About The Developer",
              },
              {
                link: "https://github.com/goriio/inventory-management/issues",
                label: "Report Issues",
              },
            ].map(({ link, label }) => {
              return (
                <a
                  key={link}
                  href={link}
                  target="_blank"
                  className="text-sm text-gray-600 transition hover:text-primary"
                >
                  {label}
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </main>
  );
}
