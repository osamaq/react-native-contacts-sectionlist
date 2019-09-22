# react-native-contacts-sectionlist

[![npm version](https://badge.fury.io/js/react-native-contacts-sectionlist.svg)](https://www.npmjs.com/package/react-native-contacts-sectionlist)


<img src="https://i.imgur.com/k3mxj83.gif" width="300">

Works on both iOS and Android.

### Instructions

This component depends on the API of [react-native-contacts](https://github.com/rt2zz/react-native-contacts). To use this component, follow the installation procedures for [react-native-contacts](https://github.com/rt2zz/react-native-contacts). You won't have to ask for android permissions at runtime. This component will handle that.

After that you may:

npm:

`npm i react-native-contacts-sectionlist`

yarn:

`yarn add react-native-contacts-sectionlist`

### Example

```
import React, { Component } from "react";
import { ContactsSectionList } from "react-native-contacts-sectionlist";

export default class App extends Component {
  render() {
    return <ContactsSectionList />;
  }
}

```

### Styling

| Prop           | Type  | Description                                                                |
| :------------- | :---: | :------------------------------------------------------------------------- |
| containerStyle | style | Will be applied to the view container which surrounds the <SectionList\/>. |
| headerStyle    | style | Will be applied to the headers which are <Text\/> components.              |
| rowStyle       | style | Will be applied to the rows which are <TouchableOpacity\/> components.     |
| itemStyle      | style | Will be applied to row items which are <Text\/> components.                |

<br>
Styling example:

```
<ContactsSectionList
  containerStyle = {{ flex: 2 }}
  headerStyle = {{ fontSize: 36 }}
  rowStyle = {{ height: 20 }}
  itemStyle = {{ paddingLeft: 10 }}
 />
```
