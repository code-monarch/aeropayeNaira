import React, {useState} from 'react';
import Home from './Home';
import Nav from '../reusable/Nav';


const Index = () => {
  const [userName] = useState('Derek');
  const [isActive, setIsActive] = useState('home')
  return (
    <div>
      <Nav userName={userName} isActive={isActive} setIsActive={setIsActive} />
      <Home userName={userName}/>
    </div>
  )
}

export default Index