/**
 * Created by jrempel on 6/15/17.
 */
import React, { Component } from 'react'
import { Button, Icon, Text } from 'native-base'

export default class FooterNavButton extends Component {

  render () {
    const conditionalProps = {
      active: this.props.active ? true : undefined
    }

    return (
      <Button vertical {...conditionalProps} onPress={() => this.props.handleChangeView(this.props.title)}>
        <Icon name={this.props.icon} {...conditionalProps} />
        <Text>{this.props.title} </Text>
      </Button>
    )
  }
}
