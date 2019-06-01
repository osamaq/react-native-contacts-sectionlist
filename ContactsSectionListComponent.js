import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity
} from "react-native";

const ContactsSectionListComponent = ({ data, handleContactPress }) => {
  const renderItem = ({ item, index, section }) => {
    return (
      <TouchableOpacity
        style={styles.row}
        key={index}
        onPress={() => {
          handleContactPress(index, section);
        }}
      >
        <Text style={styles.item}>{item}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <SectionList
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        sections={data}
        keyExtractor={(item, index) => {
          return index + "";
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)"
  },
  row: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  item: {
    paddingLeft: 30
  }
});

export default ContactsSectionListComponent;
