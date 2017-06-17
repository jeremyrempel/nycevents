/**
 * Created by jrempel on 6/15/17.
 */
import React from 'react'
import { Footer, FooterTab} from 'native-base'
import FooterNavButton from './FooterNavButton'

const FooterNav = ({handleChangeView, currentView}) => (
  <Footer>
    <FooterTab>
      <FooterNavButton title="Near Me" icon="compass" active={currentView === 'NEAR ME'} handleChangeView={handleChangeView} />
      <FooterNavButton title="Map" icon="map" active={currentView === 'MAP'} handleChangeView={handleChangeView} />
      <FooterNavButton title="Calendar" icon="calendar" active={currentView === 'CALENDAR'} handleChangeView={handleChangeView} />
      <FooterNavButton title="Browse" icon="book" active={currentView === 'BROWSE'} handleChangeView={handleChangeView} />
    </FooterTab>
  </Footer>
);

export default FooterNav;