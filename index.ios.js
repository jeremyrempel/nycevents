import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

export default class NycEvents extends Component {
	render() {
		return (
			<Container>
				<Header>
					<Left>
						<Button transparent>
							<Icon name='menu' />
						</Button>
					</Left>
					<Body>
					<Title>Header</Title>
					</Body>
					<Right />
				</Header>
				<Content>
					<Text>Your main content goes here</Text>
				</Content>
				<Footer>
					<FooterTab>
						<Button full>
							<Text>Footer</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		);
	}
}

AppRegistry.registerComponent('NycEvents', () => NycEvents);
