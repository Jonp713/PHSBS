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
  Navigator,
  StatusBarIOS,
} = React;

var buildStyleInterpolator = require('buildStyleInterpolator');


var { Dimensions } = React;
var SCREEN_WIDTH = Dimensions.get('window').width;
var BaseConfig = Navigator.SceneConfigs.FloatFromRight;

var BaseLeftToRightGesture = Navigator.SceneConfigs.BaseLeftToRightGesture;
var BaseRightToLeftGesture = Navigator.SceneConfigs.BaseRightToLeftGesture;

var BaseOverswipeConfig = Navigator.SceneConfigs.BaseOverswipeConfig;



var CustomSceneConfig = Object.assign({}, Navigator.SceneConfigs.HorizontalSwipeJump, {
  springFriction: 0,
  springTension: 8,
  defaultTransitionVelocity: 1.5,

});

//main theme color 3fb7be

var TextMessage = React.createClass({
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  },
  render: function(){
    var { text, ...other } = this.props;

    return ( 
      <View ref={component => this._root = component} {...this.props}
        style={[styles.row, styles.paddMe]}>
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
    )
  }
})

var Main = React.createClass({

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
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

  _renderRow: function(text: {}, sectionID: number, rowID: number) {
    return (
      <TouchableHighlight underlayColor = "#ccc" 
        onPress={() => {
          this._pressRow(rowID)
          this.props.textDetail(text.from);
        }}>

        <TextMessage text = {text}/>

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

  render: function(){
    var {state, textDetail, onBack, ...other} = this.props;

    const titleConfig = {
     title: this.props.state,
    };

    const leftButtonConfig = {
      title: '< Back',
      handler: () => onBack(),
    };

    if(this.props.state == "Messages") return (     
      <View style = {styles.border} ref={component => this._root = component} {...this.props}>
        <NavigationBar
          style = {styles.header}
          title={titleConfig} />
        <View style={styles.separator} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow} />
      </View>
    )
    else return(
      <View style = {styles.border} ref={component => this._root = component} {...this.props}>
        <NavigationBar
          style = {styles.header}
          title={titleConfig} 
          leftButton = {leftButtonConfig}/>
        <View style={styles.separator} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow} />
      </View>
    )

    
  }

})

var PHSBS = React.createClass({

  _configureScene(route){
    return CustomSceneConfig;
  },

  render: function() {
    return (
      <Navigator
      initialRoute={{name: 'Messages', index: 0}}
      configureScene = {this._configureScene}
      renderScene={(route, navigator) => {
        return (<Main
        state={route.name}
        textDetail={(texter) => {
          navigator.push({
            name: texter,
            index: route.index + 1,
          });
        }}
        onBack={() => {
          if (route.index > 0) {
            navigator.pop();
          }

        }}/>
      )}}/>
    );
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
    height:39,
    flex:1,
    color:"#888",
    marginBottom:10,
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
  border:{
    borderLeftWidth:1,
    borderColor:"#BBB",
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