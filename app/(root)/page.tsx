import HeaderBox from '@/components/HeaderBox';
import RightSideBar from '@/components/RightSideBar';
import TotalBalance from '@/components/TotalBalance';
import { getLoggedInUser } from '@/lib/actions/user.action';

const Home = async () => {
  const loggedIn = await getLoggedInUser();

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header ">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || 'Guest'}
            subtext="Access and manage your account and transaction efficiently."
          />
        </header>
        <TotalBalance
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={505810}
        />
        RECENT TRANSCATION
      </div>
      <RightSideBar
        user={loggedIn}
        transcation={[]}
        banks={[{ currentBalance: '25680.0' }, { currentBalance: '6985.21' }]}
      />
    </section>
  );
};

export default Home;
