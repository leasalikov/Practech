import Sidebar from "../componnents/Sidebar";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "../../style/Dashboard.css";
import SecondHeader from "../../SecondHeader";
import PageTitle from "../componnents/PageTitle";

export default function DashboardWithUnifiedLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">
        <SecondHeader />

        <div className="content-area">
          <PageTitle title="Dashboard" />


          {/* <div className="cards-container">
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
