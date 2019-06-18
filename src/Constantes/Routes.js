import Home from '../Components/Home/Index.jsx';
import Contact from '../Components/Contact/Index.jsx';
import AboutUs from '../Components/AboutUs/Index.jsx';
import SignIn from '../Components/SignIn/Index.jsx';
import SignUp from '../Components/SignUp/Index.jsx';
import Videos from '../Components/Videos/Index.jsx';
import Statistics from '../Components/Statistics/Index.jsx';
import Match from '../Components/Match/Index.jsx';
import LegalNotice from '../Components/LegalNotice/Index.jsx';
import Groups from '../Components/Groups/Index.jsx';

export const routesList = [
  { path: "/Home", name: "Home", component: Home },
  { path: "/Contact", name: "Contact", component: Contact },
  { path: "/About-us", name: "About us", component: AboutUs },
  { path: "/Sign-in", name: "Sign in", component: SignIn },
  { path: "/Sign-up", name: "Sign up", component: SignUp },
  { path: "/Match", name: "Match", component: Match },
  { path: "/Groups", name: "Groups", component: Groups },
  { path: "/Statistics", name: "Statistics", component: Statistics },
  { path: "/Videos", name: "Videos", component: Videos },
  { path: "/LegalNotice", name: "LegalNotice", component: LegalNotice },
  { redirect: true, path:"/", to:"/Home", name: "Home"}
];
