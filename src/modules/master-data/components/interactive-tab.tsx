import React, { useState } from 'react';

interface TabConfig {
  tab: {
    id: string;
    label: string;
  };
  content: React.ReactNode;
}

interface InteractiveTabsProps {
  title?: string;
  contents: TabConfig[];
  defaultActiveTab?: string;
}

function TabItem({
  item,
  isActive,
  onClick,
}: { item: { id: string; label: string }; isActive: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative rounded-md h-8 w-[216px] shrink-0 cursor-pointer transition-colors hover:bg-white/50 ${
        isActive
          ? 'bg-[#ffffff] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]'
          : ''
      }`}
      data-name="tab item"
    >
      <div className="flex flex-row items-center max-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-row gap-[30px] items-center justify-start max-w-inherit px-3 py-1.5 relative size-full">
          <div className="basis-0 font-['Poppins:Medium',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#555555] text-[14px] text-left text-nowrap">
            <p className="[text-overflow:inherit] [text-wrap-mode:inherit] [white-space-collapse:inherit] block leading-[20px] overflow-inherit font-[500]">
              {item.label}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

function NavigationSidebar({
  activeNavItem,
  onNavigation,
  tabs,
}: {
  activeNavItem: string;
  onNavigation: (itemId: string) => void;
  tabs: TabConfig[];
}) {
  return (
    <div className="border-r-2 border-[#C2C7D0] pr-3">
      <div
        className="bg-neutral-50 box-border content-stretch flex flex-col gap-4 items-center justify-start px-2 py-4 relative rounded-lg self-stretch shrink-0"
        data-name="navigation-sidebar"
      >
        {tabs.map((tabConfig) => (
          <div key={tabConfig.tab.id} className="h-8 w-[216px] shrink-0">
            <TabItem
              item={tabConfig.tab}
              isActive={tabConfig.tab.id === activeNavItem}
              onClick={() => onNavigation(tabConfig.tab.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ContentArea({ children }: { children: React.ReactNode }) {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-6 grow items-start justify-start min-h-px min-w-px px-0 py-4 relative shrink-0">
      {children}
    </div>
  );
}

function MainContent({ activeNavItem, tabs }: { activeNavItem: string; tabs: TabConfig[] }) {
  const activeTab = tabs.find((tab) => tab.tab.id === activeNavItem);

  if (!activeTab) {
    return (
      <ContentArea>
        <div className="box-border content-stretch flex flex-col gap-4 items-center justify-center p-8 relative shrink-0 w-full bg-gray-50 rounded-lg">
          <div className="text-[#555555] text-[16px] font-['Poppins:Medium',_sans-serif]">
            Tab tidak ditemukan
          </div>
          <div className="text-[#888888] text-[14px] font-['Nunito:Regular',_sans-serif] text-center">
            Konten untuk tab ini tidak tersedia
          </div>
        </div>
      </ContentArea>
    );
  }

  return <ContentArea>{activeTab.content}</ContentArea>;
}

function TabContentSeparator({
  activeNavItem,
  onNavigation,
  tabs,
}: {
  activeNavItem: string;
  onNavigation: (itemId: string) => void;
  tabs: TabConfig[];
}) {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="tab-content-separator"
    >
      <NavigationSidebar activeNavItem={activeNavItem} onNavigation={onNavigation} tabs={tabs} />
      <MainContent activeNavItem={activeNavItem} tabs={tabs} />
    </div>
  );
}

export default function InteractiveTabs({ contents, defaultActiveTab }: InteractiveTabsProps) {
  const [activeNavItem, setActiveNavItem] = useState(defaultActiveTab || contents[0]?.tab.id || '');

  const handleNavigation = (itemId: string) => {
    setActiveNavItem(itemId);
  };

  return (
    <div className="" data-name="interactive-tabs">
      <div className="content-stretch flex flex-col gap-6 items-start justify-start overflow-clip px-0 py-6 relative size-full">
        {/* Main Content */}
        <div className="relative shrink-0 w-full">
          <div className="relative size-full">
            <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start py-0 relative w-full">
              <TabContentSeparator
                activeNavItem={activeNavItem}
                onNavigation={handleNavigation}
                tabs={contents}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-2xl" />
    </div>
  );
}
