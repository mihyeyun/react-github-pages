import './works.scss'
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Works() {

  const [currentSlide, setCurrentSlide] = useState(0)
  const data = [0, 1];

  function handleClick(data){
    if(data === 'left'){
    setCurrentSlide(0)
    }else{
    setCurrentSlide(-1)
    console.log(currentSlide)
    }
  }
  

  return (
    <div className='works' id='works'>
      <div className='slider' style={{transform:`translateX(${currentSlide * 100}vw)`}}>
  
      
        <div className='con'>
          <div className='item'>
            <div className='left'>
              <div className='leftContainer'>
                <h2>날씨에 맞는 옷 추천(AI)</h2>
                <p>OpenWeatherMap API와 CheatGPT3 API를 기반으로<br></br> 날씨에 맞는 옷을 추천해줍니다<br></br>
                <br></br>날씨에 따라 배경화면 색상이 변하며<br></br> 눈이 오는 날은 눈 내리는<br></br> 애니메이션 효과를 추가했습니다</p>
                <span><Link to="/weather" target="_blank">프로젝트 바로가기</Link></span>
              </div>
            </div>
            <div className='right'>
              <video className='video' autoPlay muted loop>
                <source src='/video/ai.mp4'></source>
              </video>
            </div>
          </div>  
        </div>
    
        <div className='con'>
          <div className='item'>
            <div className='left'>
              <div className='leftContainer'>
                <h2>Drag & Drop 쇼핑몰</h2>
                <p>상품을 드래그하면<br></br> 장바구니에 물건을 담습니다<br></br>
                <br></br>영수증 화면에서는 쿠폰을 얻는<br></br> 미니게임을 진행할 수 있습니다
                <br></br>시간 내 성공 시 할인쿠폰이 생성됩니다</p>
                <span><Link to="/shopping" target="_blank">프로젝트 바로가기</Link></span>
              </div>
            </div>
            <div className='right'>
              <video className='video' autoPlay muted loop>
                <source src='/video/shop.mp4'></source>
              </video>
            </div>
          </div>  
        </div>
      </div>
      <div className='arrow left' onClick={()=>{handleClick("left")}}> 왼쪽 </div>
      <div className='arrow right'onClick={()=>{handleClick("right")}}> 오른쪽 </div>
    </div>
  )
}
