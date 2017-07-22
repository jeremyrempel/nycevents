import React, { Component } from "react";
import { SectionList, StyleSheet, View, PixelRatio } from "react-native";
import {
  Picker,
  Item,
  ListItem,
  Text,
  Body,
  Thumbnail,
  Right,
  Icon
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
      getSeparatorHeight: () => 1 / PixelRatio.get(), // The height of your separators
      getSectionHeaderHeight: () => sectionHeaderHeight, // The height of your section headers
      getSectionFooterHeight: () => 0 // The height of your section footers
    });
  }

  scrollToIndex(newIndex) {
    this.listRef.scrollToLocation({
      animated: false,
      sectionIndex: newIndex,
      itemIndex: 0,
      viewPosition: 0,
      viewOffset: 10
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          ref={ref => (this.listRef = ref)}
          keyExtractor={(item, index) => index}
          getItemLayout={this.getItemLayout}
          sections={this.props.events}
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
            <ListItem
              itemHeader
              first
              style={{
                backgroundColor: "whitesmoke",
                height: sectionHeaderHeight
              }}
            >
              <Picker
                textStyle={{ color: "black" }}
                iosHeader="Select date"
                mode="dropdown"
                placeholder={moment(section.title).format("dddd, MMMM Do")}
                onValueChange={this.scrollToIndex.bind(this)}
              >
                {this.props.events.map(function(o, i) {
                  const k = moment(o.title).format("dddd, MMMM Do");
                  return <Item label={k} value={i} key={i} />;
                })}
              </Picker>
            </ListItem>}
        />
      </View>
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
  container: {
    flex: 1
  },
  sectionHeader: {
    height: sectionHeaderHeight
  },
  item: {
    height: rowHeight
  }
});
