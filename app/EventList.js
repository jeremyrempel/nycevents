/**
 * Created by jrempel on 6/14/17.
 */
import React from 'react'
import { List, ListItem, Text, Body, Right, Icon } from 'native-base'
import EventRow from './EventRow'

const EventList = ({onPress}) => (
  <List>
    <ListItem itemDivider>
      <Text>Monday, July 3</Text>
    </ListItem>
    <EventRow title='Maria Carie, Governers Island' description='Famous popstar attempts to salvage career by throwing free concert songs on the island' onPress={onPress} />
    <EventRow title='Pride Parade, Queens' onPress={onPress} description='Its big, and its gay. Come make some new friends at the parade and show your support' />
    <ListItem itemDivider>
      <Text>Tuesday, July 4</Text>
    </ListItem>
    <EventRow title='Flea market, Hells Kitchen' onPress={onPress} description='You can bring your dogs to this one' />
    <EventRow title='America Day, Hudson River' onPress={onPress} description='Bring your red, white and blue, drink some budweiser, have a BBQ and fireworks' />
    <ListItem itemDivider>
      <Text>Tuesday, July 5</Text>
    </ListItem>
    <EventRow title='Dog show, Hudson Yards' onPress={onPress} description='They&quot;re cute, fluffy and run around and bark. They might do some tricks. Come check it out' />
    <EventRow title='Edgar Allan Poe Illustrated, Poe Park Visitor Center (in Poe Park), Bronx' onPress={onPress} description='He was a famous writer. Come hang out, talk and meet other Edgar fans.' />
  </List>
)

export default EventList
