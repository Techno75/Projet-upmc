import Home from '../Components/Home/Index.jsx';
import Contact from '../Components/Contact/Index.jsx';
import AboutUs from '../Components/AboutUs/Index.jsx';
import SignIn from '../Components/SignIn/Index.jsx';
import SignUp from '../Components/SignUp/Index.jsx';
import Videos from '../Components/Videos/Index.jsx';
import Statistics from '../Components/Statistics/Index.jsx';
import Matches from '../Components/Matches/Index.jsx';
import Match from '../Components/Match/Index.jsx';
import LegalNotice from '../Components/LegalNotice/Index.jsx';
import Groups from '../Components/Groups/Index.jsx';

export const routesList = [
  { path: "/Home", name: "Home", component: Home },
  { path: "/Contact", name: "Contact", component: Contact },
  { path: "/About-us", name: "About us", component: AboutUs },
  { path: "/Sign-in", name: "Sign in", component: SignIn },
  { path: "/Sign-up", name: "Sign up", component: SignUp },
  { path: "/Matches", name: "Matches", component: Matches },
  { path: "/Groups", name: "Groups", component: Groups },
  { path: "/Statistics", name: "Statistics", component: Statistics },
  { path: "/Videos", name: "Videos", component: Videos },
  { path: "/LegalNotice", name: "LegalNotice", component: LegalNotice },
  // Ajouter de nouvelle route à partir d'ici pour éviter des bug !!!!
  { path: "/Match", name: "Match", component: Match },
  { redirect: true, path:"/", to:"/Home", name: "Home"}
];
