import React, { Component } from 'react';
import {Container,Header,Content,Footer,Thumbnail,Text,Icon,Button,Item,Input,View,Card,
  CardItem, List,ListItem,Left,Right,Body,} from 'native-base';
import { ScrollView,Image }from 'react-native'
import axios from 'axios';

class App extends Component{

  constructor(){
    super();
    this.state={makanan:[],menu:''};
  }

  klik(){
    var mn=this.state.menu;
    var url ='https://developers.zomato.com/api/v2.1/search?q='+mn;
    var config = {
      headers:{'user-key':'dcacaf5809134587a3763a243de6163e'}
    };
    axios.get(url,config).then((ambilData)=>{
      console.log(ambilData.data);
      this.setState({
        makanan:ambilData.data.restaurants
      })
    })
  }
  
  componentDidMount(){
  }
  render() {
    const data=this.state.makanan.map((item,index)=>{
      var name=item.restaurant.name;
      var kota =item.restaurant.location.city;
      var alamat =item.restaurant.location.address;
      var hrg1=item.restaurant.average_cost_for_two;
      var hrg2=hrg1/2
      var gambar = item.restaurant.thumb;
      if (gambar==''){
        gambar='http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg'
      }
      return( <Card avatar key={index}>
      <CardItem header>
        <Left>
          <Thumbnail source={{uri:gambar}}/>
          <Body>
            <Text>{name}</Text>
            <Text note>{kota}</Text>
          </Body>
        </Left>
        <Right>
          <Text>Rp {hrg2}</Text>
        </Right>
      </CardItem>
      <CardItem cardBody>
        <Image source={{uri:gambar}} style={{height:400,width:400,flex:1}}/>
      </CardItem>
      <CardItem footer>
        <Left><Button transparent>
          <Icon name="flag"/>
          </Button>
          <Text>{alamat}</Text>
        </Left>
      </CardItem>
      </Card>
      )
    })
    return (
     <Container>
       <Header searchBar rounded>
        <Item>
        <Button transparent onPress={()=>this.klik()}><Icon name="ios-search"/></Button>
          <Input placeholder="Search Now..." onChangeText={(x)=>{this.setState({menu:x})}} />
        </Item>
       </Header>
       <ScrollView>
         {data}
       </ScrollView>
     </Container>
    );
  }
}
export default App;