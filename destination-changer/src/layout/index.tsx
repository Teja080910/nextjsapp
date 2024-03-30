import { FC } from "react";

interface LayoutProps {
  children: React.ReactNode;
  meta?: React.ReactNode;
  theme: string;
  showWalletInfo?: boolean;
}

const Layout: FC<LayoutProps> = ({
  children,
  meta,
  theme,
}) => {
//   useAuth(showWalletInfo);
//   useTransactions();
//   useBalancesInterval();
//   useLeaderBoard();
//   useLatestBlockNumbers();

  return (
    <div>
      {meta}
      <div className={`${theme} bg-primary w-full`}>
        <div className="flex flex-col relative z-10 overflow-hidden min-h-[110vh]">
          {/* <NavBar showWalletInfo={showWalletInfo} /> */}
          {children}
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;