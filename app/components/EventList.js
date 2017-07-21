import React, { Component } from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  Button
} from "react-native";
import sectionListGetItemLayout from "react-native-section-list-get-item-layout";

export default class EventList extends React.Component {
  constructor(props) {
    super(props);

    this.getItemLayout = sectionListGetItemLayout({
      // The height of the row with rowData at the given sectionIndex and rowIndex
      getItemHeight: (rowData, sectionIndex, rowIndex) => 75,

      // These three properties are optional
      getSeparatorHeight: () => 0 / PixelRatio.get(), // The height of your separators
      getSectionHeaderHeight: () => 20, // The height of your section headers
      getSectionFooterHeight: () => 0 // The height of your section footers
    });
  }

  scrollToIndex = () => {
    this.listRef.scrollToLocation({
      animated: true,
      sectionIndex: 1,
      itemIndex: 0,
      viewPosition: 0,
      viewOffset: 20
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          ref={ref => (this.listRef = ref)}
          keyExtractor={(item, index) => index}
          getItemLayout={this.getItemLayout}
          sections={this.props.events}
          renderItem={({ item }) =>
            <Text style={styles.item}>
              {item.title}
            </Text>}
          renderSectionHeader={({ section }) =>
            <View style={styles.sectionHeader}>
              <Button
                title={section.title}
                onPress={() => this.scrollToIndex()}
              />
            </View>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sectionHeader: {
    height: 10
  },
  item: {
    fontSize: 18,
    height: 75
  }
});
