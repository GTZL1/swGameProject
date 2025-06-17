import TitleBar from '../../utils/title/title.js';
import { useTranslation } from 'react-i18next';
import IdentityBox from './identityBox.js';
import { useFont } from '../../context/FontContext.js';
import '../common.css';

const IdentityPage = () => {
    const {t} = useTranslation();
    const { contentFont } = useFont();
    
    return (<>
      <TitleBar nameP={t('titles.identity_title')}/>
      <section className={`${contentFont} page game-button`}>
        <IdentityBox /></section>
    </>);
}

export default IdentityPage;