"use strict";

import React, { Component } from "react";
import { SectionList, StyleSheet, View } from "react-native";
import {
  Picker,
  Item,
  ListItem,
  Text,
  Body,
  Thumbnail,
  Right,
  Icon,
  Container
} from "native-base";
import sectionListGetItemLayout from "react-native-section-list-get-item-layout";
import moment from "moment";

const rowHeight = 150;
const sectionHeaderHeight = 40;

export default class EventList extends Component {
  constructor(props) {
    super(props);

    this.getItemLayout = sectionListGetItemLayout({
      // The height of the row with rowData at the given sectionIndex and rowIndex
      getItemHeight: (rowData, sectionIndex, rowIndex) => rowHeight,

      // These three properties are optional
      getSeparatorHeight: () => 0, // The height of your separators
      getSectionHeaderHeight: () => sectionHeaderHeight, // The height of your section headers
      getSectionFooterHeight: () => 0 // The height of your section footers
    });

    this.scrollToNext = this.scrollToNext.bind(this);
    this.scrollToPrev = this.scrollToPrev.bind(this);
    this.scrollToIndex = this.scrollToIndex.bind(this);
  }

  scrollToIndex(newIndex, animated = false) {
    this.listRef.scrollToLocation({
      animated: animated,
      sectionIndex: newIndex,
      itemIndex: 0,
      viewPosition: 0,
      viewOffset: 20
    });
  }

  scrollToNext(sectionTitle) {
    const sectionIdx = this.props.events.findIndex(
      e => e.title == sectionTitle
    );

    if (sectionIdx + 1 < this.props.events.length) {
      this.scrollToIndex(sectionIdx + 1, true);
    }
  }

  scrollToPrev(sectionTitle) {
    const sectionIdx = this.props.events.findIndex(
      e => e.title == sectionTitle
    );

    if (sectionIdx > 0) {
      this.scrollToIndex(sectionIdx - 1, true);
    }
  }

  doesPrevSectionExist(sectionTitle) {
    const sectionIdx = this.props.events.findIndex(
      e => e.title == sectionTitle
    );

    return sectionIdx > 0;
  }

  render() {
    return (
      <SectionList
        ref={ref => (this.listRef = ref)}
        keyExtractor={(item, index) => index}
        getItemLayout={this.getItemLayout}
        sections={this.props.events}
        stickySectionHeadersEnabled={true}
        renderItem={({ item }) =>
          <ListItem
            style={{ height: rowHeight }}
            onPress={() => this.props.onPress(item)}
          >
            {showImage(item.image)}
            <Body style={{ flex: 1 }}>
              <Text>
                {item.title}
              </Text>
              <Text note>
                {item.starttime}
              </Text>
              <Text note>
                {item.boro}
              </Text>
              <Text note>
                {item.categories.join(", ")}
              </Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>}
        renderSectionHeader={({ section }) =>
          <Container style={styles.header}>
            {/*this.props.events.findIndex(e => e.title == section.title) > 0 &&
                <Button transparent>
                  <Icon
                    name="arrow-back"
                    onPress={() => this.scrollToPrev(section.title)}
                  />
                </Button>*/}

            <Picker
              textStyle={{ color: "rgb(14, 122, 254)" }}
              iosHeader="Select date"
              mode="dropdown"
              placeholder={moment(section.title).format("dddd, MMMM Do")}
              onValueChange={this.scrollToIndex}
            >
              {this.props.events.map(function(o, i) {
                const k = moment(o.title).format("dddd, MMMM Do");
                return <Item label={k} value={i} key={i} />;
              })}
            </Picker>

            {/*this.props.events.findIndex(e => e.title == section.title) + 1 <
                this.props.events.length &&
                <Button transparent>
                  <Icon
                    name="arrow-forward"
                    onPress={() => this.scrollToNext(section.title)}
                  />
                </Button>*/}
          </Container>}
      />
    );
  }
}

function showImage(remoteImageUrl) {
  if (remoteImageUrl && remoteImageUrl.length > 0) {
    return (
      <Thumbnail
        large
        source={{ uri: remoteImageUrl.replace("http", "https") }}
      />
    );
  } else {
    return <Thumbnail large source={require("../img/park.png")} />;
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    height: sectionHeaderHeight,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  sectionHeader: {
    height: sectionHeaderHeight
  },
  item: {
    height: rowHeight
  }
});
