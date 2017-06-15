/**
 * Created by jrempel on 6/14/17.
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
import EventList from './EventList'

export default class NycEvents extends Component {

  onPress () {
    console.log('testing')
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
        <Footer>
          <FooterTab>
            <Button vertical active>
              <Icon name="compass" active />
              <Text>Near Me</Text>
            </Button>
            <Button vertical>
              <Icon name="map" />
              <Text>Map</Text>
            </Button>
            <Button  >
              <Icon name="calendar" />
              <Text>Calendar</Text>
            </Button>
            <Button vertical>
              <Icon name="book" />
              <Text>Browse</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
