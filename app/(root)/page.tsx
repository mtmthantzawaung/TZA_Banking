import HeaderBox from "@/components/HeaderBox";
import RightSideBar from "@/components/RightSideBar";
import TotalBalance from "@/components/TotalBalance";


export default function Home() {
  const loggedIn :User = {$id:'1',userId:'JSM1',address1:'',city:'',dateOfBirth:'',dwollaCustomerId:'',dwollaCustomerUrl:'',email:'mg@gmail.com',firstName:'Ardian',lastName:'JSM',postalCode:'',ssn:'',state:''};
  return (
    <section className="home">
     <div className="home-content">
      <header className="home-header ">
          <HeaderBox 
          type="greeting"
          title="Welcome"
          user={loggedIn.firstName || 'Guest'}
          subtext="Access and manage your account and transaction efficiently." />
      </header>

      <TotalBalance accounts={[]} totalBanks={1} totalCurrentBalance={505810} />
     RECENT TRANSCATION
    
     </div>
     <RightSideBar 
     user={loggedIn}
     transcation={[]}
     banks={[{currentBalance:'25680.0'},{currentBalance:'6985.21'}]}
     />
    </section>
  );
}
