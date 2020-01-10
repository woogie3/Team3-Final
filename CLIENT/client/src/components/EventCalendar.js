
import React, { Component } from "react";
import '../css/App.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
export default class EventCalendar extends Component {
    render() {
        return (
            <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]}
            events={[
                { title: '옥탑방고양이상영시작', date: '2020-01-01' },
                { title: '옥탑방고양이상영종료', date: '2020-01-07' },
           
                { title: '행오버상영시작', date: '2020-01-01' },
                { title: '행오버상영종료', date: '2020-01-21' },
          
         
                { title: '그대를사랑합니다상영시작', date: '2019-11-01' },
                { title: '그대를사랑합니다상영종료', date: '2010-12-07' },

                { title: '극적인하룻밤상영시작', date: '2019-12-01' },
                { title: '극적인하룻밤상영종료', date: '2019-12-30' },

                
                { title: '행오버상영시작', date: '2020-01-18' },
                { title: '행오버상영종료', date: '2020-01-30' },
          
         
                { title: '수상한흥신소상영시작', date: '2020-01-15' },
                { title: '수상한흥신소상영종료', date: '2020-01-30' },

                { title: '옥탑방고양이상영시작', date: '2019-12-30' },
                { title: '옥탑방고양이상영종료', date: '2020-01-15' },
         
                { title: '작업의정석상영시작', date: '2020-01-05' },
                { title: '작업의정석상영종료', date: '2020-01-15' },
         
                { title: '라이어상영시작', date: '2020-10-13' },
                { title: '라이어상영종료', date: '2020-12-05' },

       
                { title: '쉬어매드니스상영시작', date: '2019-10-22' },
                { title: '쉬어매드니스상영종료', date: '2020-12-29' },


                { title: '오백에삼십상영시작', date: '2019-12-01' },
                { title: '오백에삼십상영종료', date: '2020-01-01' },

                
                { title: '한뼘사이상영시작', date: '2019-11-02' },
                { title: '한뼘사이상영종료', date: '2019-11-21' },


                { title: '그대를사랑합니다상영시작', date: '2019-11-15' },
                { title: '그대를사랑합니다상영종료', date: '2010-11-30' },


                { title: '2호선세입자상영시작', date: '2019-12-25' },
                { title: '2호선세입자상영종료', date: '2020-01-15' },

                

                { title: '나의PS파트너상영시작', date: '2019-12-08' },
                { title: '나의PS파트너상영종료', date: '2019-12-24' },

                
                { title: '환상동화상영시작', date: '2019-12-05' },
                { title: '환상동화상영종료', date: '2020-01-05' },

                    
                { title: '2019<톡톡>상영시작', date: '2019-11-02' },
                { title: '2019<톡톡>상영종료', date: '2019-12-30' },

                
                { title: '꽃의비밀상영시작', date: '2019-11-05' },
                { title: '꽃의비밀상영종료', date: '2019-12-30' },

                
                { title: '마당놀이춘풍이상영시작', date: '2020-01-02' },
                { title: '마당놀이춘풍이상영종료', date: '2020-01-30' },

                
                { title: '앨리펀트송상영시작', date: '2020-01-01' },
                { title: '앨리펀트송상영종료', date: '2020-01-30' },

                
                { title: '도둑배우상영시작', date: '2020-01-02' },
                { title: '도둑배우상영종료', date: '2020-01-15' },

                { title: '창문 넘어 도망친 100세 노인상영시작', date: '2019-12-30' },
                { title: '창문 넘어 도망친 100세 노인상영종료', date: '2020-01-15' },

                
                { title: '조각:사라진기억상영시작', date: '2020-01-05' },
                { title: '조각:사라진기억상영종료', date: '2020-01-25' },

                
                { title: '돌아와요미자씨상영시작', date: '2019-10-27' },
                { title: '돌아와요미자씨상영종료', date: '2019-11-15' },

                
                { title: '방탄개그단상영시작', date: '2019-10-15' },
                { title: '방탄개그단상영종료', date: '2019-11-17' },

                
                { title: '택시안에서상영시작', date: '2019-11-15' },
                { title: '택시안에서상영종료', date: '2020-01-17' },

                { title: '택시안에서상영시작', date: '2019-10-01' },
                { title: '택시안에서상영종료', date: '2020-01-17' },

                { title: '룸넘버상영시작', date: '2019-11-01' },
                { title: '룸넘버상영종료', date: '2019-11-21' },

                { title: 'Memory in dream상영시작', date: '2019-11-21' },
                { title: 'Memory in dream상영종료', date: '2020-02-14' },
              
                
            
            ]}
              />
            )      
    }
}