import React from 'react';
import { ScrollView, View, Text, Image, TextInput, Button } from 'react-native';
import GifStore from '../stores/GifStore';
const gifStore = new GifStore();

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      search: ''
    }
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    gifStore.trending().then(response => {
      this.setState({
        gifs: response.data || []
      });
    });
  }

  search() {
    gifStore.search(this.state.search).then(response => {
      this.setState({
        gifs: response.data || []
      });
    });
  }

  render() {
    let gifs = this.state.gifs.map((gif, index) => 
      <Image style={{width: '100%', height: Number(gif.images.fixed_height.height) }} source={{uri: gif.images.fixed_height.url }} key={index}/>
    );
    return (
      <ScrollView style={{flex: 1, marginTop: 20}}>
        <Text>Search Gifs</Text>
        <TextInput onChange={(event) => { this.setState({ search: event.nativeEvent.text })}} value={this.state.search} style={{ width: 200, height: 35, borderColor: '#CCC', borderWidth: 1, borderStyle: 'solid'}}/>
        <Button onPress={this.search} title="Search" />
        { gifs }
      </ScrollView>
    );
  }
}