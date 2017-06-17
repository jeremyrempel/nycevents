/**
 * Created by jrempel on 6/14/17.
 */

import React, { Component } from 'react'
import { Body, Button, Container, Content, Footer, FooterTab, Header, Icon, Left, Right, Title } from 'native-base'
import EventList from './EventList'
import FooterNav from './FooterNav'
import MapView from './MapView'

export default class NycEvents extends Component {

  constructor () {
    super()

    this.state = {
      currentView: 'Near Me'
    }

    this.handleChangeView = this.handleChangeView.bind(this);
  }

  onPress () {
    console.log('testing')
  }

  handleChangeView (newView) {
    this.setState({currentView: newView}, () => {
      console.log('State: ', this.state)
    })
  }

  render () {

    let contentView;
    switch(this.state.currentView) {
      case 'Near Me':
        contentView = <EventList onPress={this.onPress}/>;
        break;
      case 'Map':
        contentView = <MapView/>
        break;
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu'/>
            </Button>
          </Left>
          <Body>
            <Title>{this.state.currentView}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          {contentView}
        </Content>
        <FooterNav handleChangeView={this.handleChangeView} currentView={this.state.currentView}/>
      </Container>
    )
  }
}
