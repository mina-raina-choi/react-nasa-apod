import React, { Component } from 'react';
import ViewerTemplate from './components/ViewerTemplate';
import SpaceNavigator from './components/SpaceNavigator';
import Viewer from './components/Viewer';

import * as api from './lib/api';
import moment from 'moment';

class App extends Component {
  state = {
    loading: false,
    maxDate: null,
    date: null,
    url: null,
    mediaType: null
  }
  // getAPOD = (date) => {
  //   api.getAPOD(date).then((res) => {
  //     console.log(res)
  //   })
  // }

  getAPOD = async (date) => {
    if(this.state.loading) return;

    this.setState({
      loading: true
    })

    try {
      const res = await api.getAPOD(date);

      // 비구조화 할당 + 새로운 이름
      // res.data 안에 있는 media_type을 mediaType으로 부르겠다.
      const {date: retrievedDate, url, media_type: mediaType} = res.data;

      // maxDate가 없으면 지금 받은 date로 설정
      if(!this.state.maxDate) {
        this.setState({
          maxDate: retrievedDate
        })
      }

      this.setState({
        date: retrievedDate,
        mediaType, 
        url
      })

      // console.log(res);
    } catch (e) {
      console.log("e")
    }

    this.setState({
      loading: false
    })
  }


  handlePrev = () => {
    const {date} = this.state;
    const prevDate = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
    this.getAPOD(prevDate);
  } 

  handleNext = () => {
    const {date, maxDate} = this.state;
    if(date === maxDate) return;
    const nextDate = moment(date).add(1, 'days').format('YYYY-MM-DD');
    this.getAPOD(nextDate);
  }

  componentDidMount() {
    this.getAPOD();
  }

  render() {
    const {url, mediaType, loading} = this.state;
    const { handlePrev, handleNext } = this;

    return (
      <ViewerTemplate
        spaceNavigator={<SpaceNavigator onPrev={handlePrev}
          onNext={handleNext}/>}
        viewer={<Viewer
          url={url}
          mediaType={mediaType}
          loading={loading}
          // url="https://apod.nasa.gov/apod/image/1712/GeminidsYinHao1024.jpg"
          // mediaType="image"
          // url="https://www.youtube.com/embed/uj3Lq7Gu94Y?rel=0" 
          //   mediaType="video"
        />}
      />
    );
  }
}

export default App;
