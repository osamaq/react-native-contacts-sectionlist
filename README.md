# react-native-contacts-sectionlist

<img src="https://i.imgur.com/k3mxj83.gif" width="300">

Works for both iOS and Android.

### Instructions

To use this component, you must install and link the package [react-native-contacts](https://github.com/rt2zz/react-native-contacts).

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

Styling example:

```
<ContactsSectionList
  containerStyle = {{ flex: 2 }}
  headerStyle = {{ fontSize: 36 }}
  rowStyle = {{ height: 20 }}
  itemStyle = {{ paddingLeft: 10 }}
 />
```
