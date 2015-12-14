'use strict';

var React = require('react-native');
import NavigationBar from 'react-native-navbar';

var {
  AppRegistry,
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  StatusBarIOS,
} = React;


//main theme color 3fb7be


var PHSBS = React.createClass({
  statics: {
    title: 'Popular High School Boy Simulator',
    description: 'Your so cool, Austin'
  },

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this._genRows({})),
    };
  },

  _pressData: ({}: {[key: number]: boolean}),

  componentWillMount: function() {
    StatusBarIOS.setStyle(0);

    this._pressData = {};
  },


  render: function() {

    var rightButtonConfig = {
      title: '+',
      handler: function onNext() {
        alert('hello!');
      }

    };

    var titleConfig = {
      title: 'Messages',
    };
    return (
        <View>
          <NavigationBar
            style = {styles.header}
            title={titleConfig}
            rightButton={rightButtonConfig} />
          <View style={styles.separator} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow} />

        </View>
    );
  },

  _renderRow: function(text: {}, sectionID: number, rowID: number) {

    return (
      <TouchableHighlight onPress={() => this._pressRow(rowID)}>
        <View>

          <View style={[styles.row, styles.paddMe]}>

            <View style = {styles.seen}>
              <Image source={require('./bluecircle.png')}
              style = {styles.dot}/>
            </View>

            <View style = {styles.content}>

              <View style={styles.row}>
                <Text style={[styles.text, styles.from, styles.bold]}>
                {text.from}
                </Text>
                <Text style={[styles.text, styles.time]}>
                {text.time} > 
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={[styles.text, styles.message]}>
                 {text.message}
                </Text>

              </View>

              <View style={styles.separator} />

            </View>


          </View>

        </View>
      </TouchableHighlight>
    );
  },

  toReadableDate: function(time){

    //if(time > 1 Week), return get date mm/dd/yy
    //if(time != today), return dayofweek
    //if(time == today), reurn hh:mm:AM
  },

  texts: [
    {time: "9:05PM", from: "joe", message: "do you hve any freedom? I know its wierd... me and you haven't talked in a whike"},
    {time: "3:05PM", from: "jon", message: "ur a fool"},
    {time: "1:05PM", from: "Bronte", message: "HI!!!"},
  ],

  _genRows: function(pressData: {[key: number]: boolean}): Array<string> {

    return this.texts;
  },

  _pressRow: function(rowID: number) {
    this._pressData[rowID] = !this._pressData[rowID];
    this.setState({dataSource: this.state.dataSource.cloneWithRows(
      this._genRows(this._pressData)
    )});
  },
});

var styles = StyleSheet.create({
  seen:{
    height:50,
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  from:{
    flex:8,
    fontSize:17,
    color:"#222"
  },
  time:{
    fontSize:15,
    flex:4,
    color:"#888",
    textAlign:"right",
    paddingRight:10,
  },
  message:{
    fontSize:15,
    height:50,
    flex:1,
    color:"#888",
  },
  content:{
    flex:9
  },
  dot:{
    width: 12,
    height:12,
  },
  bold:{
    fontWeight:"700",
  },
  header:{
    backgroundColor: '#F6F6F6',
    paddingTop:30,
    marginTop:-30,
    height:70,
    opacity:.9
  },
  row: {
    flexDirection: 'row',
  },
  paddMe:{
    paddingTop:10,
  },
  separator: {
    height: .5,
    backgroundColor: '#BBB',
  },
  text: {
    flex: 1,
  },
});

AppRegistry.registerComponent('PHSBS', () => PHSBS);