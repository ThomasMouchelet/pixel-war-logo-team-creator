import { Route, Routes } from 'react-router-dom';
import LogoCreatorPage from '../page/LogoCreatorPage';

const MainRouter = () => {
    return (
        <Routes>
            <Route path='/teams/:team_id' element={<LogoCreatorPage />} />
        </Routes>
    );
}
 
export default MainRouter;