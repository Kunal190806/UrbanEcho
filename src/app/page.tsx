
import { DashboardTabs } from '@/components/dashboard/dashboard-tabs';
import { SmartWidgets } from '@/components/dashboard/smart-widgets';

export default function Home() {

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="flex-1 text-xl font-semibold font-headline md:text-2xl">
          Welcome to Your City Dashboard
        </h1>
      </div>
      <div className="space-y-6">
        <SmartWidgets />
        <DashboardTabs />
      </div>
    </div>
  );
}
