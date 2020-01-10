import React from 'react';
import '../css/map.css'
import { withRouter } from 'react-router-dom';

const { kakao } = window;

class Map extends React.Component {
  constructor(props) {
    //console.log(props.match.params.show_id)
    super(props);
    this.state = {
      address: [],
      show:''
    }
  }

  //좌표 데려오는 함수
  //  -> 결과를 state address
  stateRefresh = () => {
    this.setState({
      address: '',
      show:''
    });
    this.callApi()
      .then(res => this.setState({ address: res }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
     let show_id = this.props.match.params.show_id;
     const response = await fetch('/api/theater/'+show_id);
     const body = await response.json();
     return body;
  }
  componentDidMount() {
    this.callApi()
    .then(res => this.setState({address: res}))
    .catch(err => console.log(err))
  }

  componentDidUpdate() {
    const {address} =this.state;
    const script = document.createElement("script");
    script.async = true;
    script.src =
    //  " /* api key 넣어라*/"
    "https://dapi.kakao.com/v2/maps/sdk.js?appkey=33ccad9cee7a819a54a9b315939115a5";
    document.head.appendChild(script);
    //console.log(this.state.address['latitude']);
    script.onload = () => {
      var container = document.getElementById("map");
      var options = {
        //center: new kakao.maps.LatLng(37.5725254, 126.9756429),
        //center: new kakao.maps.LatLng(address[0]['latitude'], address[0]['longtitude']),
        center: new kakao.maps.LatLng(address[0]['longtitude'], address[0]['latitude']),
        level: 3
      };

        var map = new kakao.maps.Map(container, options); //지도 생성 + 객체 리턴
       
        //var coords = new kakao.maps.LatLng(37.5725254, 126.9756429);
        //console.log(address[0]);
        //var coords = new kakao.maps.LatLng(this.state.address["latitude"]+ "," +this.state.address["longtitude"] ); 안찍혀(주현이꺼) 
        //var coords = new kakao.maps.LatLng(address[0],address[1]); 
        
        // console.log(address);
        // console.log(address[0]['latitude']);  //36.0000?
        // console.log(address[0]['longtitude']); //127.001
        
        
        //var coords = new kakao.maps.LatLng(address[0]['latitude'],address[0]['longtitude']);
        //var coords = new kakao.maps.LatLng(37.5725254, 126.9756429)
        var coords = new kakao.maps.LatLng(address[0]['longtitude'], address[0]['latitude']); 
        


        // 결과로 받은 위치를 마커로 표시
        var marker = new kakao.maps.Marker({
          map: map,
          position: coords,
          // title: theater,
          clickable: false // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
          
        });

        marker.setMap(map); //마커를 지도에 붙이기

       map.setCenter(coords)  //마커의 coords 를 지도의 center로 지정!
      
      }

  }
  render() {
    const {address} =this.state;  
    return (
      <React.Fragment>
        <div id="map" className="kakao"></div>
        {/* {address.map(c => <div>{c.longtitude}</div>)}
        {address.map(c => <div>{c.latitude}</div>)} */}
      </React.Fragment>
    )
  }
}


export default withRouter(Map);


