"use strict";

/**
 * Created by jrempel on 6/14/17.
 */
import React, { PureComponent } from "react";
import {
  Separator,
  Content,
  List,
  ListItem,
  Text,
  Body,
  Thumbnail,
  Right,
  Icon
} from "native-base";

export default class EventList extends PureComponent {
  dates = [];

  render() {
    return (
      <List
        style={{ backgroundColor: "white" }}
        dataArray={this.props.events}
        renderRow={item =>
          <Content>
            {this.showHeader(item.startdate) &&
              <Separator bordered>
                <Text>
                  {item.startdate}
                </Text>
              </Separator>}

            <ListItem onPress={() => this.props.onPress(item)}>
              {this.showImage(item.image)}
              <Body>
                <Text>
                  {item.title}
                </Text>
                <Text note>
                  {item.startdate} {item.starttime}
                </Text>
                <Text note>
                  {item.location}
                </Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </Content>}
      />
    );
  }

  showImage(remoteImageUrl) {
    if (remoteImageUrl.length > 0) {
      return (
        <Thumbnail
          large
          source={{ uri: remoteImageUrl.replace("http", "https") }}
        />
      );
    } else {
      return <Thumbnail large source={require("./img/park.png")} />;
    }
  }

  showHeader(date) {
    if (this.dates.indexOf(date) > -1) {
      return false;
    } else {
      this.dates.push(date);
      return true;
    }
  }
}
