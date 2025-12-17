import { AppHeader } from "~/components/app-header";

export default function Page() {
  return (
    <>
      <AppHeader title="Dashboard" />
      <div className="max-w-6xl w-full mx-auto p-4 md:px-8">
        <div>Dashboard</div>
      </div>
    </>
  );
}
