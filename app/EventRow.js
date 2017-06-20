/**
 * Created by jrempel on 6/14/17.
 */
import React from "react";
import { ListItem, Text, Body, Right, Icon } from "native-base";

const EventRow = ({ onPress, title, description }) =>
  <ListItem onPress={onPress}>
    <Body>
      <Text>
        {title}
      </Text>
      <Text note>{description}</Text>
    </Body>
    <Right><Icon name="arrow-forward" /></Right>
  </ListItem>;

export default EventRow;
