import '../styles/dashboard.css'
import RecruitLink from '../components/dashboard/RecruitLink';
import TeamsList from '../components/dashboard/TeamsList';
import MissionsList from '../components/dashboard/MissionsList';
import Stats from '../components/dashboard/Stats';
export default function Dashboard() {
  return <div>
    <div className="dashboard-grid">
      <Stats/>
      <RecruitLink />
      <TeamsList />
      <MissionsList />
    </div>
  </div>;
}
