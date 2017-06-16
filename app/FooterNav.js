/**
 * Created by jrempel on 6/15/17.
 */
import React, { Component } from 'react'
import {
  Body,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title
} from 'native-base'
import FooterNavButton from './FooterNavButton'

export default class FooterNav extends Component {

  render () {
    return (
      <Footer>
        <FooterTab>
          <FooterNavButton title="Near Me" icon="compass" active="true" handleChangeView={this.props.handleChangeView} />
          <FooterNavButton title="Map" icon="map" onChangeView={this.props.onChangeView} />
          <FooterNavButton title="Calendar" icon="calendar" onChangeView={this.props.onChangeView} />
          <FooterNavButton title="Browse" icon="book" onChangeView={this.props.onChangeView} />
        </FooterTab>
      </Footer>
    )
  }
}