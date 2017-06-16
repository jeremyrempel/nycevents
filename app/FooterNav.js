/**
 * Created by jrempel on 6/15/17.
 */
import React from 'react'
import { Button, Container, Content, Footer, FooterTab, Header, Icon, Left, Right, Title } from 'native-base'
import FooterNavButton from './FooterNavButton'

const FooterNav = ({handleChangeView}) => (
  <Footer>
    <FooterTab>
      <FooterNavButton title="Near Me" icon="compass" active="true" handleChangeView={handleChangeView} />
      <FooterNavButton title="Map" icon="map" handleChangeView={handleChangeView} />
      <FooterNavButton title="Calendar" icon="calendar" handleChangeView={handleChangeView} />
      <FooterNavButton title="Browse" icon="book" handleChangeView={handleChangeView} />
    </FooterTab>
  </Footer>
);

export default FooterNav;