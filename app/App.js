/**
 * Created by jrempel on 6/14/17.
 */

import React, { Component } from 'react'
import { Body, Button, Container, Content, Footer, FooterTab, Header, Icon, Left, Right, Title } from 'native-base'
import EventList from './EventList'
import FooterNav from './FooterNav'

export default class NycEvents extends Component {

  constructor () {
    super()

    this.state = {
      currentView: 'NEARME'
    }

    this.handleChangeView = this.handleChangeView.bind(this);
  }

  onPress () {
    console.log('testing')
  }

  handleChangeView (newView) {
    console.log('New View: ', newView)
  }

  render () {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu'/>
            </Button>
          </Left>
          <Body>
            <Title>Near Me</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <EventList onPress={this.onPress}/>
        </Content>
        <FooterNav handleChangeView={this.handleChangeView}/>
      </Container>
    )
  }
}
