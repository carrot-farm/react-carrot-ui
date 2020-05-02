import React from 'react';

type HelloProps = {
  /** 보여주고 싶은 이름 */
  name: string;
  /** 이 값을 `true`로 설정하면 h1 태그로 렌더링 */
  big?: boolean;
  /** Hello 버튼을 누를 때 호출 함수 */
  onHello?: () => void;
  /** Bye 버튼을 누를 때 호출 함수 */
  onBye?: () => void;
}


/**
 * 안녕하세요 라고 보여주고 싶을 때 `Hello`컴포넌트를 사용하세요.
 * 
 * - `big`값을 `true`로 설정하며 **크게** 나타납니다.
 * - `onHello`와 `onBye` props로 설정하여 버튼이 클릭했을 때 호출 할 함수를 지정.
 */
const Hello = ({ name, big, onHello, onBye }: HelloProps) => {
  return(
    <div>
      {big ? <h1>안녕하세요, {name}!</h1> : <p>안녕하세요, {name}!</p>}
      <div>
        <button onClick={onHello}>Hello</button>
        <button onClick={onBye}>Bye</button>
      </div>
    </div>
  )
};

Hello.defaultProps = {
  big: false
};

export default Hello;