import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
  Platform,
  PermissionsAndroid
} from "react-native";
import ContactsSectionListComponent from "./ContactsSectionListComponent";
import Contacts from "react-native-contacts";

export class ContactsSectionList extends Component {
  state = {
    finalData: [],
    idList: []
  };

  async componentDidMount() {
    if (Platform.OS === "android") {
      await this.requestContactPermissionAndroid();
      this.processData();
    } else {
      this.processData();
    }
  }

  requestContactPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      ]);
      if (
        granted[PermissionsAndroid.PERMISSIONS.READ_CONTACTS] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        this.setState({ androidPermission: true });
      } else {
        Alert.alert("Permissions Denied. Please Grant Permissions.");
        await this.requestContactPermissionAndroid();
      }
    } catch (err) {
      console.error("Robot: ", err);
    }
  };

  processData = () => {
    Contacts.getAll((err, fetchedContactsList) => {
      if (err === "denied") {
      } else {
        let dataObject = [];
        let idList = [];
        let contactsList = null;
        let namesList = [];
        let data = [];
        contactsList = fetchedContactsList;
        contactsList.map(val => {
          if (val.recordID) {
            if (val.givenName && !val.middleName && !val.familyName) {
              let tempObject = {
                name: val.givenName,
                id: val.recordID
              };
              data.push(tempObject);
            } else if (val.givenName && val.middleName && !val.familyName) {
              let tempObject = {
                name: val.givenName + " " + val.middleName,
                id: val.recordID
              };
              data.push(tempObject);
            } else if (val.givenName && !val.middleName && val.familyName) {
              let tempObject = {
                name: val.givenName + " " + val.familyName,
                id: val.recordID
              };
              data.push(tempObject);
            } else if (val.givenName && val.middleName && val.familyName) {
              let tempObject = {
                name:
                  val.givenName + " " + val.middleName + " " + val.familyName,
                id: val.recordID
              };
              data.push(tempObject);
            } else if (!val.givenName && val.middleName && !val.familyName) {
              let tempObject = {
                name: val.middleName,
                id: val.recordID
              };
              data.push(tempObject);
            } else if (!val.givenName && val.middleName && val.familyName) {
              let tempObject = {
                name: val.middleName + " " + val.familyName,
                id: val.recordID
              };
              data.push(tempObject);
            } else if (!val.givenName && !val.middleName && val.familyName) {
              let tempObject = {
                name: val.familyName,
                id: val.recordID
              };
              data.push(tempObject);
            }
          }
        });

        /**
         * @description sorts @param data array of objects alphabetically based on names while keeping corresponding IDs in the same object.
         */
        data.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        });

        /**
         * @description separates names and IDs into their own arrays @param nameList and @param idList.
         */
        for (let index in data) {
          namesList.push(data[index].name);
          idList.push(data[index].id);
        }

        this.setState({ idList: idList });

        let titles = [];

        /**
         * @description gets a list of unique characters @param titles based on sorted @param nameList.
         */
        namesList.map((val, index, arr) => {
          // For array members with members after them, we compare them with the members after them.
          if (arr[index + 1]) {
            if (val[0] !== arr[index + 1][0]) {
              titles.push(val[0]);
            }
          }
          // For the last array member, we compare it with the member before it.
          else if (index === arr.length - 1) {
            if (val[0] !== arr[index - 1][0]) titles.push(val[0]);
          }
        });

        // magic
        for (let i = 0; i < titles.length; i++) {
          let currentObject = {
            title: titles[i],
            data: []
          };
          for (let j = 0; j < namesList.length; j++) {
            if (namesList[j][0] == titles[i]) {
              currentObject.data.push(namesList[j]);
            }
          }
          dataObject.push(currentObject);
        }
        this.setState({ finalData: dataObject });
      }
    });
  };

  getIndex = (index, section, dataObject) => {
    let objBeforeCount = 0;

    // Look up section.title in dataObject at [?] within dataObject
    dataObject.map((val, index) => {
      if (val.title == section.title) {
        objBeforeCount = index;
      }
    });
    // objBeforeCount is the number of objects that came before.
    // Count how many objects came before it in the array.
    let count = 0;

    for (let i = 0; i < objBeforeCount; i++) {
      count += dataObject[i].data.length;
    }
    // add the count to the index. that gives the correct index within idList
    let resultIndex = count + index;
    return resultIndex;
  };

  handleContactPress = (index, section) => {
    let correctIndex = this.getIndex(index, section, this.state.finalData);
    this.openContactbyId(this.state.idList[correctIndex]);
  };

  /**
   * @description Open contact in phonebook based on ID returned by getContactId method.
   */
  openContactbyId = id => {
    let contact = {
      recordID: id
    };
    Contacts.openExistingContact(contact, (err, contact) => {
      if (err) {
        console.error(
          "Robot: Error with contact: ",
          contact,
          "Error Message: ",
          err
        );
      } else {
        this.processData();
      }
    });
  };

  render() {
    const renderList =
      this.state.finalData.length > 0 ? (
        <ContactsSectionListComponent
          data={this.state.finalData}
          handleContactPress={this.handleContactPress}
          rowStyle={this.props.rowStyle}
          itemStyle={this.props.itemStyle}
          containerStyle={this.props.containerStyle}
          headerStyle={this.props.headerStyle}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      );

    return <>{renderList}</>;
  }
}
